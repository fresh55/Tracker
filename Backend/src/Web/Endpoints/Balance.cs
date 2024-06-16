using Backend.src.Application.Balances2;
using Backend.src.Application.Balance2.Commands.CreateBalance;
using  Backend.src.Application.Balance2.Commands.AddIncome;

namespace Backend.src.Web.Endpoints;

public class Balance : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapPost(CreateBalance)
            .MapPost(AddIncome, "/addIncome");
            
    }

    public Task<int> CreateBalance(ISender sender, CreateBalanceCommand command)
    {
        return sender.Send(command);
    }

    public Task<Income> AddIncome(ISender sender, AddIncomeCommand command)
    {
        return sender.Send(command);
    }
  
}
