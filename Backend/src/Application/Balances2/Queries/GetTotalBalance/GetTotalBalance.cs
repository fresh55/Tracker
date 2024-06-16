using Microsoft.EntityFrameworkCore;
using Backend.src.Application.Common.Interfaces;

namespace Backend.src.Application.Balances2.Queries.GetTotalBalance;

public class GetTotalBalance : IRequest<decimal>
{

   public int BalanceId { get; set; }
}

public class GetTotalBalanceHandler : IRequestHandler<GetTotalBalance, decimal>
{
    private readonly IApplicationDbContext _context;


    public GetTotalBalanceHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<decimal> Handle(GetTotalBalance request, CancellationToken cancellationToken)
    {
        var balance = await _context.Balances
            .FindAsync(new object[] { request.BalanceId }, cancellationToken);

        if (balance == null)
        {
            throw new Exception("Balance not found");
        }

        return balance.TotalAmount;

    }
}

