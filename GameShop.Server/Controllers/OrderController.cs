using Gameshop.model;
using GameShop.Data.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;

namespace GameShop.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<OrderController> _logger;

        public OrderController(IUnitOfWork unitOfWork, ILogger<OrderController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                var objOrderList = await _unitOfWork.OrderDetail.GetAll();
                if (objOrderList == null)
                {
                    _logger.LogError("Cannot find any order!");
                    return NotFound(new { message = "Cannot find any order!" });
                }
                _logger.LogInformation("Returning All order");
                return Ok(objOrderList);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{orderId}")]
        public async Task<ActionResult> GetOrderById(string orderId)
        {
            try
            {
                var objOrderList = await _unitOfWork.OrderDetail.GetById(orderId);
                if (objOrderList == null)
                {
                    _logger.LogError("Cannot find any order!");
                    return NotFound(new { message = "Cannot find any order!" });
                }
                _logger.LogInformation($"Returning order with orderId {orderId}");
                return Ok(objOrderList);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        public async Task<ActionResult> Create([FromBody] createOrderRequest requestBody)
        {
            try
            {
                // Get Product in the shopping cart item
                
                List<Product> products = requestBody.cart.Items.Select(i => i.Product).ToList();

                if (products == null || !products.Any())
                {
                    _logger.LogError("Product not found in the cart");
                    return BadRequest("Product not found in the cart");
                }

                // Create OrderHeader
                OrderHeader newOrderHeader = new OrderHeader
                {
                    ApplicationUserName = requestBody.cart.UserName,
                    OrderDate = DateTime.Now,
                    ShippingDate = DateTime.Now.AddDays(1),
                    OrderTotal = requestBody.cart.TotalPrice,
                    OrderStatus = OrderStatus.PENDING,
                    PaymentStatus = PaymentStatus.PENDING_PAYMENT,
                    PaymentDate = DateTime.Now,
                    PaymemntDueDate = DateTime.Now.AddDays(7),
                    PhoneNumber = requestBody.paymentInfo.phoneNumber,
                    State = requestBody.paymentInfo.state,
                    City = requestBody.paymentInfo.city,
                    StreetAddress = requestBody.paymentInfo.streetAddress,
                    PostalCode = requestBody.paymentInfo.postalCode,
                    Name = requestBody.paymentInfo.name
                };

                // Create OrderDetail
                OrderDetail neworderDetail = new OrderDetail
                {
                    OrderId = newOrderHeader.Id,
                    OrderHeader = newOrderHeader,
                    Items = requestBody.cart.Items,
                    ProductCount = requestBody.cart.ProductCount,
                    Price = requestBody.cart.TotalPrice

                };
                _unitOfWork.OrderDetail.Add(neworderDetail);
                await _unitOfWork.Commit();
                return CreatedAtAction(nameof(GetOrderById), new { orderId = neworderDetail.Id }, neworderDetail);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }


        [HttpPut]
        public async Task<ActionResult> Update([FromForm] OrderDetail order)
        {
            try
            {
                var oldProduct = await _unitOfWork.Product.GetById(order.Id);
                if (oldProduct == null)
                {
                    _logger.LogError("Cannot find order with {Id}", order.Id);
                    return NotFound(new { message = "Cannot find this order!" });
                }

                _unitOfWork.OrderDetail.Update(order);
                await _unitOfWork.Commit();
                _logger.LogInformation("Updating order with {Id}", order.Id);
                return Ok(new { message = "Update Sucessfully!" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{orderId}")]
        public async Task<ActionResult> Delete(string orderId)
        {
            try
            {
                var oldProduct = await _unitOfWork.Product.GetById(orderId);
                if (oldProduct == null)
                {
                    _logger.LogError("Cannot find order with {Id}", orderId);
                    return NotFound(new { message = "Cannot find this order!" });
                }

                _unitOfWork.OrderDetail.Remove(orderId);
                await _unitOfWork.Commit();
                _logger.LogInformation("Delete order with {Id}", orderId);
                return Ok(new { message = "Delete Sucessfully!" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new { message = ex.Message });
            }
        }

    }

    public class createOrderRequest
    {
        public ShoppingCart cart { get; set; }
        public PaymentInformation paymentInfo { get; set; }
    }
}


