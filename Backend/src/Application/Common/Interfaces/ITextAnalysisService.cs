using Backend.src.Application.Invoices.Commands.AnalyzeInvoice;

namespace Backend.src.Application.Common.Interfaces;

public interface ITextAnalysisService
{
    Task<AnalyzeInvoiceResult> AnalyzeInvoice(IFormFile file);
}