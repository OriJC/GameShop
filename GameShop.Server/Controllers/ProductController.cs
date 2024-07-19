using GameShop.Data.Repository.IRepository;
using Gameshop.model;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet("{id}", Name = "GetProductById")]
        public async Task<ActionResult> GetById(string id)
        {
            var Product = await _unitOfWork.Product.GetById(id);
            if (Product != null)
            {
                return Ok(Product);

            }
            else
            {
                return BadRequest(new { message = "Get Game Category Failed" });
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
        public async Task<ActionResult> Update(Product product)
        {
            try
            {
                //GameCategory obj = new GameCategory(id, name);
                _unitOfWork.Product.Update(product);
                await _unitOfWork.Commit();

                return Ok(new { message = "Update Sucessfully!" });
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
