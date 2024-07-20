using FluentValidation;

namespace Backend.src.Application.Balances2.Commands.DeleteTransaction
{
	public class DeleteTransactionCommandValidator : AbstractValidator<DeleteTransactionCommand>
	{
		public DeleteTransactionCommandValidator()
		{
			RuleFor(v => v.Id).GreaterThan(0);
			RuleFor(v => v.UserId).NotEmpty();
			RuleFor(v => v.TransactionType).NotEmpty().Must(type => type == "Income" || type == "Expense")
				.WithMessage("TransactionType must be either 'Income' or 'Expense'");
		}
	}
}