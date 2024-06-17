using MediatR;
using Backend.src.Application.Common.Interfaces;
using Backend.src.Domain.Entities;
using Backend.src.Application.Balances2;

namespace Backend.src.Application.Balances2.Commands.AddIncome;

public record AddIncomeCommand : IRequest<Income>
{
    public decimal Amount { get; init; }
    public DateTime DateAdded { get; set; }
    public string Description  { get; set; }
    public int Id { get; init; }

}

public class AddIncomeCommandHandler : IRequestHandler<AddIncomeCommand,Income>
{
    private readonly IApplicationDbContext _context;

    public AddIncomeCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Income> Handle(AddIncomeCommand request, CancellationToken cancellationToken)
    {
        var balance = await _context.Balances.FindAsync(request.Id);
        if (balance == null)
        {
            throw new Exception("Balance not found");
        }

        var income = new Income(request.Amount, request.Description, request.DateAdded);
        balance.AddIncome(income);
       

        return income;
    }
}
