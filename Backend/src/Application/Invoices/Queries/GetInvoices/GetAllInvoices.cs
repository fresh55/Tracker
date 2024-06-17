
using Backend.src.Application.Common.Interfaces;

namespace Backend.src.Application.Invoices.Queries.GetInvoices;

public class GetAllInvoices : IRequest<List<InvoiceDto>>;

    public class GetAllInvoicesHandler : IRequestHandler<GetAllInvoices, List<InvoiceDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

    public GetAllInvoicesHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<InvoiceDto>> Handle(GetAllInvoices request, CancellationToken cancellationToken)
    {
        return await _context.Invoices
            .AsNoTracking()
            .ProjectTo<InvoiceDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);
    }

}

