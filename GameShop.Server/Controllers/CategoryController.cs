using Gameshop.model;
using GameShop.Data.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace GameShop.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class CategoryController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;

        public CategoryController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet(Name = "GetAllCategory")]
        public async Task<ActionResult> GetAll()
        {
            var objCategoryList = await _unitOfWork.Category.GetAll();
            return Ok(objCategoryList);
        }

        [HttpGet("{id}", Name = "GetCategoryById")]
        public async Task<ActionResult> GetById(string id)
        {
            var Category = await _unitOfWork.Category.GetById(id);
            if (Category != null)
            {
                return Ok(Category);

            }
            else
            {
                return BadRequest(new { message = "Get Game Category Failed"}); 
            }
            
        }

        [HttpPost(Name = "InsertCategory")]
        public async Task<ActionResult> Insert(string Name)
        {
            try
            {
                Category newCategory = new Category
                {
                    Name = Name,
                    CreatedDate = DateTime.Now
                };
                _unitOfWork.Category.Add(newCategory);
                await _unitOfWork.Commit();

                return Ok(newCategory);
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
                Category oldCategory = await _unitOfWork.Category.GetById(id);
                Category newCategory = new Category
                {
                    Id = id,
                    Name = name,
                    CreatedDate = oldCategory.CreatedDate
                };
                //Category obj = new Category(id, name);
                _unitOfWork.Category.Update(newCategory);
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
                _unitOfWork.Category.Remove(id);
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
