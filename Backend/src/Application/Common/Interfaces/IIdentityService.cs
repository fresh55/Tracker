using Backend.src.Application.Common.Models;
using Backend.src.Infrastructure.Identity;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;

namespace Backend.src.Application.Common.Interfaces;

    public interface IIdentityService
    {
        Task<string> GetUserNameAsync(string userId);
        Task<bool> IsInRoleAsync(string userId, string role);
    Task<IdentityResult> CreateUserAsync(string email, string password);
        Task<string> GetUserIdAsync(ClaimsPrincipal user);

        Task<ApplicationUser> GetCurrentUserAsync();
}
