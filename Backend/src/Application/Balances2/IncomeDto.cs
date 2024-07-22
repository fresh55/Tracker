using AutoMapper;
using Backend.src.Domain.Entities;

namespace Backend.src.Application.Balances2;

public class IncomeDto
{
    public int Id { get; set; }
    public decimal Amount { get; set; }
    public required string Title { get; set; }
    public required string Category { get; set; }
    public DateTime Date { get; set; }

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Income, IncomeDto>();
        }
    }
}