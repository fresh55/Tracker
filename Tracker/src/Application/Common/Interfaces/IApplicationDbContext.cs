using Microsoft.EntityFrameworkCore;
using Tracker.src.Domain.Entities;

namespace Tracker.src.Application.Common.Interfaces
{

    public interface IApplicationDbContext
    {
        DbSet<Invoice> Invoices { get; }

        DbSet<InvoiceItem> InvoiceItems { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
