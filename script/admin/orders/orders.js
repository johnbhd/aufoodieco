import { getOrders } from "../../modules/food/getData.js"
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { firebaseConfig } from "../../config/firebase-config.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const newOrdersDiv = document.getElementById("new-orders");
const preparingDiv = document.getElementById("preparing-orders");
const readyDiv = document.getElementById("ready-orders");

async function updateOrderStatus(id, nextStatus) {
  try {
    const orderRef = doc(db, "orders", id); // Use order ID as document ID
    await updateDoc(orderRef, { status: nextStatus });
    console.log(`Order ${id} status updated to ${nextStatus}`);
  } catch (err) {
    console.error("Error updating order status:", err);
  }
}

async function renderOrders() {
  const orders = await getOrders()

  newOrdersDiv.innerHTML = "";
  preparingDiv.innerHTML = "";
  readyDiv.innerHTML = "";

  orders.forEach(order => {
    const card = document.createElement("div");
    card.className = "order-item";

    card.innerHTML = `
      <div class="order-header">
        <span class="order-id">#${order.id}</span>
        <span class="order-date">${order.date}</span>
      </div>

      <ul class="order-list-items">
        ${order.items.map(item => `<li>${item.name} (${item.qty}x)</li>`).join("")}
      </ul>
      
      <div class="order-actions">
        ${
          order.status === "new"
            ? `<button class="move-btn" data-id="${order.id}" data-next="preparing">Move to Preparing</button>`
            : order.status === "preparing"
            ? `<button class="move-btn" data-id="${order.id}" data-next="ready">Move to Ready</button>`
            : ""
        }
      </div>

    `;

    if (order.status === "new") newOrdersDiv.appendChild(card);
    else if (order.status === "preparing") preparingDiv.appendChild(card);
    else if (order.status === "ready") readyDiv.appendChild(card);
  });
}
document.addEventListener("click", async (e) => {
  const btn = e.target.closest(".move-btn");
  if (!btn) return;

  const id = btn.dataset.id;      
  const nextStatus = btn.dataset.next;

  
  await updateOrderStatus(id, nextStatus);

  
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders = orders.map(order => {
    if (order.id === id) order.status = nextStatus;
    return order;
  });
  localStorage.setItem("orders", JSON.stringify(orders));

  
  renderOrders();
});

document.addEventListener("DOMContentLoaded", () => {
  renderOrders(); 
  
});