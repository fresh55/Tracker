using Microsoft.EntityFrameworkCore;
using Backend.src.Application.Common.Interfaces;

namespace Backend.src.Application.Balances2.Queries.GetAllIncomes;

public record GetTotalIncome(int BalanceId) : IRequest<List<IncomeDto>>;

public class GetTotalIncomeHandler : IRequestHandler<GetTotalIncome, List<IncomeDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetTotalIncomeHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<IncomeDto>> Handle(GetTotalIncome request, CancellationToken cancellationToken)
    {
        var balance = await _context.Balances
                .Include(b => b.Incomes)
                .FirstOrDefaultAsync(b => b.Id == request.BalanceId);

        if (balance == null)
        {
            throw new NotFoundException(nameof(Balance), request.BalanceId.ToString());
        }

        return _mapper.Map<List<IncomeDto>>(balance.Incomes);
    }

}


