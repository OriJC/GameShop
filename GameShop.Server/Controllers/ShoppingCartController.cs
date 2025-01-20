using GameShop.Data.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;

namespace GameShop.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ShoppingCartController : Controller
    {
        private readonly ILogger<ShoppingCartController> _logger;
        private readonly IUnitOfWork _unitOfWork;

        public ShoppingCartController(ILogger<ShoppingCartController> logger, IUnitOfWork unitOfWork)
        {
            _logger = logger;
            _unitOfWork = unitOfWork;
        }

        [HttpGet(Name = "GetAllShoppingCart")]
        public async Task<ActionResult> GetAllShoppingCart()
        {
            return Ok("Testing 200");
        }
    }
}
