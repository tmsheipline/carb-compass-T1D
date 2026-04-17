"""
Seed PostgreSQL database from fast_food_data.json.

Usage:
    DATABASE_URL=postgresql://user:pass@host/db python seed_postgres.py
    python seed_postgres.py --url postgresql://user:pass@host/db
"""

import argparse
import json
import os
import psycopg2

INCLUDE_RESTAURANTS = [
    "McDONALD'S", "BURGER KING", "WENDY'S", "TACO BELL",
    "CHICK-FIL-A", "CULVER'S", "CHIPOTLE", "ARBY'S",
    "SUBWAY", "PANDA EXPRESS", "STARBUCKS",
]

def seed(url, data_path):
    conn = psycopg2.connect(url)
    cur = conn.cursor()

    cur.execute('TRUNCATE TABLE "FavoriteMealItems", "FavoriteMeals", "FoodItems" RESTART IDENTITY CASCADE')

    with open(data_path, "r") as f:
        data = json.load(f)

    rows = []
    for i, item in enumerate(data):
        if item["restaurant"] not in INCLUDE_RESTAURANTS:
            continue
        rows.append((
            i + 1,
            item["item"],
            item["restaurant"],
            item.get("serving_size", 0),
            item.get("serving_unit", "g"),
            item["carbs"],
            item["calories"],
        ))

    cur.executemany("""
        INSERT INTO "FoodItems" ("FdcId", "Description", "BrandOwner", "ServingSize", "ServingSizeUnit", "Carbohydrates", "Calories")
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, rows)

    conn.commit()
    conn.close()

    by_restaurant = {}
    for r in rows:
        by_restaurant.setdefault(r[2], 0)
        by_restaurant[r[2]] += 1

    for restaurant, count in sorted(by_restaurant.items()):
        print(f"  {restaurant}: {count} items")
    print(f"\nDone — {len(rows)} items seeded")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", default=os.environ.get("DATABASE_URL"))
    args = parser.parse_args()

    if not args.url:
        print("Error: provide --url or set DATABASE_URL env var")
        exit(1)

    data_path = os.path.join(os.path.dirname(__file__), "fast_food_data.json")
    print("Seeding PostgreSQL...")
    seed(args.url, data_path)
