using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarbCompass.Models;

namespace CarbCompass.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FoodsController : ControllerBase
{
    private readonly AppDbContext _db;

    public FoodsController(AppDbContext db) => _db = db;

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string? q, [FromQuery] string? restaurant)
    {
        var query = _db.FoodItems.AsQueryable();

        if (!string.IsNullOrWhiteSpace(restaurant))
            query = query.Where(f => f.BrandOwner == restaurant);

        if (!string.IsNullOrWhiteSpace(q))
            query = query.Where(f => f.Description.Contains(q));

        var results = await query
            .OrderBy(f => f.Description)
            .Take(100)
            .ToListAsync();

        return Ok(results);
    }

    [HttpGet("restaurants")]
    public async Task<IActionResult> GetRestaurants()
    {
        var restaurants = await _db.FoodItems
            .Select(f => f.BrandOwner)
            .Distinct()
            .OrderBy(r => r)
            .ToListAsync();

        return Ok(restaurants);
    }
}
