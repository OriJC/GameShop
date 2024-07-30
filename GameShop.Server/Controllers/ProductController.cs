using GameShop.Data.Repository.IRepository;
using Gameshop.model;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Reflection.Metadata;
using Gameshop.model.ViewModel;

namespace GameShop.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ProductController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProductController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet(Name = "GetAllProduct")]
        public async Task<ActionResult> GetAll()
        {
            var objProductList = await _unitOfWork.Product.GetAll();
            return Ok(objProductList);
        }

        [HttpGet(Name = "GetAllProductIncludingImage")]
        public async Task<ActionResult> GetAllIncludingImage()
        {
            var objProductList = await _unitOfWork.Product.GetAll();
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

        [HttpGet("{id}", Name = "GetProductById")]
        public async Task<ActionResult> GetById(string id)
        {
            var product = await _unitOfWork.Product.GetById(id);
            if (product == null)
            {
                return NotFound();

            }
            var (imageContent, contentType) = await _unitOfWork.Product.GetImageAsync(product.ImageFileId);
            if(imageContent == null) 
            {

                return NotFound("Image not found");
            }
            return Ok(new {product = product, image = Convert.ToBase64String(imageContent), contentType});

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

                    return Ok(product);
                }
                
            }
            catch (Exception ex)
            {
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
                    return BadRequest("No file uploaded");
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

                    return Ok(new { message = "Update Sucessfully!" });
                }
                
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Update failed" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            try
            {
                _unitOfWork.Product.Remove(id);
                await _unitOfWork.Commit();

                return Ok(new { message = "Delete Sucessfully!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Delete failed" });
            }
        }
    }
}
