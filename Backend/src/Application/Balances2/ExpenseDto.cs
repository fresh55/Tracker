namespace Backend.src.Application.Balances2;

public class ExpenseDto
{
    public int Id { get; set; }
    
    public decimal Amount { get; set; }
    public required string Description { get; set; }
    public DateTime Date { get; set; }

    // Add any additional properties or methods here
    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Balance, BalanceDto>();
        }
    }
}
