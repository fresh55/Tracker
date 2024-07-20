using Backend.src.Application.Common.Interfaces;
using System.Text;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;


namespace Backend.src.Infrastructure.Services;

public class OcrService : IOcrService
{
    private readonly IComputerVisionClient _computerVisionClient;

    public OcrService(IComputerVisionClient computerVisionClient)
    {
        _computerVisionClient = computerVisionClient;
    }

    public async Task<string> ExtractTextFromImage(IFormFile file)
    {
        using var stream = file.OpenReadStream();
        var ocrResult = await _computerVisionClient.RecognizePrintedTextInStreamAsync(true, stream);

        var stringBuilder = new StringBuilder();
        foreach (var region in ocrResult.Regions)
        {
            foreach (var line in region.Lines)
            {
                foreach (var word in line.Words)
                {
                    stringBuilder.Append(word.Text + " ");
                }
                stringBuilder.AppendLine();
            }
        }
        return stringBuilder.ToString();
    }
}