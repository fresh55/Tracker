using Microsoft.EntityFrameworkCore;
using Backend.src.Application.Common.Interfaces;

namespace Backend.src.Application.Balances2.Queries.GetBalance;

public record GetBalance(int Id) : IRequest<BalanceDto>;

public class GetBalanceHandler : IRequestHandler<GetBalance, BalanceDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetBalanceHandler(IApplicationDbContext context,IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<BalanceDto> Handle(GetBalance request, CancellationToken cancellationToken)
    {
        var balance = await _context.Balances
          .Include(b => b.Incomes)
          .Include(b => b.Expenses)
          .AsSplitQuery() // Use split query for this specific query
          .FirstOrDefaultAsync(b => b.Id == request.Id, cancellationToken);

        if (balance == null)
        {
            throw new Exception("Balance not found");
        }

        return _mapper.Map<BalanceDto>(balance);

}
}

