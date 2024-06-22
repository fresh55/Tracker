using AutoMapper;

namespace Backend.src.Application.Balances2
{
    public class TransactionDto
    {
        public decimal Amount { get; set; }
        public DateTime DateAdded { get; set; }
        public string Type { get; set; } // "Expense" or "Income"

        private class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<Expense, TransactionDto>()
           .ForMember(dest => dest.Type, opt => opt.MapFrom(src => "Expense"));

                CreateMap<Income, TransactionDto>()
                    .ForMember(dest => dest.Type, opt => opt.MapFrom(src => "Income"));

            }
        }



    }
}
