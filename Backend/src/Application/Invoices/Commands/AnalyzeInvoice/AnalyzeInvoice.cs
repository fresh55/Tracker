using Backend.src.Application.Common.Interfaces;
namespace Backend.src.Application.Invoices.Commands.AnalyzeInvoice;

public class AnalyzeInvoiceCommand : IRequest<AnalyzeInvoiceResult>
{
    public required IFormFile File { get; set; }
}

public class AnalyzeInvoiceResult
{
    public decimal TotalAmount { get; set; }
    public string Category { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Title { get; set; } = string.Empty;
}

public class AnalyzeInvoiceCommandHandler : IRequestHandler<AnalyzeInvoiceCommand, AnalyzeInvoiceResult>
{
    private readonly ITextAnalysisService _textAnalysisService;

    public AnalyzeInvoiceCommandHandler(ITextAnalysisService textAnalysisService)
    {
        _textAnalysisService = textAnalysisService;
    }

    public async Task<AnalyzeInvoiceResult> Handle(AnalyzeInvoiceCommand request, CancellationToken cancellationToken)
    {
        return await _textAnalysisService.AnalyzeInvoice(request.File);
    }
}
