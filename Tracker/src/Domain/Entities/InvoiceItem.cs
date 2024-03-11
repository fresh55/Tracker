namespace Tracker.src.Domain.Entities
{
    public class InvoiceItem
    {
        public int InvoiceItemId { get; set; }
        public int InvoiceId { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice => Quantity * UnitPrice;
        // Navigation property back to the Invoice
        public Invoice Invoice { get; set; }
    }
}
