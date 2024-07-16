using MediatR;
using Backend.src.Application.Common.Interfaces;
using Backend.src.Domain.Entities;
using Backend.src.Application.Balances2;

namespace Backend.src.Application.Balances2.Commands.AddIncome;

public record AddIncomeCommand : IRequest<IncomeDto>
{
    public decimal Amount { get; init; }
    public DateTime DateAdded { get; set; }
    public string Description  { get; set; }
    public string UserId  { get; init; }

}

public class AddIncomeCommandHandler : IRequestHandler<AddIncomeCommand, IncomeDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public AddIncomeCommandHandler(IApplicationDbContext context,IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
         
    }

    public async Task<IncomeDto> Handle(AddIncomeCommand request, CancellationToken cancellationToken)
    {
        var balance = await _context.Balances.FirstOrDefaultAsync(b => b.ApplicationUserId == request.UserId, cancellationToken);
        if (balance == null)
        {
            throw new Exception("Balance not found");
        }

        var income = new Income(request.Amount, request.Description, request.DateAdded);
        
        balance.AddIncome(income);
        await _context.SaveChangesAsync(cancellationToken);

        return _mapper.Map<IncomeDto>(income);

    }
}
