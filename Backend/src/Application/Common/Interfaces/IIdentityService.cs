using Backend.src.Application.Common.Models;
using Backend.src.Infrastructure.Identity;
using System.Security.Claims;

namespace Backend.src.Application.Common.Interfaces;

    public interface IIdentityService
    {
        Task<string> GetUserNameAsync(string userId);
        Task<bool> IsInRoleAsync(string userId, string role);
        Task<(Result Result, string UserId)> CreateUserAsync(string userName, string password);
        Task<string> GetUserIdAsync(ClaimsPrincipal user);
        Task<bool> AuthorizeAsync(string userId, string policyName);
        Task<ApplicationUser> GetCurrentUserAsync();
}
