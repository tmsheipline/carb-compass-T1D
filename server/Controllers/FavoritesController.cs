using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarbCompass.Models;

namespace CarbCompass.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FavoritesController : ControllerBase
{
    private readonly AppDbContext _db;

    public FavoritesController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var favorites = await _db.FavoriteMeals
            .Include(f => f.Items)
            .ThenInclude(i => i.FoodItem)
            .OrderByDescending(f => f.CreatedAt)
            .ToListAsync();

        return Ok(favorites);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var favorite = await _db.FavoriteMeals
            .Include(f => f.Items)
            .ThenInclude(i => i.FoodItem)
            .FirstOrDefaultAsync(f => f.Id == id);

        if (favorite == null) return NotFound();
        return Ok(favorite);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateFavoriteMealDto dto)
    {
        var meal = new FavoriteMeal
        {
            Name = dto.Name,
            Items = dto.Items.Select(i => new FavoriteMealItem
            {
                FoodItemId = i.FoodItemId,
                Quantity = i.Quantity
            }).ToList()
        };

        _db.FavoriteMeals.Add(meal);
        await _db.SaveChangesAsync();

        await _db.Entry(meal).Collection(m => m.Items).Query()
            .Include(i => i.FoodItem)
            .LoadAsync();

        return CreatedAtAction(nameof(Get), new { id = meal.Id }, meal);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var meal = await _db.FavoriteMeals.FindAsync(id);
        if (meal == null) return NotFound();

        _db.FavoriteMeals.Remove(meal);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}

public record CreateFavoriteMealDto(string Name, List<CreateFavoriteMealItemDto> Items);
public record CreateFavoriteMealItemDto(int FoodItemId, float Quantity);
