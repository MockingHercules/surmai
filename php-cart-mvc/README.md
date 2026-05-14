# Surmai PHP MVC Cart

This is the PHP MVC version of the Surmai shopping-cart flow for technical presentation.

## Run

```bash
cd php-cart-mvc
php -S localhost:8000 -t public
```

Open: `http://localhost:8000`

## File Structure

```text
php-cart-mvc/
  public/
    index.php              # Front controller / router
    assets/cart.css        # Premium responsive UI
    assets/cart.js         # Dynamic cart interactions
  app/
    Controllers/
      CartController.php   # Handles add, update, remove, clear, summary
    Models/
      Product.php          # Demo product catalog / data layer
      Cart.php             # Session-backed cart model
    Views/
      cart.php             # HTML view
```

## Communication Flow

1. User clicks `Add to cart` or quantity buttons.
2. `cart.js` sends a `fetch()` POST request to `public/index.php?action=...`.
3. `index.php` routes the request to `CartController`.
4. `CartController` calls the `Cart` model.
5. `Cart` stores cart data in `$_SESSION['surmai_cart']`.
6. Controller returns JSON.
7. JavaScript re-renders the cart without a full page reload.

## Model Layer Note

In this demo, `Product.php` uses a static array. In a real MVC app, it would query a database table like `products`, while `Cart.php` would store only product IDs and quantities in the session. On every render, the cart model would fetch current product price/name/image from the database to avoid stale client-side prices.

