using Backend.src.Domain.Entities;
using FluentAssertions;
using Xunit;

namespace Backend.UnitTests.Domain
{
    public class BalanceTests
    {
        [Fact]
        public void AddExpense_ShouldDecreaseBalance()
        {
            // Arrange
            var balance = new Balance { ApplicationUserId = "testUser", TotalAmount = 100m };
            var expense = new Expense(20m, "Test Expense", "Test Category", DateTime.Now);

            // Act
            balance.AddExpense(expense);

            // Assert
            balance.TotalAmount.Should().Be(80m);
            balance.Expenses.Should().Contain(expense);
        }

        [Fact]
        public void AddIncome_ShouldIncreaseBalance()
        {
            // Arrange
            var balance = new Balance { ApplicationUserId = "testUser", TotalAmount = 100m };
            var income = new Income(50m, "Test Income", "Test Category", DateTime.Now);

            // Act
            balance.AddIncome(income);

            // Assert
            balance.TotalAmount.Should().Be(150m);
            balance.Incomes.Should().Contain(income);
        }
    }
}