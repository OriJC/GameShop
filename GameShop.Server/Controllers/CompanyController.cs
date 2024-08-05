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

        public CompanyController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet(Name = "GetAllCompany")]
        public async Task<ActionResult> GetAll()
        {
            var objCompanyList = await _unitOfWork.Company.GetAll();
            return Ok(objCompanyList);
        }

        [HttpGet(Name = "GetOneCompanyName")]
        public async Task<ActionResult> GetOneCompanyNameById(string objectId)
        {
            var filter = Builders<Company>.Filter.Eq("_id", new ObjectId(objectId));
            var projection = Builders<BsonDocument>.Projection.Include("Name").Include("_id");

            var objCompanyList = await _unitOfWork.Company.GetOneByProjectAndFilter(filter, projection);


            return Ok(objCompanyList);
        }

        [HttpGet(Name = "GetAllCompanyName")]
        public async Task<ActionResult> GetAllCompanyName()
        {
            var filter = Builders<Company>.Filter.Empty;
            var projection = Builders<BsonDocument>.Projection.Include("Name").Include("_id");
            
            var objCompanyList = await _unitOfWork.Company.GetAllByProjectAndFilter(filter, projection);
           

            return Ok(objCompanyList);
        }

        [HttpGet("{id}", Name = "GetCompanyById")]
        public async Task<ActionResult> GetById(string id)
        {
            try
            {
                var Company = await _unitOfWork.Company.GetById(id);
                if (Company != null)
                {
                    return Ok(Company);
                }
                else
                {
                    return NotFound(new {message = "Cannot find this company!"});
                }
            }
            catch (Exception ex) 
            {
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
                    return NotFound(new { message = "Cannot find this company!" });
                }
                //GameCategory obj = new GameCategory(id, name);
                _unitOfWork.Company.Update(company);
                await _unitOfWork.Commit();

                return Ok(new { message = "Update Sucessfully!" });
            }
            catch (Exception ex)
            {
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
                    return NotFound(new { message = "Cannot find this Company!" });
                }
                _unitOfWork.Company.Remove(Id);
                await _unitOfWork.Commit();

                return Ok(new { message = "Delete Sucessfully!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Delete company failed" });
            }
        }
    }
}
