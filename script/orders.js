export function renderCart(orderCart) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let total = 0;

  const itemsHTML = cart.length
    ? cart.map(c => {
        const itemTotal = c.price * c.qty;
        total += itemTotal;

        return `
          <div class="flex justify-between items-center bg-[#3A3849] p-3 rounded-lg">
            <div>
              <h5 class="font-medium">${c.name} (${c.qty}x)</h5>
              <p class="text-gray-400 text-sm">₱${c.price} each</p>
            </div>

            <div class="flex items-center gap-3">
              <span class="font-semibold">₱${itemTotal}</span>
              <button 
                class="delete-item text-red-500 hover:text-red-400"
                data-id="${c.id}"
                title="Remove item"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        `;
      }).join("")
    : `<p class="text-gray-400 text-sm text-center">Cart is empty</p>`;

  orderCart.innerHTML = `
    <div class="space-y-4 mb-6">
      ${itemsHTML}
    </div>

    <div class="flex justify-between font-semibold text-lg border-t border-gray-600 pt-2 mb-6">
      <span>Total</span>
      <span>₱${total.toFixed(2)}</span>
    </div>

    <button 
      id="checkout-btn"
      class="w-full bg-red-600 text-white text-lg hover:bg-red-500/80 font-semibold py-3 rounded-lg transition
             ${cart.length === 0 ? "opacity-50 cursor-not-allowed" : ""}"
      ${cart.length === 0 ? "disabled" : ""}
    >
      Checkout
    </button>
  `;

  // Attach Checkout listener
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
    alert("Order numbers limit reached (100). Please clear completed orders.");
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

  const orderCartDiv = document.getElementById("order-cart");
  renderCart(orderCartDiv);

  alert(`Order #${newOrder.id} placed! Total: ₱${total.toFixed(2)}`);
}
