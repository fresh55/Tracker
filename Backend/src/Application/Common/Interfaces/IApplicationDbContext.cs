using Microsoft.EntityFrameworkCore;
using Backend.src.Domain.Entities;

namespace Backend.src.Application.Common.Interfaces
{

    public interface IApplicationDbContext
    {
        DbSet<Invoice> Invoices { get; }

        DbSet<InvoiceItem> InvoiceItems { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
