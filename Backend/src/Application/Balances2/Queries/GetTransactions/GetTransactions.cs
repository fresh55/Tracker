using Backend.src.Application.Common.Interfaces;
namespace Backend.src.Application.Balances2.Queries.GetTransactions;

    public record GetTransactions(string UserId) : IRequest<List<TransactionDto>>;

public class GetTransactionsHandler : IRequestHandler<GetTransactions, List<TransactionDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetTransactionsHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }


    public async Task<List<TransactionDto>> Handle(GetTransactions request, CancellationToken cancellationToken)
    {
        var balance = await _context.Balances
                .Include(b => b.Expenses)
                .Include(b => b.Incomes)
                .FirstOrDefaultAsync(b => b.ApplicationUserId == request.UserId);

        if (balance == null)
        {
            throw new NotFoundException(nameof(Balance), request.UserId.ToString());
        }

        var transactions = new List<TransactionDto>();

        transactions.AddRange(_mapper.Map<List<TransactionDto>>(balance.Expenses));
        transactions.AddRange(_mapper.Map<List<TransactionDto>>(balance.Incomes));

        return transactions;
    }

}

    
  

