using Backend.src.Application.Common.Interfaces;
namespace Backend.src.Application.Invoices.Commands.AnalyzeInvoice;

public class AnalyzeInvoiceCommand : IRequest<AnalyzeInvoiceResult>
{
    public IFormFile File { get; set; }
}

public class AnalyzeInvoiceResult
{
    public decimal TotalAmount { get; set; }
    public string Category { get; set; }
}

public class AnalyzeInvoiceCommandHandler : IRequestHandler<AnalyzeInvoiceCommand, AnalyzeInvoiceResult>
{
    private readonly IOcrService _ocrService;

    public AnalyzeInvoiceCommandHandler(IOcrService ocrService)
    {
        _ocrService = ocrService;
    }

    public async Task<AnalyzeInvoiceResult> Handle(AnalyzeInvoiceCommand request, CancellationToken cancellationToken)
    {
        var extractedText = await _ocrService.ExtractTextFromImage(request.File);

        Console.WriteLine(extractedText);
        return new AnalyzeInvoiceResult
        {
            TotalAmount = 2,
            Category = "NEKE"
        };
    }
}