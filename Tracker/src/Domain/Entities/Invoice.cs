using System;
using System.Collections.Generic;



namespace Tracker.src.Domain.Entities
{
    public class Invoice : BaseEntity
    {
       
        public decimal TotalAmount { get; set; }
        public string? InvoiceName { get; set; }

        

    }



}



