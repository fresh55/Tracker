using Backend.src.Infrastructure.Identity;

namespace Backend.src.Application.Common.Interfaces
{
    public interface ITokenService
    {
        Task<string> GenerateTokenAsync(ApplicationUser user);
    }
}
