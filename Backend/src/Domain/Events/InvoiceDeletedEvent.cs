namespace Backend.src.Domain.Events
{
    public class InvoiceDeletedEvent : BaseEvent
    {
        public InvoiceDeletedEvent(Invoice item)
        {
            Item = item;
        }

        public Invoice Item { get; }
    }
}