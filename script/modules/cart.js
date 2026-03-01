import { showToast } from "./utils.js";

export function renderCart(orderCart) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  const itemsHTML = cart.length
    ? cart.map(c => {
        const itemTotal = c.price * c.qty;
        total += itemTotal;

        return `
          <div class="cart-item">
            <div class="cart-info">
              <h5 class="cart-name">${c.name} (${c.qty}x)</h5>
              <p class="cart-price">${c.price} each</p>
            </div>

            <div class="cart-actions">
              <span class="cart-item-total">₱${itemTotal}</span>
              <button 
                class="delete-item"
                data-id="${c.id}"
                title="Remove item"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        `;
      }).join("")
    : `<p class="cart-empty">Cart is empty</p>`;

  orderCart.innerHTML = `
    <div class="cart-items">
      ${itemsHTML}
    </div>

    <div class="cart-summary">
      <span>Total</span>
      <span>₱${total.toFixed(2)}</span>
    </div>

    <button 
      id="checkout-btn"
      class="checkout-btn"
      ${cart.length === 0 ? "disabled" : ""}
    >
      Checkout
    </button>
  `;

  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      checkoutOrder(cart, total);
    });
  }
}

function checkoutOrder(cart, total) {
  if (cart.length === 0) return;

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const usedNumbers = orders.map(o => o.id);
  let orderId = null;

  for (let i = 1; i <= 100; i++) {
    if (!usedNumbers.includes(i)) {
      orderId = i;
      break;
    }
  }

  if (orderId === null) {
    showToast("Order numbers limit reached (100). Please clear completed orders.");
    return;
  }

  const newOrder = {
    id: orderId,
    items: cart,
    total: total,
    date: new Date().toLocaleString(),
    status: "new"
  };

  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.setItem("cart", JSON.stringify([]));

  renderCart(document.getElementById("order-cart"));

  showToast(`Order #${newOrder.id} placed! Total: ₱${total.toFixed(2)}`);
}