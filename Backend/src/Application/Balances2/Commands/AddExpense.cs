using MediatR;
using Backend.src.Application.Common.Interfaces;
using Backend.src.Domain.Entities;
using Backend.src.Application.Balances2;

namespace Backend.src.Application.Balances2.Commands.AddExpense;

public record AddExpenseCommand : IRequest<ExpenseDto>
{
    public decimal Amount { get; init; }
    public DateTime DateAdded { get; set; }
    public string Description { get; set; }
    public string UserId { get; init; }

}

public class AddExpenseCommandHandler : IRequestHandler<AddExpenseCommand, ExpenseDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;


    public AddExpenseCommandHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<ExpenseDto> Handle(AddExpenseCommand request, CancellationToken cancellationToken)
    {
        var balance = await _context.Balances
       .FirstOrDefaultAsync(b => b.ApplicationUserId == request.UserId, cancellationToken);
        if (balance == null)
        {
            throw new Exception("Balance not found");
        }

        var expense = new Expense(request.Amount, request.Description, request.DateAdded);
        balance.AddExpense(expense);
        await _context.SaveChangesAsync(cancellationToken);

        return _mapper.Map<ExpenseDto>(expense);

    }
}
