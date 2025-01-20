using Gameshop.model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;
using System.Data;
using ZstdSharp.Unsafe;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace GameShop.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IdentityController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly ILogger<IdentityController> _logger;
        public IdentityController(UserManager<ApplicationUser> userManager, 
            RoleManager<ApplicationRole> roleManager,
            ILogger<IdentityController> logger)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _logger = logger;
        }

        // User Section
        [HttpGet("User/[action]", Name= "GetAllUser")]
        public async Task<ActionResult> GetAllUser()
        {
            try
            {
                var users = _userManager.Users.ToList();
                if(users == null)
                {
                    _logger.LogInformation($"Cannot find any user");
                    return NotFound(new { message = "Cannot find any user!"}); 
                }
                _logger.LogInformation("Get All user");
                return Ok(users);
            }
            catch (Exception ex) 
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }    
        }

        [HttpGet("User/[action]", Name = "GetAllUserNameAndId")]
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
                if (users == null)
                {
                    _logger.LogInformation("Cannot find any user");
                    return NotFound(new { message = "Cannot find any user!" });
                }
                _logger.LogInformation("Get All use Name and Id");
                return Ok(users);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("User/[action]", Name = "GetUserById")]
        public async Task<ActionResult> GetUserById(string Id)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(Id);
                if (user == null)
                {
                    _logger.LogInformation("Cannot find any user");
                    return NotFound(new { message = "Cannot find this user!" });
                }
                _logger.LogInformation($"Get User by Id {Id}");
                return Ok(user);
            }
            catch (Exception ex) 
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("User/[action]", Name = "InsertUser")]
        public async Task<IActionResult> CreateUser(User user)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    ApplicationUser appUser = new ApplicationUser
                    {
                        UserName = user.UserName,
                        Email = user.Email,
                        SecurityStamp = Guid.NewGuid().ToString()
                    };
                    IdentityResult result = await _userManager.CreateAsync(appUser, user.Password);
                    List<string> roleNames = new List<string>();
                    foreach (var roleId in user.Roles) 
                    {
                        var role = await _roleManager.FindByIdAsync(roleId);
   
                        if (role == null)
                        {
                            _logger.LogInformation($"Cannot find role with {roleId} when creating user");
                            return BadRequest("Role with ID {roleId} does not exist");
                        }
                        roleNames.Add(role.Name);
                    }
                    
                    var roleAssignResult = await _userManager.AddToRolesAsync(appUser, roleNames);


                    if (result.Succeeded && roleAssignResult.Succeeded)
                    {
                        _logger.LogInformation("Creating user");
                        return Ok(result);
                    }
                    else
                    {
                        foreach (IdentityError error in result.Errors)
                        {
                            _logger.LogError(error.Description);
                            ModelState.AddModelError("", error.Description);
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex.Message);
                    return BadRequest(ex.Message);
                }
                
            }
            _logger.LogError("Model State is not valid");
            return BadRequest();
        }

        [HttpPut("User/[action]", Name = "UpdateUser")]
        public async Task<IActionResult> UpdateUser(string Id, User data)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(Id);
                if(user == null)
                {
                    _logger.LogInformation($"Cannot find user with Id {Id}");
                    return NotFound(new { message = "Cannot find this user"});
                }
                user.Email = data.Email;
                user.UserName = data.UserName;

                var result = await _userManager.UpdateAsync(user);

                if (result.Succeeded) 
                {
                    _logger.LogInformation($"Update user with Id {Id}");
                    return Ok(result);
                }
                _logger.LogError($"fail to update user with Id {Id}, {result.Errors}");
                return BadRequest(result.Errors);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
            
        }

        [HttpDelete("User/[action]", Name = "DeleteUser")]
        public async Task<IActionResult> DeleteUser(string Id)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(Id);
                if (user == null)
                {
                    _logger.LogInformation($"Cannot find user with {Id}");
                    return NotFound(new { message = $"Cannot find this user with {Id}" });
                }
                var result = await _userManager.DeleteAsync(user);

                if (result.Succeeded)
                {
                    _logger.LogInformation($"Delete user with Id {Id}");
                    return Ok(result);
                }
                _logger.LogError($"Fail to delete user as {result.Errors}");
                return BadRequest(result.Errors);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }


        // Role Section 
        [HttpGet("Role/[action]", Name = "GetAllRole")]
        public async Task<ActionResult> GetAllRole()
        {
            try
            {
                var roles = _roleManager.Roles.ToList();
                if (roles == null)
                {
                    _logger.LogInformation($"Cannot find any role");
                    return NotFound(new { message = "Cannot find any role!"});
                }
                _logger.LogInformation($"Get all role");
                return Ok(roles);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Role/[action]", Name = "GetAllRoleNameAndId")]
        public async Task<ActionResult> GetAllRoleNameAndId()
        {
            try
            {
                var roles = _roleManager.Roles.Select(role => new
                {
                    Id = role.Id,
                    Name = role.Name,
                }).ToList();
                if (roles == null)
                {
                    _logger.LogInformation("Cannot find any role");
                    return NotFound(new { message = "Cannot find any role!" });
                }
                _logger.LogInformation("Get all role name and id");
                return Ok(roles);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Role/[action]", Name = "GetRoleById")]
        public async Task<ActionResult> GetRoleById(string Id)
        {
            try
            {
                var role = await _roleManager.FindByIdAsync(Id);
                if (role == null)
                {
                    _logger.LogInformation($"Cannot find role by Id {Id}");
                    return NotFound(new { message = "Cannot find this role!" });
                }
                _logger.LogInformation($"Get role by Id {Id}");
                return Ok(role);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Role/[action]", Name = "InsertRole")]
        public async Task<IActionResult> CreateRole([Required] string name)
        {
            if (ModelState.IsValid)
            {
                try
                {

                    IdentityResult result = await _roleManager.CreateAsync(new ApplicationRole() { Name = name });

                    if (result.Succeeded)
                    {
                        _logger.LogInformation($"Create role successfully");
                        return Ok(result);
                    }
                    else
                    {
                        var errors = new List<string>();
                        foreach (IdentityError error in result.Errors)
                        {
                            _logger.LogError($"Create role failed as {error}");
                            errors.Add(error.Description);
                        }

                        var errorResponse = new
                        {
                            Message = "Fail to create role",
                            Errors = errors
                        };
                        _logger.LogError($"Insert role fail as {errors} to db");
                        return BadRequest(errorResponse);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex.Message);
                    return BadRequest(ex.Message);
                }
            }
            return BadRequest();
        }

        [HttpPut("Role/[action]", Name = "UpdateRole")]
        public async Task<IActionResult> UpdateRole(string Id, string name)
        {
            try
            {
                var role = await _roleManager.FindByIdAsync(Id);
                if (role == null)
                {
                    _logger.LogInformation($"Cannot find role with Id {Id}");
                    return NotFound(new { message = "Cannot find this role" });
                }
                role.Name = name;
                var result = await _roleManager.UpdateAsync(role);
                if (result.Succeeded)
                {
                    _logger.LogInformation($"Update role with Id {Id}");
                    return Ok(result);
                }
                else
                {
                    var errors = new List<string>();
                    _logger.LogError($"Fail to update role as {errors}");
                    return BadRequest(errors);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }   
        }

        [HttpDelete("Role/[action]", Name = "DeleteRole")]
        public async Task<IActionResult> DeleteRole(string Id)
        {
            try
            {
                var role = await _roleManager.FindByIdAsync(Id);
                if (role == null)
                {
                    _logger.LogInformation($"Cannot find this role with Id {Id}");
                    return NotFound(new { message = "Cannot find this role" });
                }
                var result = await _roleManager.DeleteAsync(role);
                if (result.Succeeded)
                {
                    _logger.LogInformation($"Delete role with Id {Id}");
                    return Ok(result);
                }
                else
                {
                    var errors = new List<string>();
                    _logger.LogError($"Fail to delete role with Id {Id} as {errors}");
                    return BadRequest(errors);
                }
                
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }

        }
    }
}
