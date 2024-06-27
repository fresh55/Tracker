using Backend.src.Application.Common.Models;
using Backend.src.Infrastructure.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Backend.src.Application.Common.Interfaces;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Diagnostics;

namespace Backend.src.Infrastructure.Identity
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IUserClaimsPrincipalFactory<ApplicationUser> _userClaimsPrincipalFactory;
        private readonly IAuthorizationService _authorizationService;
        private readonly IUser _currentUser;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IdentityService(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IUserClaimsPrincipalFactory<ApplicationUser> userClaimsPrincipalFactory,
            IAuthorizationService authorizationService,
            IUser currentUser,
            IHttpContextAccessor httpContextAccessor) // Removed ITokenService
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _userClaimsPrincipalFactory = userClaimsPrincipalFactory;
            _authorizationService = authorizationService;
            _currentUser = currentUser;
            _httpContextAccessor = httpContextAccessor; // Initialize IHttpContextAccessor
        }

        public async Task<bool> AuthorizeAsync(string userId, string policyName)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return false;
            }

            var principal = await _userClaimsPrincipalFactory.CreateAsync(user);

            var result = await _authorizationService.AuthorizeAsync(principal, policyName);

            return result.Succeeded;
        }


        public async Task<string> GetUserIdAsync(ClaimsPrincipal user)
        {
            var appUser = await _userManager.GetUserAsync(user);
            return appUser?.Id;
        }

        public async Task<string> GetUserNameAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            return user?.UserName;
        }

        public async Task<(Result Result, string UserId)> CreateUserAsync(string userName, string password)
        {
            var user = new ApplicationUser
            {
                UserName = userName,
                Email = userName,
            };

            var result = await _userManager.CreateAsync(user, password);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<bool> IsInRoleAsync(string userId, string role)
        {
            var user = await _userManager.FindByIdAsync(userId);

            return user != null && await _userManager.IsInRoleAsync(user, role);
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
                Console.WriteLine("User principal is null");
                return null;
            }

            var userId = userPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                Console.WriteLine("User ID is null");
                return null;
            }

            var user = await _userManager.FindByIdAsync(userId);
            
            return user;
        }
    }
}