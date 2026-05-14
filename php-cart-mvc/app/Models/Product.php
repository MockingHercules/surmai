<?php
class Product
{
    // Demo product catalog. In production this would come from a database.
    private static array $products = [
        1 => [
            'id' => 1,
            'name' => 'Surmai Steaks',
            'price' => 549,
            'image' => 'https://commons.wikimedia.org/wiki/Special:FilePath/Surmai%20Fish.JPG?width=800',
            'unit' => '500 g',
        ],
        2 => [
            'id' => 2,
            'name' => 'Cleaned Prawns',
            'price' => 329,
            'image' => 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=85',
            'unit' => '250 g',
        ],
        3 => [
            'id' => 3,
            'name' => 'Mud Crab',
            'price' => 499,
            'image' => 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=900&q=85',
            'unit' => '1 pc',
        ],
        4 => [
            'id' => 4,
            'name' => 'Fresh Clams',
            'price' => 219,
            'image' => 'https://images.unsplash.com/photo-1565031491910-e57fac031c41?auto=format&fit=crop&w=900&q=85',
            'unit' => '500 g',
        ],
    ];

    public static function all(): array
    {
        return array_values(self::$products);
    }

    public static function find(int $id): ?array
    {
        return self::$products[$id] ?? null;
    }
}
