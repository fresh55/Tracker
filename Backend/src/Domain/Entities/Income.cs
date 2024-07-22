using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
namespace Backend.src.Domain.Entities
{
    public class Income : BaseEntity
    {
        public decimal Amount { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public int BalanceId { get; set; }
        public Balance? Balance { get; set; }

        public Income(decimal amount, string title, string category, DateTime date)
        {
            if (amount <= 0)
                throw new ArgumentException("Amount must be greater than zero.");

            Amount = amount;
            Title = title;
            Category = category;
            Date = date;
        }
    }
}