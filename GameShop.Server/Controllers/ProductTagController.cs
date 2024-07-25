using Gameshop.model;
using GameShop.Data.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace GameShop.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ProductTagController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProductTagController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet(Name = "GetAllProductTag")]
        public async Task<ActionResult> GetAll()
        {
            var objCategoryList = await _unitOfWork.ProductTag.GetAll();
            return Ok(objCategoryList);
        }

        [HttpGet("{id}", Name = "GetProductTagById")]
        public async Task<ActionResult> GetById(string id)
        {
            var ProductTag = await _unitOfWork.ProductTag.GetById(id);
            if (ProductTag != null)
            {
                return Ok(ProductTag);

            }
            else
            {
                return BadRequest(new { message = "Get Game Category Failed"}); 
            }
            
        }

        [HttpPost(Name = "InsertProductTag")]
        public async Task<ActionResult> Insert(string Name)
        {
            try
            {
                ProductTag newProductTag = new ProductTag
                {
                    Name = Name,
                    CreatedDate = DateTime.Now
                };
                _unitOfWork.ProductTag.Add(newProductTag);
                await _unitOfWork.Commit();

                return Ok(newProductTag);
        }
            catch(Exception ex)
            {
                return BadRequest(new { message = "Insert Game Category failed", detail = ex.Message});
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(string id, string name)
        {
            try
            {
                ProductTag oldCategory = await _unitOfWork.ProductTag.GetById(id);
                ProductTag newCategory = new ProductTag
                {
                    Id = id,
                    Name = name,
                    CreatedDate = oldCategory.CreatedDate
                };
                //ProductTag obj = new ProductTag(id, name);
                _unitOfWork.ProductTag.Update(newCategory);
                await _unitOfWork.Commit();

                return Ok(new { message = "Update Sucessfully!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Update failed"});
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            try
            {
                _unitOfWork.ProductTag.Remove(id);
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
