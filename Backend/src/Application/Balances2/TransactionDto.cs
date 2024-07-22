using AutoMapper;

namespace Backend.src.Application.Balances2
{
    public class TransactionDto
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public required string Title { get; set; }
        public required string Category { get; set; }
        public DateTime DateAdded { get; set; }
        public required string Type { get; set; } // "Expense" or "Income"
        public string DateAddedISO => DateAdded.ToString("o");

        private class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<Expense, TransactionDto>()
                    .ForMember(dest => dest.Type, opt => opt.MapFrom(src => "Expense"))
                    .ForMember(dest => dest.DateAdded, opt => opt.MapFrom(src => src.Date));

                CreateMap<Income, TransactionDto>()
                    .ForMember(dest => dest.Type, opt => opt.MapFrom(src => "Income"))
                    .ForMember(dest => dest.DateAdded, opt => opt.MapFrom(src => src.Date));
            }
        }
    }
}