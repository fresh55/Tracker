using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Backend.src.Application.Common.Interfaces;
using Backend.src.Infrastructure.Identity;
using Backend.src.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
namespace Backend.src.Infrastructure.Data;

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>, IApplicationDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<Invoice> Invoices => Set<Invoice>();
          public DbSet<Balance> Balances => Set<Balance>();
        public DbSet<Expense> Expenses => Set<Expense>();
       public DbSet<Income> Incomes => Set<Income>();
       public DbSet<InvoiceItem> InvoiceItems => Set<InvoiceItem>();

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

    }

