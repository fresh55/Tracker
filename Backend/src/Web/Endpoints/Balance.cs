using Backend.src.Application.Balances2;
using Backend.src.Application.Balances2.Commands.CreateBalance;
using  Backend.src.Application.Balances2.Commands.AddIncome;
using Backend.src.Application.Balances2.Queries.GetTotalBalance;
using Backend.src.Application.Invoices.Commands.DeleteInvoice;
namespace Backend.src.Web.Endpoints;

public class Balance : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapPost(CreateBalance)
            .MapPost(AddIncome, "/addIncome")
            .MapGet(GetTotalBalance, "{id}");
    }

    public Task<int> CreateBalance(ISender sender, CreateBalanceCommand command)
    {

        return sender.Send(command);
    }

    public Task<Income> AddIncome(ISender sender, AddIncomeCommand command)
    {
        return sender.Send(command);
    }

    public async Task<decimal> GetTotalBalance(ISender sender, int id)
    {
        return await sender.Send(new GetTotalBalance(id));
    }


}
