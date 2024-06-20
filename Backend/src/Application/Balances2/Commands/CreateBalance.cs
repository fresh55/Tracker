using MediatR;
using Backend.src.Application.Common.Interfaces;
using Backend.src.Domain.Entities;
using Backend.src.Application.Balances2;

namespace Backend.src.Application.Balances2.Commands.CreateBalance;

public record CreateBalanceCommand : IRequest<BalanceDto>;
public class CreateBalanceCommandHandler : IRequestHandler<CreateBalanceCommand, BalanceDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public CreateBalanceCommandHandler(IApplicationDbContext context,IMapper mapper)
    {
        _context = context;
        _mapper = mapper;

    }

    public async Task<BalanceDto> Handle(CreateBalanceCommand request, CancellationToken cancellationToken)
    {
        var entity = new Balance();

        _context.Balances.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return _mapper.Map<BalanceDto>(entity);
    }

    
}
