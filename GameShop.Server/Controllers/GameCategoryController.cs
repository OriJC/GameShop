using Gameshop.model;
using GameShop.Data.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace GameShop.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class GameCategoryController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;

        public GameCategoryController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet(Name = "GetAllGameCategory")]
        public async Task<ActionResult> GetAll()
        {
            var objCategoryList = await _unitOfWork.GameCategory.GetAll();
            return Ok(objCategoryList);
        }

        [HttpGet("{id}", Name = "GetById")]
        public async Task<ActionResult> GetById(string id)
        {
            var gameCategory = await _unitOfWork.GameCategory.GetById(id);
            if (gameCategory != null)
            {
                return Ok(gameCategory);

            }
            else
            {
                return BadRequest(); 
            }
            
        }

        [HttpPost(Name = "InsertGameCategory")]
        public async Task<ActionResult> Insert(string Name)
        {
            try
            {
                GameCategory newGameCategory = new GameCategory
                {
                    Name = Name,
                    CreatedDate = DateTime.Now
                };
                _unitOfWork.GameCategory.Add(newGameCategory);
                await _unitOfWork.Commit();

                return Ok(newGameCategory);
        }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(string id, string name)
        {
            try
            {
                GameCategory oldCategory = await _unitOfWork.GameCategory.GetById(id);
                GameCategory newCategory = new GameCategory
                {
                    Id = id,
                    Name = name,
                    CreatedDate = oldCategory.CreatedDate
                };
                //GameCategory obj = new GameCategory(id, name);
                _unitOfWork.GameCategory.Update(newCategory);
                await _unitOfWork.Commit();

                return Json(new { success = true, message = "Update Sucessfully!" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Failed to add Category" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            try
            {
                _unitOfWork.GameCategory.Remove(id);
                await _unitOfWork.Commit();

                return Json(new { success = true, message = "Update Sucessfully!" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Failed to add Category" });
            }
        }
    }
}
