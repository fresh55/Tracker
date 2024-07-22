using Backend.src.Application.Common.Interfaces;
using Backend.src.Infrastructure.Data;
using Backend.src.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.Cookies;
using Backend.src.Infrastructure.Services;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
namespace Microsoft.Extensions.DependencyInjection;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        Guard.Against.Null(connectionString, message: "Connection string 'DefaultConnection' not found.");

        services.AddAuthorization();
        services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie();
        services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));
        services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());

        services.AddScoped<ApplicationDbContextInitialiser>();
        services
            .AddDefaultIdentity<ApplicationUser>()
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>();

 
        services.AddTransient<IIdentityService, IdentityService>();
        services.AddSingleton<IComputerVisionClient>(sp =>
        {
            return new ComputerVisionClient(new ApiKeyServiceClientCredentials(configuration["AzureComputerVision:ApiKey"]))
            {
                Endpoint = configuration["AzureComputerVision:Endpoint"]
            };
        });
       


        services.AddScoped<IOcrService, OcrService>();

        services.AddScoped<ITextAnalysisService, OpenAIInvoiceAnalysisService>();
        return services;
    }
}