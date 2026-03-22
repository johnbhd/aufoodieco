import { getOrders, getOrdersCount } from "../../modules/api/getData.js"
import { getFirestore, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { firebaseConfig } from "../../config/firebase-config.js";
import { toastSuccess, toastError } from "../../modules/utils/utils.js";
import { openReceipt } from "../../modules/wallet/modalReceipt.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const loader = document.getElementById("loader");
const orderSearch = document.getElementById('txtsearch');
let allOrders = [];

async function initOrderHistory() {
    await orderHistoryManagement()
    loader.style.display = "none";
}
function updateOrderModal(order) {
    const modal = document.getElementById("popup-details");
    modal.style.display = "flex";

    const itemsHTML = order.items.map((item, index) => `
        <div class="item-row">
            <p><strong>Name:</strong> ${item.name}</p>
            <p><strong>Category:</strong>
                <select class="edit-category" data-index="${index}">
                    <option value="" disabled ${!item.category ? "selected" : ""}>Select Category</option>
                    <option value="Meal" ${item.category === "Meal" ? "selected" : ""}>Meal</option>
                    <option value="Snack" ${item.category === "Snack" ? "selected" : ""}>Snack</option>
                    <option value="Drink" ${item.category === "Drink" ? "selected" : ""}>Drink</option>
                    <option value="Others" ${item.category === "Others" ? "selected" : ""}>Others</option>
                </select>
            </p>
            <p><strong>Qty:</strong> ${item.qty}</p>
            <p><strong>Price:</strong> ₱${item.price}</p>
            <hr>
        </div>
    `).join("");

    modal.innerHTML = `
    <div class="popup-field">
        <h4>Update Order</h4><br>

        <div class="details-content">

            <p><strong>Status:</strong>
                <select id="edit-status">
                    <option value="new" ${order.status === "new" ? "selected" : ""}>New</option>
                    <option value="preparing" ${order.status === "preparing" ? "selected" : ""}>Preparing</option>
                    <option value="ready" ${order.status === "ready" ? "selected" : ""}>Ready</option>
                </select>
            </p>

            <p><strong>Type:</strong>
                <select id="edit-type">
                    <option value="" disabled ${!order.type ? "selected" : ""}>Select Type</option>
                    <option value="cash" ${order.type === "Cash" ? "selected" : ""}>Cash</option>
                    <option value="gcash" ${order.type === "GCash" ? "selected" : ""}>GCash</option>
                </select>
            </p>

            <div class="items-section">
                <h5 style= "font-size: 1rem; padding-bottom: 10px;">Items</h5> 
                ${itemsHTML}
            </div>

            <div class="btnModal">
                <button id="saveOrderBtn">Save</button>
                <button id="closeOrderBtn">Close</button>
            </div>

        </div>
    </div>
    `;

    // SAVE
    document.getElementById("saveOrderBtn").addEventListener("click", async () => {

        const status = document.getElementById("edit-status").value;
        const type = document.getElementById("edit-type").value || "cash"; // default if empty

        const categoryInputs = document.querySelectorAll(".edit-category");

        const updatedItems = order.items.map((item, index) => ({
            ...item,
            category: categoryInputs[index].value
        }));

        const newTotal = updatedItems.reduce((sum, item) => {
            return sum + (item.price * item.qty);
        }, 0);

        const updatedOrder = {
            status,
            type,
            items: updatedItems,
            total: newTotal
        };

        try {
            const orderRef = doc(db, "orders", order.id);
            await updateDoc(orderRef, updatedOrder);

            toastSuccess("Order updated successfully!");
            modal.style.display = "none";
            await orderHistoryManagement();

        } catch (err) {
            console.error(err);
            toastError("Failed to update order");
        }
    });

    // CLOSE
    document.getElementById("closeOrderBtn").addEventListener("click", () => {
        modal.style.display = "none";
    });
}
function deleteOrderModal(orderId) {
    const modal = document.getElementById("popup-details");
    modal.style.display = "flex";

    modal.innerHTML = `
    <div class="popup-field">
        <h4>Delete Order</h4>
        <p>Are you sure you want to delete this order?</p>

        <div class="btnModal">
            <button id="confirmDelete">Yes</button>
            <button id="cancelDelete">Cancel</button>
        </div>
    </div>
    `;

    document.getElementById("confirmDelete").addEventListener("click", async () => {
        try {
            await deleteDoc(doc(db, "orders", orderId));

            toastSuccess("Order deleted!");
            modal.style.display = "none";
            await orderHistoryManagement();

        } catch (err) {
            console.error(err);
            toastError("Delete failed");
        }
    });

    document.getElementById("cancelDelete").addEventListener("click", () => {
        modal.style.display = "none";
    });
}
document.addEventListener("click", (e) => {

    // RECEIPT
    if (e.target.classList.contains("receipt")) {
        const id = e.target.dataset.id;
        const order = allOrders.find(o => o.id === id);

        if (!order) return;

        openReceipt(order);
    }

    // UPDATE
    if (e.target.classList.contains("update")) {
        const id = e.target.dataset.id;
        const order = allOrders.find(o => o.id === id);

        if (!order) return;

        updateOrderModal(order);
    }

    // DELETE
    if (e.target.classList.contains("delete")) {
        const id = e.target.dataset.id;
        const order = allOrders.find(o => o.id === id);

        if (!order) return;

        deleteOrderModal(order.id);
    }
});
function searchOrders() {
    const val = orderSearch.value.toLowerCase().trim();

    const filteredOrders = allOrders.filter(order => 
        order.id.toLowerCase().includes(val) ||
        order.status.toLowerCase().includes(val) ||
        order.items.some(item => item.name.toLowerCase().includes(val))
    );
    
    renderOrders(filteredOrders, filteredOrders.length); // <-- fixed here
}

function renderOrders(orders, ordersCount) {
    const tableOrders = document.getElementById('order-history');
    
    orders.sort((a, b) => new Date(b.date) - new Date(a.date));

    const orderRow = orders.length ? orders.map(order => {
        const multipleItems = order.items.length > 1;

        const itemNames = order.items.map(item => multipleItems ? `• ${item.name}` : item.name).join('<br>');
        const itemPrices = order.items.map(item => multipleItems ? `• ₱${item.price}` : `₱${item.price}`).join('<br>');
        const itemQtys   = order.items.map(item => multipleItems ? `• ${item.qty}` : item.qty).join('<br>');

        return `
            <tr>
                <td>${order.id}</td>
                <td>${itemNames}</td>
                <td>${itemPrices}</td>
                <td>${itemQtys}</td>
                <td>${order.total}</td>
                <td>${order.type}</td>
                <td>${order.date}</td>
                <td class="actions">
              <button class="receipt" data-id="${order.id}">Receipt</button>
              <button class="update" data-id="${order.id}">Update</button>
              <button class="delete" data-id="${order.id}">Delete</button>
                </td>
            </tr>
        `;
    }).join('') : `
        <tr class="countTotal">
            <td colspan="8">No Orders Found.</td>
        </tr>
    `;

    tableOrders.innerHTML = `
        <tr>
            <th>Order ID</th>
            <th>Food</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Type</th>
            <th>Date</th>
            <th>Actions</th>
        </tr>
        ${orderRow}
        <tr class="countTotal">
            <td>Total Orders</td>
            <td colspan="5"></td>
            <td>${ordersCount}</td>
        </tr>
    `;
}

async function orderHistoryManagement() {
    const ordersCount = await getOrdersCount();
    allOrders = await getOrders();

    renderOrders(allOrders, ordersCount)
    console.log(allOrders)
}

orderSearch.addEventListener('input', searchOrders); 

document.addEventListener('DOMContentLoaded', () => {
    initOrderHistory();
});
