using AutoMapper;
using Backend.src.Domain.Entities;
namespace Backend.src.Application.Invoices
{
    public class BalanceDto
    {
        public int Id { get; set; }
        public decimal TotalBalance { get; set; }
        public decimal TotalExpenses { get; set; }
        public decimal TotalIncomes { get; set; }

        // Add any additional properties or methods here
        private class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<Balance, BalanceDto>();
            }
        }
    }
}
