using Microsoft.EntityFrameworkCore;
using Backend.src.Application.Common.Interfaces;

namespace Backend.src.Application.Balances2.Queries.GetTotalBalance;

public record GetTotalBalance(int Id) : IRequest<decimal>;

public class GetTotalBalanceHandler : IRequestHandler<GetTotalBalance, decimal>
{
    private readonly IApplicationDbContext _context;


    public GetTotalBalanceHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<decimal> Handle(GetTotalBalance request, CancellationToken cancellationToken)
    {
        var balance = await _context.Balances.FindAsync(request.Id, cancellationToken);
        Console.WriteLine(balance.TotalAmount); 
        if (balance == null)
        {
            throw new Exception("Balance not found");
        }

        return balance.TotalAmount;

    }
}

