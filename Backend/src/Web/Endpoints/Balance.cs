using Backend.src.Application.Balances2;
using Backend.src.Application.Balances2.Commands.CreateBalance;
using  Backend.src.Application.Balances2.Commands.AddIncome;
using Backend.src.Application.Balances2.Queries.GetBalance;
using  Backend.src.Application.Balances2.Queries.GetTotalIncome;
using Backend.src.Application.Balances2.Commands.AddExpense;
namespace Backend.src.Web.Endpoints;

public class Balance : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapPost(CreateBalance)
            .MapPost(AddIncome, "/addIncome")
            .MapPost(AddExpense, "/addExpense")
            .MapGet(GetBalance, "{id}")
            .MapGet(GetTotalIncome, "/getIncome/{id}");
            
    }

    public Task<BalanceDto> CreateBalance(ISender sender, CreateBalanceCommand command)
    {

        return sender.Send(command);
    }

    public Task<Income> AddIncome(ISender sender, AddIncomeCommand command)
    {
        return sender.Send(command);
    }

    public Task<Expense> AddExpense(ISender sender, AddExpenseCommand command)
    {
        return sender.Send(command);
    }
    public async Task<BalanceDto> GetBalance(ISender sender, int id)
    {
        return await sender.Send(new GetBalance(id));
    }

    public  async Task<List<IncomeDto>> GetTotalIncome(ISender sender, int id)
    {
        return await sender.Send(new GetTotalIncome(id));
    }


}
