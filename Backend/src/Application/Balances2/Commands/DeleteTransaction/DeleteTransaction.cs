using Backend.src.Application.Common.Interfaces;
using Backend.src.Domain.Entities;


namespace Backend.src.Application.Balances2.Commands.DeleteTransaction;

public record DeleteTransactionCommand : IRequest
{
    public int Id { get; init; }
    public string UserId { get; init; }
    public string TransactionType { get; init; }
}

public class DeleteTransactionCommandHandler : IRequestHandler<DeleteTransactionCommand>
{
    private readonly IApplicationDbContext _context;

    public DeleteTransactionCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(DeleteTransactionCommand request, CancellationToken cancellationToken)
    {
        var balance = await _context.Balances
            .Include(b => b.Incomes)
            .Include(b => b.Expenses)
            .FirstOrDefaultAsync(b => b.ApplicationUserId == request.UserId, cancellationToken);

        if (balance == null)
        {
            throw new NotFoundException(nameof(Balance), request.UserId);
        }

        if (request.TransactionType == "Income")
        {
            var income = balance.Incomes.FirstOrDefault(i => i.Id == request.Id);
            if (income == null)
            {
                throw new NotFoundException(nameof(Income), request.Id.ToString());
            }
            balance.RemoveIncome(income);
        }
        else if (request.TransactionType == "Expense")
        {
            var expense = balance.Expenses.FirstOrDefault(e => e.Id == request.Id);
            if (expense == null)
            {
                throw new NotFoundException(nameof(Expense), request.Id.ToString());
            }
            balance.RemoveExpense(expense);
        }
        else
        {
            throw new ArgumentException("Invalid transaction type", nameof(request.TransactionType));
        }

        await _context.SaveChangesAsync(cancellationToken);
    }
}