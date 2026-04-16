"""
Seed carb-compass.db from local fast_food_data.json.
No API key needed.

Usage:
    python seed.py
    python seed.py --db path/to/carb-compass.db
"""

import argparse
import json
import sqlite3
import os

INCLUDE_RESTAURANTS = [
    "McDONALD'S",
    "BURGER KING",
    "WENDY'S",
    "TACO BELL",
    "CHICK-FIL-A",
    "CULVER'S",
    "CHIPOTLE",
    "ARBY'S",
    "SUBWAY",
    "PANDA EXPRESS",
    "STARBUCKS",
]

def seed(db_path, data_path):
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()

    cur.executescript("""
        DROP TABLE IF EXISTS FoodItems;

        CREATE TABLE FoodItems (
            Id              INTEGER PRIMARY KEY AUTOINCREMENT,
            FdcId           INTEGER UNIQUE NOT NULL,
            Description     TEXT NOT NULL,
            BrandOwner      TEXT NOT NULL,
            ServingSize     REAL DEFAULT 0,
            ServingSizeUnit TEXT DEFAULT '',
            Carbohydrates   REAL DEFAULT 0,
            Calories        REAL DEFAULT 0
        );

        CREATE TABLE FavoriteMeals (
            Id        INTEGER PRIMARY KEY AUTOINCREMENT,
            Name      TEXT NOT NULL,
            CreatedAt TEXT NOT NULL DEFAULT (datetime('now'))
        );

        CREATE TABLE FavoriteMealItems (
            Id             INTEGER PRIMARY KEY AUTOINCREMENT,
            FavoriteMealId INTEGER NOT NULL REFERENCES FavoriteMeals(Id) ON DELETE CASCADE,
            FoodItemId     INTEGER NOT NULL REFERENCES FoodItems(Id),
            Quantity       REAL NOT NULL DEFAULT 1
        );

        CREATE INDEX idx_food_brand ON FoodItems(BrandOwner, Description);
    """)
    conn.commit()

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
        INSERT INTO FoodItems (FdcId, Description, BrandOwner, ServingSize, ServingSizeUnit, Carbohydrates, Calories)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, rows)
    conn.commit()
    conn.close()

    by_restaurant = {}
    for r in rows:
        by_restaurant.setdefault(r[2], 0)
        by_restaurant[r[2]] += 1

    for restaurant, count in sorted(by_restaurant.items()):
        print(f"  {restaurant}: {count} items")
    print(f"\nDone — {len(rows)} items seeded into {db_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--db", default="carb-compass.db")
    args = parser.parse_args()

    data_path = os.path.join(os.path.dirname(__file__), "fast_food_data.json")
    print("Seeding from local data...")
    seed(args.db, data_path)
