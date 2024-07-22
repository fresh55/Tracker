using MediatR;
using Microsoft.AspNetCore.Identity;
using Backend.src.Infrastructure.Identity;
using Backend.src.Application.Common.Interfaces;
using Backend.src.Domain.Entities;

namespace Backend.src.Application.Users.Commands.RegisterUser;

public class RegisterUserCommand : IRequest<IdentityResult>
{
    public required string Email { get; init; }
    public required string Password { get; init; }
}

public class  RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, IdentityResult>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IApplicationDbContext _context;

    public RegisterUserCommandHandler(UserManager<ApplicationUser> userManager, IApplicationDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }
    
    public async Task<IdentityResult> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        var user = new ApplicationUser
        {
            UserName = request.Email,
            Email = request.Email
        };

        var result = await _userManager.CreateAsync(user, request.Password);

        if (result.Succeeded)
        {
            user.Balance = new Balance { ApplicationUserId = user.Id };
            await _context.SaveChangesAsync(cancellationToken);
        }

        return result;
    }
}