using Gameshop.model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GameShop.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthenticationController> _logger;

        public AuthenticationController(
            UserManager<ApplicationUser> userManager,
            RoleManager<ApplicationRole> roleManager,
            IConfiguration configuration,
            ILogger<AuthenticationController> logger)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _logger = logger;
        }


        [NonAction]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            try 
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogError("Invalid model state");
                    return BadRequest("Invalid input");
                }
                var user = new ApplicationUser
                {
                    UserName = model.UserName,
                    Email = model.Email
                };
                var result = await _userManager.CreateAsync(user, model.Password);
                if (!result.Succeeded)
                {   
                    _logger.LogError($"Register user failed: {result.Errors}");
                    return BadRequest(result.Errors);
                    
                }
                _logger.LogError("User created successfully");
                return Ok("User registered successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(model.UserName);
                if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
                {
                    _logger.LogInformation($"Invalid username or password with UserName{model.UserName}");
                    return Unauthorized("Invalid username or password");
                }

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"]);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.UserName)
                }),
                    Expires = DateTime.UtcNow.AddHours(1),
                    SigningCredentials = new SigningCredentials
                    (
                        new SymmetricSecurityKey(key),
                        SecurityAlgorithms.HmacSha256Signature
                    )
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);
                _logger.LogInformation($"Get Token successfully, userName: {user.UserName}");
                return Ok(new { Token = tokenString, UserName = user.UserName });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }

        }
    }

    

    public class RegisterModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }

    public class LoginModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
