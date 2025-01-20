using Gameshop.model;
using GameShop.Data.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Text.Json;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace GameShop.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class CompanyController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<CompanyController> _logger;
        public CompanyController(IUnitOfWork unitOfWork, ILogger<CompanyController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        [HttpGet(Name = "GetAllCompany")]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                var objCompanyList = await _unitOfWork.Company.GetAll();
                _logger.LogInformation("Get All Comapny");
                return Ok(objCompanyList);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet(Name = "GetOneCompanyName")]
        public async Task<ActionResult> GetOneCompanyNameById(string objectId)
        {
            try
            {
                var filter = Builders<Company>.Filter.Eq("_id", new ObjectId(objectId));
                var projection = Builders<BsonDocument>.Projection.Include("Name").Include("_id");
                var objCompanyList = await _unitOfWork.Company.GetOneByProjectAndFilter(filter, projection);
                _logger.LogInformation($"Get Company Name By {objectId}");
                return Ok(objCompanyList);
            }
            catch (Exception ex)
            { 
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }  
        }

        [HttpGet(Name = "GetAllCompanyName")]
        public async Task<ActionResult> GetAllCompanyName()
        {
            try
            {
                var filter = Builders<Company>.Filter.Empty;
                var projection = Builders<BsonDocument>.Projection.Include("Name").Include("_id");

                var objCompanyList = await _unitOfWork.Company.GetAllByProjectAndFilter(filter, projection);
                _logger.LogInformation($"Get All Company Name");

                return Ok(objCompanyList);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }   
        }

        [HttpGet("{id}", Name = "GetCompanyById")]
        public async Task<ActionResult> GetById(string Id)
        {
            try
            {
                var Company = await _unitOfWork.Company.GetById(Id);
                if (Company != null)
                {
                    _logger.LogInformation($"Get Company  By {Id}");
                    return Ok(Company);
                }
                else
                {
                    _logger.LogInformation($"Cannot find company with Id {Id}");
                    return NotFound(new {message = "Cannot find this company!"});
                }
            }
            catch (Exception ex) 
            {
                _logger.LogError(ex.Message);
                return BadRequest(new { message = ex.Message });
            } 
        }


        [HttpPost(Name = "InsertCompany")]
        public async Task<ActionResult> Insert(Company company)
        {
            try
            {
                var objCompany = company;
                if (objCompany.CreatedDate == null)
                {
                    company.CreatedDate = DateTime.Now;
                }
                _unitOfWork.Company.Add(company);
                await _unitOfWork.Commit();
                _logger.LogInformation("Insert new company to db");
                return Ok(company);
        }
            catch(Exception ex)
            {
                return BadRequest(new { message = "Insert Company failed", detail = ex.Message});
            }
        }

        [HttpPut]
        public async Task<ActionResult> Update(Company company)
        {
            try
            {
                var Company = await _unitOfWork.Company.GetById(company.Id);
                if (Company == null)
                {
                    _logger.LogInformation($"Cannot find Company Name By {company.Id}");
                    return NotFound(new { message = "Cannot find this company!" });
                }
                //GameCategory obj = new GameCategory(id, name);
                _unitOfWork.Company.Update(company);
                await _unitOfWork.Commit();
                _logger.LogInformation($"Updating Company By Id{company.Id}");
                return Ok(new { message = "Update Sucessfully!" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new { message = "Update company failed"});
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string Id)
        {
            try
            {
                var Company = await _unitOfWork.Company.GetById(Id);
                if (Company == null)
                {
                    _logger.LogInformation($"Cannot find Company By Id {Id}");
                    return NotFound(new { message = "Cannot find this Company!" });
                }
                _unitOfWork.Company.Remove(Id);
                await _unitOfWork.Commit();
                _logger.LogInformation($"Delete Company By {Id}");
                return Ok(new { message = "Delete Sucessfully!" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new { message = "Delete company failed" });
            }
        }
    }
}
