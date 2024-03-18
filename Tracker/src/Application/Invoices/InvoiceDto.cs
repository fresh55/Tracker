using Tracker.src.Application.Common.Interfaces;

namespace Tracker.src.Application.Invoices;

public class InvoiceDto

{
    
    public int Id { get; set; }
    public decimal TotalAmount { get; set; }
    public string? InvoiceName { get; set; }

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Invoice, InvoiceDto>();
        }
    }

}

