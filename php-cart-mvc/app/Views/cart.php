<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Surmai Cart</title>
  <link rel="stylesheet" href="/assets/cart.css" />
</head>
<body>
  <main class="cart-page">
    <section class="hero">
      <p class="eyebrow">Surmai cart</p>
      <h1>Fresh seafood basket.</h1>
      <p>Fresh seafood cart with persistent session storage and smooth quantity updates.</p>
    </section>

    <section class="layout">
      <div>
        <div class="section-title">
          <h2>Shop seafood</h2>
          <span id="cart-count"><?= $cart['count'] ?> items</span>
        </div>

        <div class="product-grid">
          <?php foreach ($products as $product): ?>
            <article class="product-card">
              <img src="<?= htmlspecialchars($product['image']) ?>" alt="<?= htmlspecialchars($product['name']) ?>" />
              <div class="product-copy">
                <p><?= htmlspecialchars($product['unit']) ?></p>
                <h3><?= htmlspecialchars($product['name']) ?></h3>
                <strong>Rs <?= number_format($product['price']) ?></strong>
                <button class="add-btn" data-product-id="<?= $product['id'] ?>">Add to cart</button>
              </div>
            </article>
          <?php endforeach; ?>
        </div>
      </div>

      <aside class="cart-panel">
        <div class="section-title">
          <h2>Your cart</h2>
          <button id="clear-cart" class="ghost-btn">Clear</button>
        </div>

        <div id="cart-items" class="cart-items"></div>

        <div class="totals">
          <div><span>Subtotal</span><strong id="subtotal">Rs 0</strong></div>
          <div><span>Delivery</span><strong id="delivery">Rs 0</strong></div>
          <div class="grand-total"><span>Total</span><strong id="total">Rs 0</strong></div>
          <button class="checkout-btn">Proceed to checkout</button>
        </div>
      </aside>
    </section>
  </main>

  <script>
    window.initialCart = <?= json_encode($cart) ?>;
  </script>
  <script src="/assets/cart.js"></script>
</body>
</html>

