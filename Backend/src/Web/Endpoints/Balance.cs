using Backend.src.Application.Balances2;
using Backend.src.Application.Balances2.Commands.CreateBalance;
using  Backend.src.Application.Balances2.Commands.AddIncome;
using Backend.src.Application.Balances2.Queries.GetBalance;
using Backend.src.Application.Balances2.Queries.GetAllIncomes;
using Backend.src.Application.Balances2.Commands.AddExpense;
using Backend.src.Application.Balances2.Queries.GetTransactions;
namespace Backend.src.Web.Endpoints;

public class Balance : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapPost(CreateBalance)
            .MapPost(AddIncome, "/addIncome")
            .MapPost(AddExpense, "/addExpense")
            .MapGet(GetBalance, "{UserId}")
            .MapGet(GetTotalIncome, "/getIncome/{id}")
            .MapGet(GetTransactions, "/getTransactions/{UserId}");  
            
    }

    public Task<BalanceDto> CreateBalance(ISender sender, CreateBalanceCommand command)
    {

        return sender.Send(command);
    }

    public Task<IncomeDto> AddIncome(ISender sender, AddIncomeCommand command)
    {
        return sender.Send(command);
    }

    public Task<ExpenseDto> AddExpense(ISender sender, AddExpenseCommand command)
    {
        return sender.Send(command);
    }
    public async Task<BalanceDto> GetBalance(ISender sender, string UserId)
    {
        return await sender.Send(new GetBalance(UserId));
    }

    public  async Task<List<IncomeDto>> GetTotalIncome(ISender sender, int id)
    {
        return await sender.Send(new GetTotalIncome(id));
    }

    public async Task<List<TransactionDto>> GetTransactions(ISender sender, string UserId)
    {
        return await sender.Send(new GetTransactions(UserId));
    }


}
