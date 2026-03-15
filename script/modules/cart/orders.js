// Columns
import { getOrders } from "../api/getData.js"


const newOrdersDiv = document.getElementById("new-orders");
const preparingDiv = document.getElementById("preparing-orders");
const readyDiv = document.getElementById("ready-orders");

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


    `;

    if (order.status === "new") newOrdersDiv.appendChild(card);
    else if (order.status === "preparing") preparingDiv.appendChild(card);
    else if (order.status === "ready") readyDiv.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderOrders(); 
  
});