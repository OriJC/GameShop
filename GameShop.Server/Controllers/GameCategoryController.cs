using Gameshop.model;
using GameShop.Data.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace GameShop.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameCategoryController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;

        public GameCategoryController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet(Name = "GetAllGameCategory")]
        public async Task<ActionResult> GetAllGameCategory()
        {
            var objCategoryList = await _unitOfWork.GameCategory.GetAll();
            return Ok(objCategoryList);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetGameCategoryById(string id)
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
        public async Task<ActionResult> InsertGameCategory(string Name)
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
        public async Task<ActionResult> UpdateGameCategory(Guid id, string name)
        {
            try
            {
                //GameCategory obj = new GameCategory(id, name);
                //_unitOfWork.GameCategory.Add(obj);
                //await _unitOfWork.Commit();

                return Json(new { success = true, message = "Add Sucessfully!" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Failed to add Category" });
            }
        }
    }
}
