using Microsoft.EntityFrameworkCore;
using Backend.src.Application.Common.Interfaces;

namespace Backend.src.Application.Invoices.Queries.GetTotalAmount;




public class GetTotalInvoiceAmount : IRequest<decimal>;

public class GetTotalInvoiceAmountHandler : IRequestHandler<GetTotalInvoiceAmount, decimal>
{
    private readonly IApplicationDbContext _context;


    public GetTotalInvoiceAmountHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<decimal> Handle(GetTotalInvoiceAmount request, CancellationToken cancellationToken)
    {
        // Perform the sum operation on the TotalAmount of all invoices
        return await _context.Invoices
            .AsNoTracking()
            .SumAsync(invoice => invoice.TotalAmount, cancellationToken);
    }
}




