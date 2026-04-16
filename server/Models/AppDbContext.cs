using Microsoft.EntityFrameworkCore;

namespace CarbCompass.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<FoodItem> FoodItems { get; set; }
    public DbSet<FavoriteMeal> FavoriteMeals { get; set; }
    public DbSet<FavoriteMealItem> FavoriteMealItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<FoodItem>()
            .HasIndex(f => f.FdcId)
            .IsUnique();

        modelBuilder.Entity<FoodItem>()
            .HasIndex(f => new { f.BrandOwner, f.Description });
    }
}
