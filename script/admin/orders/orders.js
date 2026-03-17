import { getOrders } from "../../modules/api/getData.js"
import { getFirestore, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { firebaseConfig } from "../../config/firebase-config.js";
import { toastSuccess, toastError } from "../../modules/utils/utils.js";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const newOrdersDiv = document.getElementById("new-orders");
const preparingDiv = document.getElementById("preparing-orders");
const readyDiv = document.getElementById("ready-orders");

async function deleteOrder(id) {
  try {
    const orderRef = doc(db, "orders", id);
    await deleteDoc(orderRef);
  } catch (error) {
    console.error("Delete error:", err);
  }
}

function deleteOrderModal(id) {
  console.log("Delete clicked:", id);

  const deleteModal = document.getElementById("popup-delete");
  deleteModal.style.display = "flex";
  
  deleteModal.innerHTML = `
    <div class="popup-field">
            <div>
                <h4>Delete Orders</h4>
            </div>
            <div>
                <p>Are you sure you want to delete this order no. of <strong>${id}</strong>?</p>
                <div class="btnModal">
                    <button name="btndelete" data-id="${id}" id="yesBtn">Yes</button>
                    <button type="button" id="noBtn">Cancel</button>
                </div>
            </div>
        </div>
  `

  deleteModal.dataset.id = id;
}

async function updateOrderStatus(id, nextStatus) {
  try {
    const orderRef = doc(db, "orders", id); 
    await updateDoc(orderRef, { status: nextStatus });
    console.log(`Order ${id} status updated to ${nextStatus}`);
  } catch (err) {
    console.error("Error updating order status:", error);
  }
}

async function renderOrders() {
  const orders = await getOrders()

  newOrdersDiv.innerHTML = "";
  preparingDiv.innerHTML = "";
  readyDiv.innerHTML = "";
  
  orders.sort((a, b) => new Date(b.date) - new Date(a.date));
  
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
            : order.status === "ready"
            ? `<button class="move-btn" data-id="${order.id}" data-next="completed">Mark as Completed</button>`
            : ""
        }
        ${
          order.status === "new"
            ? `<button class="delete-btn" data-id="${order.id}">
                 <i class="fas fa-trash"></i>
               </button>`
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
  const moveBtn = e.target.closest(".move-btn");
  const deleteBtn = e.target.closest(".delete-btn");
  const noBtn = e.target.closest("#noBtn");
  const deleteModal = document.getElementById("popup-delete");
  const yesBtn = e.target.closest("#yesBtn");
  
  // MOVE
  if (moveBtn) {
    const id = moveBtn.dataset.id;
    const nextStatus = moveBtn.dataset.next;

    await updateOrderStatus(id, nextStatus);

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders = orders.map(order => {
      if (order.id === id) order.status = nextStatus;
      return order;
    });
    localStorage.setItem("orders", JSON.stringify(orders));

    renderOrders();
  }

  // DELETE
  if (deleteBtn) {
    const id = deleteBtn.dataset.id;

    deleteOrderModal(id); // pass ID here
  }
  if (noBtn) {
    deleteModal.style.display = "none";
  }
  if (yesBtn) {
    const id = document.getElementById("popup-delete").dataset.id;
    await deleteOrder(id);
    toastSuccess(`Successfully deleted order ${id}`);
    setTimeout(() => {
      document.getElementById("popup-delete").style.display = "none";
      renderOrders();
    }, 500); // shorten timeout
  }
});

document.addEventListener("DOMContentLoaded", () => {
  renderOrders(); 
  
});