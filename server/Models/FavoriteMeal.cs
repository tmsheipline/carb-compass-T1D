namespace CarbCompass.Models;

public class FavoriteMeal
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string UserId { get; set; } = string.Empty;
    public List<FavoriteMealItem> Items { get; set; } = new();
}
