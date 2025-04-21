using Gameshop.model;
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

        [HttpGet(Name = "GetAllCarts")]
        public async Task<ActionResult> GetAllCarts()
        {
            try
            {
                var carts = await _unitOfWork.ShoppingCart.GetAll();
                if (carts == null)
                {
                    _logger.LogInformation("Cannot find Shopping Carts");
                    return NotFound();
                }
                _logger.LogInformation("Returning All Shopping Carts");
                return Ok(carts);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet(Name = "GetCartById")]
        public async Task<ActionResult> GetCartById(string shoppingCartId)
        {
            try
            {
                var cart = await _unitOfWork.ShoppingCart.GetById(shoppingCartId);
                if (cart == null)
                {
                    _logger.LogInformation("Cannot find Shopping Cart with this id");
                    return NotFound();
                }
                _logger.LogInformation($"Returning Shopping Cart with this {shoppingCartId}");
                return Ok(cart);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost(Name = "createNewShoppingCart")]
        public async Task<ActionResult> createNewShoppingCart([FromBody] ShoppingCart shoppingCart)
        {
            try
            {
                if (shoppingCart == null)
                {
                    _logger.LogInformation("Cannot find Shopping Cart with this id");
                    return NotFound();
                }
                shoppingCart.CreatedDate = DateTime.Now;
                _unitOfWork.ShoppingCart.Add(shoppingCart);
                await _unitOfWork.Commit();
                _logger.LogInformation($"Inserted Shopping Cart with this {shoppingCart.Id}");
                return Ok(shoppingCart);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPut(Name = "UpdateShoppingCartQuantity")]
        public async Task<ActionResult> UpdateShoppingCartQuantity(string shoppingCartId, string shoppingCartItemId, int newQuantity)
        {
            try
            {
                var existingCart = await _unitOfWork.ShoppingCart.GetById(shoppingCartId);
                if (existingCart == null)
                {
                    _logger.LogError("Cannot find Shopping Cart with this id");
                    return NotFound();
                }
                var existingItem = existingCart.Items.FirstOrDefault(i => i.Id == shoppingCartItemId);
                if(existingItem == null)
                {
                    _logger.LogError($"Cannot find Shopping Cart Item with this {shoppingCartItemId}");
                    return NotFound();
                }
                existingCart.UpdateItemQuantity(shoppingCartItemId, newQuantity);
                _unitOfWork.ShoppingCart.Update(existingCart);
                await _unitOfWork.Commit();
                _logger.LogInformation($"Updated Shopping Cart with this {existingCart.Id}");
                return Ok(existingCart);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete(Name = "DeleteShoppingCart")]
        public async Task<ActionResult> DeleteShoppingCart(string shoppingCartId)
        {
            try
            {
                var cart = await _unitOfWork.ShoppingCart.GetById(shoppingCartId);
                if (cart == null)
                {
                    _logger.LogInformation("Cannot find Shopping Cart with this id");
                    return NotFound();
                }
                _unitOfWork.ShoppingCart.Remove(cart.Id);
                await _unitOfWork.Commit();
                _logger.LogInformation($"Deleted Shopping Cart with this {shoppingCartId}");
                return Ok(cart);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost(Name = "AddItemToCart")]
        public async Task<ActionResult> AddItemToCart(string shoppingCartId, string productId, int Quantity = 1)
        {
            try
            {
                var cart = await _unitOfWork.ShoppingCart.GetById(shoppingCartId);
                if (cart == null)
                {
                    _logger.LogError($"Cannot find Shopping Cart with shopping cart id {shoppingCartId}");
                    return NotFound();
                }
                Product product = await _unitOfWork.Product.GetById(productId);
                if(product == null)
                {
                    _logger.LogError($"Cannot find product with product id {productId}");
                    return NotFound();
                }
                ShoppingCartItem shoppingCartItem = new ShoppingCartItem()
                {
                    ShoppingCartId = shoppingCartId,
                    ProductId = productId,
                    Product = product,
                    Quantity = Quantity,                
                    CreatedDate = DateTime.Now
                };
                
                cart.AddItem(shoppingCartItem);

                _unitOfWork.ShoppingCart.Update(cart);
                await _unitOfWork.Commit();
                _logger.LogInformation($"Added item to Shopping Cart with this {shoppingCartItem.ShoppingCartId}");
                return Ok(cart);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete(Name = "RemoveItemFromCart")]
        public async Task<ActionResult> RemoveItemFromCart(string shoppingCartId, string itemId)
        {
            try
            {
                var cart = await _unitOfWork.ShoppingCart.GetById(shoppingCartId);
                if (cart == null)
                {
                    _logger.LogInformation($"Cannot find Shopping Cart with this {shoppingCartId}");
                    return NotFound();
                }
                cart.RemoveItem(itemId);

                _unitOfWork.ShoppingCart.Update(cart);
                await _unitOfWork.Commit();
                _logger.LogInformation($"Removed item from Shopping Cart with this {shoppingCartId}");
                return Ok(cart);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete(Name = "ClearCart")]
        public async Task<ActionResult> ClearCart(string shoppingCartId)
        {
            try
            {
                var cart = await _unitOfWork.ShoppingCart.GetById(shoppingCartId);
                if (cart == null)
                {
                    _logger.LogInformation($"Cannot find Shopping Cart with this {shoppingCartId}");
                    return NotFound();
                }
                cart.ClearCart();

                _unitOfWork.ShoppingCart.Update(cart);
                await _unitOfWork.Commit();
                _logger.LogInformation($"Cleared Shopping Cart with this {shoppingCartId}");
                return Ok(cart);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}
