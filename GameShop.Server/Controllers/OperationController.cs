using Gameshop.model;
using GameShop.Data.Repository.IRepository;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.Json;
using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;
using System.Xml.Linq;

namespace GameShop.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class OperationController : Controller
    {
        private UserManager<ApplicationUser> _userManager;
        private RoleManager<ApplicationRole> _roleManager;
        public OperationController(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        // User Section
        [HttpGet(Name= "GetAllUser")]
        public async Task<ActionResult> GetAllUser()
        {
            try
            {
                var users = _userManager.Users.ToList();
                return Ok(users);
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }    
        }

        [HttpGet(Name = "GetAllUserNameAndId")]
        public async Task<ActionResult> GetAllUserNameAndId()
        {
            try
            {
                var users = _userManager.Users.Select(user => new
                {
                    Id = user.Id,
                    Email = user.Email,
                    UserName = user.UserName
                }).ToList();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet(Name = "GetUserById")]
        public async Task<ActionResult> GetUserById(string id)
        {
            try
            {
                var users = await _userManager.FindByIdAsync(id);
                return Ok(users);
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost(Name = "InsertUser")]
        public async Task<IActionResult> UserCreate(User user)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    ApplicationUser appUser = new ApplicationUser
                    {
                        UserName = user.UserName,
                        Email = user.Email
                    };
                    IdentityResult result = await _userManager.CreateAsync(appUser, user.Password);

                    if (result.Succeeded)
                    {
                        return Ok(result);
                    }
                    else
                    {
                        foreach (IdentityError error in result.Errors)
                        {
                            ModelState.AddModelError("", error.Description);
                        }
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
                
            }
            return BadRequest();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser(string id, User data)
        {
            var user = await _userManager.FindByIdAsync(id);
            if(user == null)
            {
                return NotFound();
            }
            user.Email = data.Email;
            user.UserName = data.UserName;

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded) 
            {
                return Ok(result);
            }
            return BadRequest(result.Errors);
        }


        // Role Section 

        [HttpGet(Name = "GetAllRole")]
        public async Task<ActionResult> GetAllRole()
        {
            try
            {
                var users = _roleManager.Roles.ToList();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet(Name = "GetAllRoleNameAndId")]
        public async Task<ActionResult> GetAllRoleNameAndId()
        {
            try
            {
                var roles = _roleManager.Roles.Select(role => new
                {
                    Id = role.Id,
                    Name = role.Name,
                }).ToList();
                return Ok(roles);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet(Name = "GetRoleById")]
        public async Task<ActionResult> GetRoleById(string id)
        {
            try
            {
                var users = await _roleManager.FindByIdAsync(id);
                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost(Name = "InsertRole")]
        public async Task<IActionResult> RoleCreate([Required] string name)
        {
            if (ModelState.IsValid)
            {
                try
                {

                    IdentityResult result = await _roleManager.CreateAsync(new ApplicationRole() { Name = name});

                    if (result.Succeeded)
                    {
                        return Ok(result);
                    }
                    else
                    {
                        var errors = new List<string>();
                        foreach (IdentityError error in result.Errors)
                        {
                            errors.Add(error.Description);
                        }

                        var errorResponse = new
                        {
                            Message = "Fail to create user",
                            errors = errors
                        };
                        return BadRequest(errorResponse);
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            return BadRequest();
        }
    }
}
