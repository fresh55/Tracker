using Backend.src.Infrastructure.Identity;
using Backend.src.Application.Common.Interfaces;
using Microsoft.AspNetCore.Authorization;
namespace Backend.src.Web.Endpoints;

public class User : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetUserNameAsync, "/getUserName/{userId}")
            .MapGet(GetCurrentUserAsync, "/getCurrentUserId")
            .MapIdentityApi<ApplicationUser>();
        
    }



    private static async Task<IResult> GetUserNameAsync(string userId, IIdentityService identityService)
    {
        var userName = await identityService.GetUserNameAsync(userId);
        return userName != null ? Results.Ok(userName) : Results.NotFound();
    }

    private static async Task<ApplicationUser> GetCurrentUserAsync(IIdentityService identityService)
    {
        var user = await identityService.GetCurrentUserAsync();
        return user;
    }

}
