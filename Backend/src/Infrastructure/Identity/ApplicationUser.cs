using Microsoft.AspNetCore.Identity;

namespace Backend.src.Infrastructure.Identity;

public class ApplicationUser : IdentityUser
{
    [PersonalData]
    public string? FirstName { get; set; }
    [PersonalData]
    public string? LastName { get; set; }
    [PersonalData]
    public int? UsernameChangeLimit { get; set; } = 10;
}