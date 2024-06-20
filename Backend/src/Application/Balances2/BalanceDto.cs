using Backend.src.Application.Common.Interfaces;
namespace Backend.src.Application.Balances2;

    public class BalanceDto
    {
    public int Id { get; set; }
    public decimal TotalAmount { get; set; }
    public List<ExpenseDto> Expenses { get; set; }
    public List<IncomeDto> Incomes { get; set; }

    // Add any additional properties or methods here
    private class Mapping : Profile
        {
            public Mapping()
            {
            CreateMap<Balance, BalanceDto>();
            CreateMap<Expense, ExpenseDto>();
            CreateMap<Income, IncomeDto>();
         
        }
        }
    }

