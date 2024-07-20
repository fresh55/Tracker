using Microsoft.AspNetCore.Http;

namespace Backend.src.Application.Common.Interfaces;

public interface IOcrService
{
    Task<string> ExtractTextFromImage(IFormFile file);
}