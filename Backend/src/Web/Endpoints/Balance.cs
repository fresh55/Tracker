using Backend.src.Application.Balances2;
using Backend.src.Application.Balance2.Commands.CreateBalance;


namespace Backend.src.Web.Endpoints;

public class Balance : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapPost(CreateBalance);
            
    }

    public Task<int> CreateBalance(ISender sender, CreateBalanceCommand command)
    {
        return sender.Send(command);
    }

  
}
