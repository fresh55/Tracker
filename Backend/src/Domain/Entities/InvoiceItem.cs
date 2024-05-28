namespace Backend.src.Domain.Entities
{
    public class InvoiceItem : BaseEntity
    {
        public string ItemName { get; set; }
        public int Quantity { get; set; }
        public decimal PricePerUnit { get; set; }
        public decimal TotalPrice => Quantity * PricePerUnit;
    
    }
}
