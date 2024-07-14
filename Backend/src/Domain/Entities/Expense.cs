namespace Backend.src.Domain.Entities
{
    public class Expense : BaseEntity
    {
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public int BalanceId { get; set; }
        public Balance Balance { get; set; }
        public Expense(decimal amount, string description, DateTime date)
        {
            if (amount <= 0)
                throw new ArgumentException("Amount must be greater than zero.");

            Amount = amount;
            Description = description;
            Date = date;
        }
    }
}
