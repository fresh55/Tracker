using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Tracker.src.Application.Common.Interfaces;
using Tracker.src.Infrastructure.Identity;
using Tracker.src.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
namespace Tracker.src.Infrastructure.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>, IApplicationDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<Invoice> Invoices => Set<Invoice>();

        public DbSet<InvoiceItem> InvoiceItems => Set<InvoiceItem>();

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

    }
}
