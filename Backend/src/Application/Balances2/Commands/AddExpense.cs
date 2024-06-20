using MediatR;
using Backend.src.Application.Common.Interfaces;
using Backend.src.Domain.Entities;
using Backend.src.Application.Balances2;

namespace Backend.src.Application.Balances2.Commands.AddExpense;

public record AddExpenseCommand : IRequest<Expense>
{
    public decimal Amount { get; init; }
    public DateTime DateAdded { get; set; }
    public string Description { get; set; }
    public int BalanceId { get; init; }

}

public class AddExpenseCommandHandler : IRequestHandler<AddExpenseCommand, Expense>
{
    private readonly IApplicationDbContext _context;

    public AddExpenseCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Expense> Handle(AddExpenseCommand request, CancellationToken cancellationToken)
    {
        var balance = await _context.Balances.FirstOrDefaultAsync(b => b.Id == request.BalanceId, cancellationToken);
        if (balance == null)
        {
            throw new Exception("Balance not found");
        }

        var expense = new Expense(request.Amount, request.Description, request.DateAdded);
        balance.AddExpense(expense);
        await _context.SaveChangesAsync(cancellationToken);

        return expense;

    }
}
