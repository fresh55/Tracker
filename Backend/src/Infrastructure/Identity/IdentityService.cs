using Backend.src.Application.Common.Models;
using Backend.src.Infrastructure.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Backend.src.Application.Common.Interfaces;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Diagnostics;
using Backend.src.Infrastructure.Data;  


namespace Backend.src.Infrastructure.Identity
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ApplicationDbContext _context;

        public IdentityService(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IHttpContextAccessor httpContextAccessor,
            ApplicationDbContext context
            ) 
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }

 


        public async Task<string> GetUserIdAsync(ClaimsPrincipal user)
        {
            var appUser = await _userManager.GetUserAsync(user);
            return appUser?.Id;
        }

        public async Task<string> GetUserNameAsync(string userId)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == userId);
            return user?.UserName ?? string.Empty;
        }


            public async Task<Result> DeleteUserAsync(ApplicationUser user)
        {
            var result = await _userManager.DeleteAsync(user);

            return result.ToApplicationResult();
        }

        public async Task<ApplicationUser> GetCurrentUserAsync()
        {
            var userPrincipal = _httpContextAccessor.HttpContext?.User;
            if (userPrincipal == null)
            {
                return null;
            }

            var userId = userPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return null;
            }

            return await _userManager.FindByIdAsync(userId);
        }
    }
}