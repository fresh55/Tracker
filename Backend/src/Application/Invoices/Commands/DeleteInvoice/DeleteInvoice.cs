using Backend.src.Application.Common.Interfaces;

namespace Backend.src.Application.Invoices.Commands.DeleteInvoice;

    public record DeleteInvoiceCommand(int id) : IRequest;
    
    public class DeleteInvoiceCommandHandler : IRequestHandler<DeleteInvoiceCommand>
{
        private readonly IApplicationDbContext _context;

        public DeleteInvoiceCommandHandler(IApplicationDbContext context)
    {
            _context = context;
        }

        public async Task Handle(DeleteInvoiceCommand request, CancellationToken cancellationToken)
    {
            var entity = await _context.Invoices.FindAsync(request.id);

           Guard.Against.NotFound(request.id, entity);
            
          _context.Invoices.Remove(entity);

            await _context.SaveChangesAsync(cancellationToken);

    
        }
    }
