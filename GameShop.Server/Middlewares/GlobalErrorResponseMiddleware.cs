using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace GameShop.Server.Middlewares
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class GlobalErrorResponseMiddleware
    {
        private readonly RequestDelegate _next;

        public GlobalErrorResponseMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public Task Invoke(HttpContext httpContext)
        {

            return _next(httpContext);
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class GlobalErrorResponseMiddlewareExtensions
    {
        public static IApplicationBuilder UseGlobalErrorResponseMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<GlobalErrorResponseMiddleware>();
        }
    }
}
