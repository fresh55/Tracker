using Microsoft.AspNetCore.Mvc;

using Backend.src.Infrastructure.Data;
using Backend.src.Application.Common.Interfaces;
using Backend.src.Web.Services;
using System.Text.Json.Serialization;

namespace Backend;

public static class DependencyInjection
{
    public static IServiceCollection AddWebServices(this IServiceCollection services)
    {
        services.AddDatabaseDeveloperPageExceptionFilter();
        services.AddCors(options =>
        {
            options.AddDefaultPolicy(
                policy =>
                {
                    policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
                });
        });



        services.AddScoped<IUser, CurrentUser>();

        services.AddHttpContextAccessor();

        services.AddHealthChecks()
            .AddDbContextCheck<ApplicationDbContext>();

        services.AddExceptionHandler<CustomExceptionHandler>();
        services.AddRazorPages();
        services.AddControllers().AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
            options.JsonSerializerOptions.MaxDepth = 64; // Optional, set a custom depth if needed
        });
        // Customise default API behaviour
        services.Configure<ApiBehaviorOptions>(options =>
            options.SuppressModelStateInvalidFilter = true);
        // Use CORS policy
        
        services.AddEndpointsApiExplorer();
        services.AddOpenApiDocument();

        return services;
    }


}
