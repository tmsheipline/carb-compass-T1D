namespace CarbCompass.Models;

public class FoodItem
{
    public int Id { get; set; }
    public int FdcId { get; set; }
    public string Description { get; set; } = string.Empty;
    public string BrandOwner { get; set; } = string.Empty;
    public float ServingSize { get; set; }
    public string ServingSizeUnit { get; set; } = string.Empty;
    public float Carbohydrates { get; set; }
    public float Calories { get; set; }
}
