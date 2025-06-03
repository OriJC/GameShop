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
        private readonly ILogger<ProductTagController> _logger;

        public ProductTagController(IUnitOfWork unitOfWork, ILogger<ProductTagController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;   
        }

        [HttpGet(Name = "GetAllProductTag")]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                var objCategoryList = await _unitOfWork.ProductTag.GetAll();
                if(objCategoryList == null)
                {
                    _logger.LogError($"Cannot find any product tag");
                    return NotFound(new { message ="Cannot find any product tag!"});
                }
                _logger.LogInformation($"Get all product tag");
                return Ok(objCategoryList);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }         
        }

        [HttpGet("{Id}", Name = "GetProductTagById")]
        public async Task<ActionResult> GetById(string Id)
        {
            try
            {
                var ProductTag = await _unitOfWork.ProductTag.GetById(Id);
                if (ProductTag != null)
                {
                    _logger.LogInformation($"Get product tag by Id {Id}");
                    return Ok(ProductTag);
                }
                else
                {
                    _logger.LogError($"Cannot find product tag by Id {Id}");
                    return NotFound(new { message = "Cannot find this product tag"});
                }
            }
            catch (Exception ex) 
            {
                _logger.LogError(ex.Message);
                return BadRequest(new { message = ex.Message });
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
                _logger.LogInformation($"Insert new product tag to db");
                return Ok(newProductTag);
        }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new { message = "Insert Game Category failed", detail = ex.Message});
            }
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromQuery] string Id, [FromQuery] string name)
        {
            try
            {
                ProductTag oldCategory = await _unitOfWork.ProductTag.GetById(Id);
                if (oldCategory == null) 
                {
                    _logger.LogError($"Cannot find product tag by Id {Id}");
                    return NotFound(new {message = "Cannot find this product Tag"});
                }
                ProductTag newCategory = new ProductTag
                {
                    Id = Id,
                    Name = name,
                    CreatedDate = oldCategory.CreatedDate
                };
                //ProductTag obj = new ProductTag(id, name);
                _unitOfWork.ProductTag.Update(newCategory);
                await _unitOfWork.Commit();
                _logger.LogInformation($"Update product tag by Id {Id}");
                return Ok(new { message = "Update Sucessfully!" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new { message = "Update failed"});
            }
        }

        [HttpDelete("{Id}")]
        public async Task<ActionResult> Delete(string Id)
        {
            try
            {
                ProductTag oldCategory = await _unitOfWork.ProductTag.GetById(Id);
                if (oldCategory == null)
                {
                    _logger.LogError($"Cannot find product tag by Id {Id}");    
                    return NotFound(new { message = "Cannot find this product Tag" });
                }
                _unitOfWork.ProductTag.Remove(Id);
                _logger.LogInformation($"Delete product tag by Id {Id}");
                await _unitOfWork.Commit();

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
