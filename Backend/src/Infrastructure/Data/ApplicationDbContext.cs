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

        builder.Entity<Balance>(b =>
        {
            b.HasOne(balance => balance.ApplicationUser)
             .WithOne(user => user.Balance)
             .HasForeignKey<Balance>(balance => balance.ApplicationUserId)
             .IsRequired();

            b.HasMany(balance => balance.Incomes)
             .WithOne(income => income.Balance)
             .HasForeignKey(income => income.BalanceId);

            b.HasMany(balance => balance.Expenses)
             .WithOne(expense => expense.Balance)
             .HasForeignKey(expense => expense.BalanceId);
        });

        var decimalProps = builder.Model
            .GetEntityTypes()
            .SelectMany(t => t.GetProperties())
            .Where(p => (System.Nullable.GetUnderlyingType(p.ClrType) ?? p.ClrType) == typeof(decimal));

        foreach (var property in decimalProps)
        {
            property.SetPrecision(18);
            property.SetScale(2);
        }
    }
}
