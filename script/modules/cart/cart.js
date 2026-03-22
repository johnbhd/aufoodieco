import { showToast } from "../utils/utils.js";
import { reviewPaymentOrders } from "./review-payment.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { firebaseConfig } from "../../config/firebase-config.js";
import { generateOrderId } from "../../modules/lib/generateId.js";
 import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
 
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

 
async function pushOrders(orders) {
  try {
    await setDoc(doc(db, "orders", orders.id), orders);
    console.log("Order saved with custom ID:", orders.id);
  } catch (error) {
    console.error("Error saving order:", error);
  }
}

export function renderCart(orderCart) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  const itemsHTML = cart.length
    ? cart.map(c => {
        const itemTotal = c.price * c.qty;
        total += itemTotal;

        return `
          <div class="cart-item">
            <div class="cart-info">
              <h5 class="cart-name">${c.name}</h5>
              <p class="cart-price">₱${c.price} each</p>
            </div>

            <div class="cart-actions">
              
              <div class="qty-control">
                <button class="qty-btn decrement" data-id="${c.id}">−</button>
                <span class="qty">${c.qty}</span>
                <button class="qty-btn increment" data-id="${c.id}">+</button>
              </div>

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

  // ✅ HANDLE + / − BUTTONS
  document.querySelectorAll(".increment").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;

      cart = cart.map(item => {
        if (item.id == id) {
          item.qty += 1;
        }
        return item;
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart(orderCart);
    });
  });

  document.querySelectorAll(".decrement").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;

      cart = cart.map(item => {
        if (item.id == id && item.qty > 1) {
          item.qty -= 1; // ✅ LIMIT: minimum is 1
        }
        return item;
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart(orderCart);
    });
  });

  // checkout
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      reviewPaymentOrders(cart, total);
    });
  }
}

export function checkoutOrder(cart, total, type, orderIdFromQR) {
  if (cart.length === 0) return;

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const usedNumbers = orders.map(o => o.id);
  const orderId = generateOrderId();

  const sessionUser = JSON.parse(sessionStorage.getItem("session"));

  const newOrder = {
    id: orderIdFromQR ?? orderId,
    items: cart,
    total: total,
    email: sessionUser.email || "NA",
    name: sessionUser.name,
    type: type,
    role: sessionUser.role,
    date: new Date().toLocaleString(),
    status: "new"
  };

  showToast(`Order #${newOrder.id} placed! Total: ₱${total.toFixed(2)}`);
  
  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.setItem("cart", JSON.stringify([]));
  
  pushOrders(newOrder);
  
  renderCart(document.getElementById("order-cart"));

  setTimeout(()=>{
    window.location.href = "/pages/orders.html"
  },2000);
}
