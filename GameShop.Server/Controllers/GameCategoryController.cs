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
        public IActionResult GetAllGameCategory()
        {
            var objCategoryList =  _unitOfWork.GameCategory.GetAll();
            return Json(new { success = true, message = objCategoryList });
        }

        [HttpPost(Name = "InsertGameCategory")]
        public IActionResult InsertGameCategory(GameCategory obj)
        {
            try
            {
                _unitOfWork.GameCategory.Add(obj);
                _unitOfWork.Commit();

                return Json(new { success = true, message = "Add Sucessfully!" });
            }
            catch(Exception ex)
            {
                return Json(new { success = false, message = "Failed to add Category" });
            }

        }
    }
}
