using Gameshop.model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace GameShop.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IdentityController : Controller
    {
        private UserManager<ApplicationUser> _userManager;
        private RoleManager<ApplicationRole> _roleManager;
        public IdentityController(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
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
                    return NotFound(new { message = "Cannot find any user!"}); 
                }
                return Ok(users);
            }
            catch (Exception ex) 
            {
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
                    return NotFound(new { message = "Cannot find any user!" });
                }
                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("User/[action]", Name = "GetUserById")]
        public async Task<ActionResult> GetUserById(string id)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(id);
                if (user == null)
                {
                    return NotFound(new { message = "Cannot find this user!" });
                }
                return Ok(user);
            }
            catch (Exception ex) 
            {
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
                            return BadRequest("Role with ID {roleId} does not exist");
                        }
                        roleNames.Add(role.Name);
                    }
                    
                    var roleAssignResult = await _userManager.AddToRolesAsync(appUser, roleNames);


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

        [HttpPut("User/[action]", Name = "UpdateUser")]
        public async Task<IActionResult> UpdateUser(string id, User data)
        {
            var user = await _userManager.FindByIdAsync(id);
            if(user == null)
            {
                return NotFound(new { message = "Cannot find this user"});
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

        [HttpDelete("User/[action]", Name = "DeleteUser")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "Cannot find this user" });
            }
            var result = await _userManager.DeleteAsync(user);

            if (result.Succeeded)
            {
                return Ok(result);
            }
            return BadRequest(result.Errors);
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
                    return NotFound(new { message = "Cannot find any role!"});
                }
                return Ok(roles);
            }
            catch (Exception ex)
            {
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
                    return NotFound(new { message = "Cannot find any role!" });
                }
                return Ok(roles);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Role/[action]", Name = "GetRoleById")]
        public async Task<ActionResult> GetRoleById(string id)
        {
            try
            {
                var role = await _roleManager.FindByIdAsync(id);
                if (role == null)
                {
                    return NotFound(new { message = "Cannot find this role!" });
                }
                return Ok(role);
            }
            catch (Exception ex)
            {
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
                            Message = "Fail to create role",
                            Errors = errors
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

        [HttpPut("Role/[action]", Name = "UpdateRole")]
        public async Task<IActionResult> UpdateRole(string id, string name)
        {
            var role = await _roleManager.FindByIdAsync(id);
            if (role == null)
            {
                return NotFound(new { message = "Cannot find this role" });
            }
            role.Name = name;
            var result = await _roleManager.UpdateAsync(role);
            if (result.Succeeded)
            {
                return Ok(result);
            }
            return BadRequest(result.Errors);
        }

        [HttpDelete("Role/[action]", Name = "DeleteRole")]
        public async Task<IActionResult> DeleteRole(string id)
        {
            var role = await _roleManager.FindByIdAsync(id);
            if (role == null)
            {
                return NotFound(new { message = "Cannot find this role" });
            }
            var result = await _roleManager.DeleteAsync(role);
            if (result.Succeeded)
            {
                return Ok(result);
            }
            return BadRequest(result.Errors);
        }
    }
}
