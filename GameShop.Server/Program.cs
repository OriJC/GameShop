using Gameshop.model;
using GameShop.Data.Data;
using GameShop.Data.Repository;
using GameShop.Data.Repository.IRepository;
using GameShop.Server.Middlewares;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using MongoDB.Driver.Core.Configuration;
using System;
using System.Text;
using System.Text.Json;


// Add builder to the app
var builder = WebApplication.CreateBuilder(args);

// Read MongoDB connection string and database name from configuration
var connectionString = builder.Configuration.GetValue<string>("MongoDB:ConnectionString");
var databaseName = builder.Configuration.GetValue<string>("MongoDB:DatabaseName");

// Convert the JWT Secert into a byte array
var key = Encoding.ASCII.GetBytes(builder.Configuration["JWT:Secret"]);


// Add Logging to the app
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("default", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
});
builder.Services.AddSingleton<IMongoClient>(serviceProvider =>
{
    return new MongoClient(connectionString);
});

builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
    .AddMongoDbStores<ApplicationUser, ApplicationRole, Guid>(
        connectionString, databaseName
     )
    .AddDefaultTokenProviders();

builder.Services.AddScoped<IMongoContext, MongoContext>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).
AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };

    options.Events = new JwtBearerEvents
    {

        OnChallenge = context =>
        {
            context.HandleResponse();
            if (!context.Response.HasStarted)
            {
                // Add Header
                context.Response.Headers["Access-Control-Allow-Origin"] = "*";
                context.Response.Headers["Access-Control-Allow-Headers"] = "*";
                context.Response.Headers["Access-Control-Allow-Methods"] = "*";
                // Set the response status code and message
                context.Response.StatusCode = 401;
                context.Response.ContentType = "application/json";
                var result = JsonSerializer.Serialize(new { code = 401, message = "Unauthorized access. Please log in." });
                Console.WriteLine("result");
                return context.Response.WriteAsync(result);
            }
            return Task.CompletedTask;
        },
        OnForbidden = context =>
        {
            if (!context.Response.HasStarted)
            {
                context.Response.StatusCode = 403;
                context.Response.ContentType = "application/json";
                var result = JsonSerializer.Serialize(new { code = 403, message = "Forbidden access. You do not have permission to access this resource." });
                return context.Response.WriteAsync(result);
            }
            return Task.CompletedTask;
        }
    };
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("default");
// Add the custom error response middleware to the pipeline
//app.UseErrorResponseMiddleware();
app.UseWhen(context => context.Request.Path.StartsWithSegments("/api"), appBuilder =>
{
    appBuilder.UseAuthentication();
    appBuilder.UseAuthorization();
});


app.MapControllers();
app.MapFallbackToFile("/index.html");

app.Run();
