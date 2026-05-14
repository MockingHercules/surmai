const cartItems = document.querySelector("#cart-items");
const subtotal = document.querySelector("#subtotal");
const delivery = document.querySelector("#delivery");
const total = document.querySelector("#total");
const cartCount = document.querySelector("#cart-count");
const clearCart = document.querySelector("#clear-cart");

let cart = window.initialCart;
const currency = new Intl.NumberFormat("en-IN");

function money(value) {
  return `Rs ${currency.format(value)}`;
}

async function cartRequest(action, payload = {}) {
  const body = new URLSearchParams(payload);
  const response = await fetch(`/index.php?action=${action}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = await response.json();
  if (!data.ok) throw new Error(data.message || "Cart action failed.");
  cart = data.cart;
  renderCart();
}

function renderCart() {
  cartCount.textContent = `${cart.count} ${cart.count === 1 ? "item" : "items"}`;
  subtotal.textContent = money(cart.subtotal);
  delivery.textContent = money(cart.delivery);
  total.textContent = money(cart.total);

  if (!cart.items.length) {
    cartItems.innerHTML = `<div class="empty-state">Your cart is empty. Add fresh seafood to begin.</div>`;
    return;
  }

  cartItems.innerHTML = cart.items.map(({ product, quantity, lineTotal }) => `
    <article class="cart-row">
      <img src="${product.image}" alt="${product.name}" />
      <div>
        <h3>${product.name}</h3>
        <p>${money(product.price)} / ${product.unit}</p>
        <div class="row-actions">
          <div class="qty-control" aria-label="Quantity controls">
            <button data-action="decrease" data-product-id="${product.id}">-</button>
            <strong>${quantity}</strong>
            <button data-action="increase" data-product-id="${product.id}">+</button>
          </div>
          <span class="line-total">${money(lineTotal)}</span>
        </div>
        <button class="remove-btn" data-action="remove" data-product-id="${product.id}">Remove</button>
      </div>
    </article>
  `).join("");
}

document.addEventListener("click", async (event) => {
  const addButton = event.target.closest(".add-btn");
  const actionButton = event.target.closest("[data-action]");

  try {
    if (addButton) {
      addButton.textContent = "Added";
      await cartRequest("add", { product_id: addButton.dataset.productId, quantity: 1 });
      setTimeout(() => (addButton.textContent = "Add to cart"), 650);
    }

    if (actionButton) {
      const id = actionButton.dataset.productId;
      const action = actionButton.dataset.action;
      const item = cart.items.find((entry) => String(entry.product.id) === String(id));

      if (action === "increase") {
        await cartRequest("update", { product_id: id, quantity: item.quantity + 1 });
      }

      if (action === "decrease") {
        await cartRequest("update", { product_id: id, quantity: item.quantity - 1 });
      }

      if (action === "remove") {
        await cartRequest("remove", { product_id: id });
      }
    }
  } catch (error) {
    alert(error.message);
  }
});

clearCart.addEventListener("click", () => cartRequest("clear"));
renderCart();
