using Backend.src.Application.Common.Interfaces;
namespace Backend.src.Application.Balances2;

    public class BalanceDto
    {
    public int Id { get; set; }
    public decimal TotalAmount { get; set; }
    public decimal TotalExpensesAmount { get; set; }
    public decimal TotalIncomesAmount { get; set; }

    // Add any additional properties or methods here
    private class Mapping : Profile
        {
            public Mapping()
            {
            CreateMap<Balance, BalanceDto>()
           .ForMember(dest => dest.TotalExpensesAmount, opt => opt.MapFrom(src => src.Expenses.Sum(e => e.Amount)))
           .ForMember(dest => dest.TotalIncomesAmount, opt => opt.MapFrom(src => src.Incomes.Sum(i => i.Amount)));

        }
        }
    }

