using Backend.src.Application.Common.Interfaces;
using Backend.src.Application.Invoices.Commands.AnalyzeInvoice;
using System.Text.Json;
using System.Globalization;
using OpenAI_API;
using OpenAI_API.Chat;

namespace Backend.src.Infrastructure.Services;

public class OpenAIInvoiceAnalysisService : ITextAnalysisService
{
    private readonly OpenAIAPI _openAI;
    private readonly IOcrService _ocrService;

    public OpenAIInvoiceAnalysisService(IConfiguration configuration, IOcrService ocrService)
    {
        _openAI = new OpenAIAPI(configuration["OpenAI:ApiKey"]);
        _ocrService = ocrService;
    }
    public async Task<AnalyzeInvoiceResult> AnalyzeInvoice(IFormFile file)
    {
        var extractedText = await _ocrService.ExtractTextFromImage(file);

        var chatRequest = new ChatRequest()
        {
            Model = OpenAI_API.Models.Model.GPT4,
            Temperature = 0.2,
            MaxTokens = 150,
            Messages = new[]
            {
            new ChatMessage(ChatMessageRole.System, "You are an AI assistant that analyzes invoice text and extracts the total amount, category, date, and generates a title. Respond in JSON format with 'totalAmount', 'category', 'date', and 'title' fields."),
            new ChatMessage(ChatMessageRole.User, extractedText)
        }
        };

        var chatResult = await _openAI.Chat.CreateChatCompletionAsync(chatRequest);

        if (chatResult.Choices.Count == 0)
        {
            throw new Exception("Failed to get a response from OpenAI");
        }

        var responseText = chatResult.Choices[0].Message.TextContent;
        return ParseResponse(responseText);
    }

    private AnalyzeInvoiceResult ParseResponse(string response)
    {
        try
        {
            var jsonResponse = JsonSerializer.Deserialize<JsonElement>(response);
            decimal totalAmount = 0;
            string category = "Unknown";
            DateTime date = DateTime.Now;
            string title = "Untitled Invoice";

            if (jsonResponse.TryGetProperty("totalAmount", out var totalAmountElement))
            {
                string amountString = totalAmountElement.ValueKind == JsonValueKind.String
                    ? totalAmountElement.GetString()
                    : totalAmountElement.ToString();

                if (!string.IsNullOrEmpty(amountString))
                {
                    amountString = System.Text.RegularExpressions.Regex.Replace(amountString, @"[^\d.,]", "");
                    amountString = amountString.Replace(',', '.');

                    decimal.TryParse(amountString, NumberStyles.Any, CultureInfo.InvariantCulture, out totalAmount);
                }
            }

            if (jsonResponse.TryGetProperty("category", out var categoryElement))
            {
                category = categoryElement.GetString() ?? "Unknown";
            }

            if (jsonResponse.TryGetProperty("date", out var dateElement))
            {
                DateTime.TryParse(dateElement.GetString(), out date);
            }

            if (jsonResponse.TryGetProperty("title", out var titleElement))
            {
                title = titleElement.GetString() ?? "Untitled Invoice";
            }

            return new AnalyzeInvoiceResult { TotalAmount = totalAmount, Category = category, Date = date, Title = title };
        }
        catch (JsonException ex)
        {
            Console.WriteLine($"JSON parsing failed: {ex.Message}");
            return new AnalyzeInvoiceResult { TotalAmount = 0, Category = "Unknown", Date = DateTime.Now, Title = "Untitled Invoice" };
        }
    }

    private AnalyzeInvoiceResult ParseResponseWithRegex(string response)
    {
        decimal totalAmount = 0;
        string category = "Unknown";

        var amountMatch = System.Text.RegularExpressions.Regex.Match(response, @"total amount.*?(\d+([.,]\d{1,2})?)");
        if (amountMatch.Success)
        {
            decimal.TryParse(amountMatch.Groups[1].Value.Replace(',', '.'), NumberStyles.Any, CultureInfo.InvariantCulture, out totalAmount);
        }

        var categoryMatch = System.Text.RegularExpressions.Regex.Match(response, @"category.*?(\w+)");
        if (categoryMatch.Success)
        {
            category = categoryMatch.Groups[1].Value;
        }

        return new AnalyzeInvoiceResult { TotalAmount = totalAmount, Category = category };
    }
}