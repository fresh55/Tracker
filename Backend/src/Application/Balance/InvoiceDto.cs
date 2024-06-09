using Backend.src.Application.Common.Interfaces;

namespace Backend.src.Application.Invoices;

public class InvoiceDto

{
    
    public int Id { get; init; }
    public decimal TotalAmount { get; set; }
    public string? InvoiceName { get; set; }
    public DateTime Date { get; set; }
     

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Invoice, InvoiceDto>();
        }
    }

}

