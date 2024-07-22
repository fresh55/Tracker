
using Backend;
using Backend.src.Application;
using Backend.src.Infrastructure.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Antiforgery;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddWebServices();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    await app.InitialiseDatabaseAsync();
  
    
}
// Add OpenAPI 3.0 document serving middleware
// Available at: http://localhost:<port>/swagger/v1/swagger.json
app.UseOpenApi();

// Add web UIs to interact with the document
app.UseSwaggerUi(settings =>
{
    settings.Path = "/api";
    
});


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.UseCors();



app.MapRazorPages();

app.MapEndpoints();

app.Run();
