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
        private readonly ILogger<CategoryController> _logger;

        public CategoryController(IUnitOfWork unitOfWork, ILogger<CategoryController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        [HttpGet(Name = "GetAllCategory")]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                var objCategoryList = await _unitOfWork.Category.GetAll();
                if (objCategoryList != null)
                {
                    _logger.LogInformation("Get All Category");
                    return Ok(objCategoryList);
                }
                else
                {
                    _logger.LogInformation("Cannot find any Category");
                    return NotFound(new { message = "Cannot find any category!" });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
            
        }

        [HttpGet("{id}", Name = "GetCategoryById")]
        public async Task<ActionResult> GetById(string Id)
        {
            try
            {
                var Category = await _unitOfWork.Category.GetById(Id);
                if (Category != null)
                {
                    _logger.LogInformation("Get Category with {Id}", Id);
                    return Ok(Category);
                }
                else
                {
                    _logger.LogInformation("Cannot find Category with {Id}", Id);
                    return NotFound(new { message = "Cannot find this category!" });
                }
            }
            catch (Exception ex) 
            {
                _logger.LogError(ex.Message);
                return BadRequest(new { message = "Get Game Category Failed" });
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
                _logger.LogInformation("Insert Category with {Name} to db", Name);
                return Ok(newCategory);
        }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new { message = "Insert Game Category failed", detail = ex.Message});
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(string Id, string name)
        {
            try
            {
                Category oldCategory = await _unitOfWork.Category.GetById(Id);
                if (oldCategory == null)
                {
                    _logger.LogInformation("Cannot find Category with {Id}", Id);
                    return NotFound(new {message = "Cannot find this Category!"});
                }
                Category newCategory = new Category
                {
                    Id = Id,
                    Name = name,
                    CreatedDate = oldCategory.CreatedDate
                };
                //Category obj = new Category(id, name);
                _unitOfWork.Category.Update(newCategory);
                await _unitOfWork.Commit();
                _logger.LogInformation("Update Category with {Id}", Id);
                return Ok(new { message = "Update Sucessfully!" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new { message = "Update failed"});
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string Id)
        {
            try
            {
                Category oldCategory = await _unitOfWork.Category.GetById(Id);
                if (oldCategory == null)
                {
                    _logger.LogInformation("Cannot find Category with {Id}", Id);
                    return NotFound(new { message = "Cannot find this Category!" });
                }
                _unitOfWork.Category.Remove(Id);
                await _unitOfWork.Commit();
                _logger.LogInformation("Delete Category with {Id}", Id);
                return Ok(new { message = "Delete Sucessfully!" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new { message = "Delete failed" });
            }
        }
    }
}
