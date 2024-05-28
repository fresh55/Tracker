using Backend.src.Application.Invoices;
using Backend.src.Application.Invoices.Commands.CreateInvoice;
using Backend.src.Application.Invoices.Commands.DeleteInvoice;
using Backend.src.Application.Invoices.Queries.GetInvoices;
using Backend.src.Application.Invoices.Queries.GetTotalAmount;   

namespace Backend.src.Web.Endpoints;

public class Invoices : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetAllInvoices)
            .MapGet(GetTotalInvoiceAmount, "/total-amount")
            .MapPost(CreateInvoice)
            .MapDelete(DeleteInvoices, "{id}");
    }

    public Task<List<InvoiceDto>> GetAllInvoices( ISender sender)
    {
        return sender.Send(new GetAllInvoices());
    }

    public Task<decimal> GetTotalInvoiceAmount(ISender sender)
    {
        return sender.Send(new GetTotalInvoiceAmount());
    }
    public Task<int> CreateInvoice( ISender sender, CreateInvoiceCommand command)
    {
        return sender.Send(command);
    }

  

    public async Task<IResult> DeleteInvoices( ISender sender, int id)
    {
        await sender.Send(new DeleteInvoiceCommand(id));
        return Results.NoContent();
    }
}
