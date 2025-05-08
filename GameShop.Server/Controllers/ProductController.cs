using GameShop.Data.Repository.IRepository;
using Gameshop.model;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Reflection.Metadata;
using Gameshop.model.ViewModel;
using MongoDB.Bson;
using MongoDB.Driver;

namespace GameShop.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ProductController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<ProductController> _logger;

        public ProductController(IUnitOfWork unitOfWork, ILogger<ProductController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        [HttpGet(Name = "GetAllProduct")]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                var objProductList = await _unitOfWork.Product.GetAll();
                if (objProductList == null)
                {
                    _logger.LogError("Cannot find any product!");
                    return NotFound(new { message = "Cannot find any product!" });
                }
                _logger.LogInformation("Returning All Product");
                return Ok(objProductList);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }            
        }

        [HttpGet(Name = "GetAllProductIncludingImage")]
        public async Task<ActionResult> GetAllIncludingImage()
        {
            var objProductList = await _unitOfWork.Product.GetAll();
            if (objProductList == null)
            {
                _logger.LogError("Cannot find any product!");
                return NotFound(new { message = "Cannot find any product!"});
            }
            var productList = new List<ProductViewModel>();
            foreach(var document in objProductList)
            {
                try
                {
                    var (imageContent, contentType) = await _unitOfWork.Product.GetImageAsync(document.ImageFileId);
                    ProductViewModel productItem = new ProductViewModel
                    {
                        product = document,
                        imageContentType = contentType,
                        imageData = imageContent
                    };
                    productList.Add(productItem);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            return Ok(productList);
        }

        [HttpGet(Name = "GetProductById")]
        public async Task<ActionResult> GetById(string Id)
        {
            try
            {
                var product = await _unitOfWork.Product.GetById(Id);
                if (product == null)
                {
                    _logger.LogError("Cannot find product with id {Id}", Id);
                    return NotFound(new { message = "Cannot find this product!" });
                }
                var (imageContent, contentType) = await _unitOfWork.Product.GetImageAsync(product.ImageFileId);
                if (imageContent == null)
                {
                    _logger.LogError("Cannot find any image");
                    return NotFound("Image not found");
                }
                _logger.LogInformation("Get Product by Id {Id}", Id);
                return Ok(new { product = product, image = Convert.ToBase64String(imageContent), contentType });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet(Name = "GetProductNameAndInventoryById")]
        public async Task<ActionResult> GetProductNameAndInventoryById(string Id)
        {
            try
            {
                var filter = Builders<Product>.Filter.Eq("_id", new ObjectId(Id)); ;
                var projection = Builders<BsonDocument>.Projection.Include("Name").Include("Inventory");

                var objCompanyList = await _unitOfWork.Product.GetAllByProjectionAndFilter(filter, projection);


                return Ok(objCompanyList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost(Name = "InsertProduct")]
        public async Task<ActionResult> Insert([FromForm]Product product, IFormFile file)
        {
            try
            {
                var objProduct = product;
                if (objProduct.CreatedDate == null)
                {
                    product.CreatedDate = DateTime.Now;
                }
                if(file == null || file.Length == 0)
                {
                    _logger.LogError("No Image file while inserting product");
                    return BadRequest("No file uploaded");
                }

                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream);
                    stream.Position = 0;

                    var imageId = await _unitOfWork.Product.UploadImageAsync(stream, file.FileName, file.ContentType);
                    product.ImageFileId = imageId;
                    _unitOfWork.Product.Add(product);
                    await _unitOfWork.Commit();
                    _logger.LogInformation("Inserting product to db");
                    return Ok(product);
                }
                
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new { message = "Insert Product failed", detail = ex.Message });
            }
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromForm] Product product, IFormFile file)
        {
            try
            {
                var objProduct = product;
                if (file == null || file.Length == 0)
                {
                    _logger.LogError("No Image file while inserting product");
                    return BadRequest("No file uploaded");
                }
                var oldProduct = await _unitOfWork.Product.GetById(product.Id);
                if (oldProduct == null)
                {
                    _logger.LogError("Cannot find product with {Id}", product.Id);
                    return NotFound(new { message = "Cannot find this product!" });
                }
                //GameCategory obj = new GameCategory(id, name);
                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream);
                    stream.Position = 0;

                    var imageId = await _unitOfWork.Product.UploadImageAsync(stream, file.FileName, file.ContentType);
                    product.ImageFileId = imageId;
                    _unitOfWork.Product.Update(product);
                    await _unitOfWork.Commit();
                    _logger.LogInformation("Updating product with {Id}", product.Id);
                    return Ok(new { message = "Update Sucessfully!" });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut]
        public async Task<ActionResult> UpdateProductInventory(string ProductId, int inventory)
        {
            try
            {

                var product = await _unitOfWork.Product.GetById(ProductId);
                if (product == null)
                {
                    _logger.LogError("Cannot find product with {Id}", ProductId);
                    return NotFound(new { message = "Cannot find this product!" });
                }

                product.Inventory = inventory;
                _unitOfWork.Product.Update(product);
                await _unitOfWork.Commit();
                _logger.LogInformation("Updating Product Inventory");
                return Ok(new { message = "Update Sucessfully!" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string Id)
        {
            try
            {
                var product = _unitOfWork.Product.GetById(Id);
                if (product == null)
                {
                    _logger.LogError("Cannot find this product with {Id}", Id);
                    return NotFound(new { message = "Cannot find this product!" });
                }
                _unitOfWork.Product.Remove(Id);
                await _unitOfWork.Commit();
                _logger.LogInformation("Delete Product With {Id}", Id);
                return Ok(new { message = "Delete Sucessfully!" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
