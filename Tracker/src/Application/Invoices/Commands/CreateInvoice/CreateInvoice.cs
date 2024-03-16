using MediatR;
using Tracker.src.Application.Common.Interfaces;
using Tracker.src.Domain.Entities;
namespace Tracker.src.Application.Invoices.Commands.CreateInvoice;

public record CreateInvoiceCommand : IRequest<int>
{
    public int ListId { get; init; }

    public string? Title { get; init; }
}

public class CreateInvoiceCommandHandler : IRequestHandler<CreateInvoiceCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateInvoiceCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateInvoiceCommand request, CancellationToken cancellationToken)
    {
        var entity = new Invoice
        {
            
        };

        entity.AddDomainEvent(new InvoiceCreatedEvent(entity));

        _context.Invoices.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
