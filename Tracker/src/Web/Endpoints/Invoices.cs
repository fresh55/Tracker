using Tracker.src.Application.Invoices;
using Tracker.src.Application.Invoices.Commands.CreateInvoice;
using Tracker.src.Application.Invoices.Commands.DeleteInvoice;
using Tracker.src.Application.Invoices.Queries.GetInvoices;

namespace Tracker.src.Web.Endpoints;

public class Invoices : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetAllInvoices)
            .MapPost(CreateInvoice)
            .MapDelete(DeleteInvoices, "{id}");
    }

    public Task<List<InvoiceDto>> GetAllInvoices(ISender sender)
    {
        return sender.Send(new GetAllInvoices());
    }

    public Task<int> CreateInvoice(ISender sender, CreateInvoiceCommand command)
    {
        return sender.Send(command);
    }

  

    public async Task<IResult> DeleteInvoices(ISender sender, int id)
    {
        await sender.Send(new DeleteInvoiceCommand(id));
        return Results.NoContent();
    }
}
