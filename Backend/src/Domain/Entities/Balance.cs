using Backend.src.Infrastructure.Identity;
namespace Backend.src.Domain.Entities
{
    public class Balance : BaseEntity   
    {
        public decimal TotalAmount { get; set; }
        public List<Expense> Expenses { get; set; }
        public List<Income> Incomes { get; set; }
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }

        public Balance()
        {
            TotalAmount = 0;
            Expenses = new List<Expense>();
            Incomes = new List<Income>();

        }

    public void AddExpense(Expense expense)
        {
            if (expense == null)
                throw new ArgumentNullException(nameof(expense));
            Expenses.Add(expense);
            TotalAmount -= expense.Amount;
        }

    public void AddIncome(Income income)
        {
            if (income == null)
                throw new ArgumentNullException(nameof(income));
            Incomes.Add(income);
            TotalAmount += income.Amount;
        }

    public void RemoveExpense(Expense expense)
        {
            if (expense == null)
                throw new ArgumentNullException(nameof(expense));
            Expenses.Remove(expense);
            TotalAmount += expense.Amount;
        }

    public void RemoveIncome(Income income)
        {
            if (income == null)
                throw new ArgumentNullException(nameof(income));
            Incomes.Remove(income);
            TotalAmount -= income.Amount;
        }

    public void UpdateExpense(Expense expense, decimal newAmount)
        {
            if (expense == null)
                throw new ArgumentNullException(nameof(expense));
            TotalAmount += expense.Amount;
            expense.Amount = newAmount;
            TotalAmount -= newAmount;
        }

    public void UpdateIncome(Income income, decimal newAmount)
        {
            if (income == null)
                throw new ArgumentNullException(nameof(income));
            TotalAmount -= income.Amount;
            income.Amount = newAmount;
            TotalAmount += newAmount;
        }

      public decimal GetTotalExpenses()
        {
            decimal total = 0;
            foreach (var expense in Expenses)
            {
                total += expense.Amount;
            }
            return total;
        }

        public decimal GetTotalIncomes()
        {
            decimal total = 0;

            foreach (var income in Incomes)
            {
                total += income.Amount;
            }
            return total;
        }





    }

}
