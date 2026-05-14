<?php
class Cart
{
    private const SESSION_KEY = 'surmai_cart';

    public static function items(): array
    {
        return $_SESSION[self::SESSION_KEY] ?? [];
    }

    public static function add(int $productId, int $quantity = 1): array
    {
        $product = Product::find($productId);
        if (!$product) {
            throw new Exception('Product not found.');
        }

        $cart = self::items();
        $currentQty = $cart[$productId]['quantity'] ?? 0;

        $cart[$productId] = [
            'product' => $product,
            'quantity' => max(1, $currentQty + $quantity),
        ];

        $_SESSION[self::SESSION_KEY] = $cart;
        return self::summary();
    }

    public static function update(int $productId, int $quantity): array
    {
        $cart = self::items();

        if ($quantity <= 0) {
            unset($cart[$productId]);
        } elseif (isset($cart[$productId])) {
            $cart[$productId]['quantity'] = $quantity;
        }

        $_SESSION[self::SESSION_KEY] = $cart;
        return self::summary();
    }

    public static function remove(int $productId): array
    {
        $cart = self::items();
        unset($cart[$productId]);
        $_SESSION[self::SESSION_KEY] = $cart;
        return self::summary();
    }

    public static function clear(): array
    {
        $_SESSION[self::SESSION_KEY] = [];
        return self::summary();
    }

    public static function summary(): array
    {
        $items = array_values(self::items());
        $subtotal = 0;

        foreach ($items as &$item) {
            $item['lineTotal'] = $item['product']['price'] * $item['quantity'];
            $subtotal += $item['lineTotal'];
        }

        $delivery = $subtotal > 0 ? 29 : 0;

        return [
            'items' => $items,
            'subtotal' => $subtotal,
            'delivery' => $delivery,
            'total' => $subtotal + $delivery,
            'count' => array_sum(array_column($items, 'quantity')),
        ];
    }
}
