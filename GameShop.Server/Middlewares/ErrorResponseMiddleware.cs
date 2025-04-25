using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace GameShop.Server.Middlewares
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class ErrorResponseMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorResponseMiddleware> _logger;

        public ErrorResponseMiddleware(RequestDelegate next, ILogger<ErrorResponseMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
                _logger.LogInformation(context.Response.StatusCode.ToString());
                if ((context.Response.StatusCode == 401 || context.Response.StatusCode == 403) && !context.Response.HasStarted)
                {

                    _logger.LogInformation("Unauthorized or Forbidden access attempt.");
                    context.Response.ContentType = "application/json";
                    var msg = context.Response.StatusCode switch
                    {
                        401 => "Unauthorized access. Please log in.",
                        403 => "Forbidden access. You do not have permission to access this resource.",
                        _ => "An error occurred."
                    };
                    var result = JsonSerializer.Serialize(new { code = context.Response.StatusCode, message = msg });
                    await context.Response.WriteAsync(result);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while processing the request.");
                if(!context.Response.HasStarted)
                {
                    context.Response.ContentType = "application/json";
                    context.Response.StatusCode = 500;
                    var result = JsonSerializer.Serialize(new { code = 500, message = "Internal Server Error" });
                    await context.Response.WriteAsync(result);
                }
            }   
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class ErrorResponseMiddlewareExtensions
    {
        public static IApplicationBuilder UseErrorResponseMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ErrorResponseMiddleware>();
        }
    }
}
