namespace CarbCompass.Models;

public class FavoriteMealItem
{
    public int Id { get; set; }
    public int FavoriteMealId { get; set; }
    public FavoriteMeal FavoriteMeal { get; set; } = null!;
    public int FoodItemId { get; set; }
    public FoodItem FoodItem { get; set; } = null!;
    public float Quantity { get; set; } = 1;
}
