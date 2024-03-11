        using Microsoft.EntityFrameworkCore;
        using System;
        using Tracker.src.Infrastructure.Data;

        namespace Tracker.src.Infrastructure
        {
            public static class DependencyInjection
            {
                public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
                {
                    var connectionString = configuration.GetConnectionString("DefaultConnection");
                    Guard.Against.Null(connectionString, message: "Connection string 'DefaultConnection' not found.");
                    services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));
                    services.AddScoped<ApplicationDbContextInitialiser>();
            return services;
                }
            }
        }


