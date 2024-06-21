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
        public async Task<ActionResult> Insert([FromBody]Product Product)
        {
            try
            {
                var objProduct = Product;
                if (objProduct.CreatedDate == null)
                {
                    Product.CreatedDate = DateTime.Now;
                }
                _unitOfWork.Product.Add(Product);
                await _unitOfWork.Commit();

                return Ok(Product);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Insert Product failed", detail = ex.Message });
            }
        }

        [HttpPut]
        public async Task<ActionResult> Update(Product Product)
        {
            try
            {
                //GameCategory obj = new GameCategory(id, name);
                _unitOfWork.Product.Update(Product);
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
