using MediatR;
using Backend.src.Application.Common.Interfaces;
using Backend.src.Domain.Entities;
namespace Backend.src.Application.Invoices.Commands.CreateInvoice;

public record CreateInvoiceCommand : IRequest<int>
{   

    public string? Title { get; init; }

    public decimal TotalAmount { get; init; }
    public DateTime DateAdded { get; set; }
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
        var entity = new Invoice();
        
            entity.TotalAmount = request.TotalAmount;
            entity.InvoiceName = request.Title;
            entity.Date = request.DateAdded;
        entity.AddDomainEvent(new InvoiceCreatedEvent(entity));

        _context.Invoices.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
