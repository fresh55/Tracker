namespace Backend.src.Application.Invoices
{
    public class ExpenseDto
    {
        public int Id { get; set; }
        
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
    }
}
