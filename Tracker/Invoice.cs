using System;
using System.Collections.Generic;

namespace Tracker
{
    public class Invoice
    {
        public int InvoiceID { get; set; }
        public string InvoiceNumber { get; set; }
        public DateTime Date { get; set; }
        public decimal TotalAmount { get; set; }

        public string shortDescription { get; set; }

        public List<InvoiceItem> Items { get; set; } = new List<InvoiceItem>();

    }



}



