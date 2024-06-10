using MediatR;
using Backend.src.Application.Common.Interfaces;
using Backend.src.Domain.Entities;
using Backend.src.Application.Balances2;

namespace Backend.src.Application.Balance2.Commands.CreateBalance;

public record CreateBalanceCommand : IRequest<int>
{
    public decimal Amount { get; init; }
    public List<ExpenseDto> Expenses { get; init; }
    public List<IncomeDto> Incomes { get; init; }
}
public class CreateBalanceCommandHandler : IRequestHandler<CreateBalanceCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateBalanceCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateBalanceCommand request, CancellationToken cancellationToken)
    {
        var entity = new Balance();

        _context.Balances.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }

    
}
