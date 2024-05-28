using System;
using System.Collections.Generic;



namespace Backend.src.Domain.Entities
{
    public class Invoice : BaseEntity
    {
       
        public decimal TotalAmount { get; set; }
        public string? InvoiceName { get; set; }

        public DateTime Date { get; set; } 



    }



}



