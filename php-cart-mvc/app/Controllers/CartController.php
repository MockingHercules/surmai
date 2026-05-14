<?php
class CartController
{
    public function view(): void
    {
        $products = Product::all();
        $cart = Cart::summary();
        require __DIR__ . '/../Views/cart.php';
    }

    public function add(): void
    {
        $this->json(function () {
            return Cart::add((int)($_POST['product_id'] ?? 0), (int)($_POST['quantity'] ?? 1));
        });
    }

    public function update(): void
    {
        $this->json(function () {
            return Cart::update((int)($_POST['product_id'] ?? 0), (int)($_POST['quantity'] ?? 0));
        });
    }

    public function remove(): void
    {
        $this->json(function () {
            return Cart::remove((int)($_POST['product_id'] ?? 0));
        });
    }

    public function clear(): void
    {
        $this->json(fn () => Cart::clear());
    }

    public function summary(): void
    {
        $this->json(fn () => Cart::summary());
    }

    private function json(callable $callback): void
    {
        header('Content-Type: application/json');

        try {
            echo json_encode([
                'ok' => true,
                'cart' => $callback(),
            ]);
        } catch (Throwable $error) {
            http_response_code(400);
            echo json_encode([
                'ok' => false,
                'message' => $error->getMessage(),
            ]);
        }
    }
}
