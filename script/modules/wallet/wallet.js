import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { firebaseConfig } from "../../config/firebase-config.js";
import { getFirestore, getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { toastSuccess, toastError } from "../utils/utils.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const user = JSON.parse(sessionStorage.getItem("session"));

const walletDiv = document.getElementById('history-table');
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");
const paginationDiv = document.getElementById("pagination");

let transactions = [];
let currentPage = 1;
const itemsPerPage = 5;

const loader = document.getElementById("loader");

async function initWallet(){
  await getOrderByUser();
  loader.style.display = "none";
}

async function getOrderByUser() {
    const q = query(collection(db, "orders"), where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    transactions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    renderTransactions();
}

function renderTransactions() {
    let filtered = transactions.filter(order => {
        const description = order.items.map(i => i.name).join(" ").toLowerCase();
        return description.includes(searchInput.value.toLowerCase());
    });

    filtered.sort((a, b) => sortSelect.value === "newest" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date));

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = filtered.slice(start, end);

const ordersRow = pageItems.length > 0 
    ? pageItems.map(order => {
        const multipleItems = order.items.length > 1;
        const itemNames = order.items.map(item => multipleItems ? `• ${item.name}` : item.name).join('<br>');
        const itemPrices = order.items.map(item => multipleItems ? `• ₱${item.price}` : `₱${item.price}`).join('<br>');
        const itemQtys   = order.items.map(item => multipleItems ? `• ${item.qty}` : item.qty).join('<br>');

        return `
            <div class="history-row">
                <div class="col orderNum numOrder">${order.id}</div>
                <div class="col desc">${itemNames}</div>
                <div class="col amount">${itemPrices}</div>
                <div class="col amount">${itemQtys}</div>
                <div class="col amount">${order.total}</div>
                <div class="col status"><span class="status-completed">${order.status}</span></div>
                ${
                    order.status.toLowerCase() === "new"
                    ? `<div class="col noreceipt">-</div>`
                    : `<div class="col receipt"><button class="receipt-btn"><i class="fas fa-receipt"></i> Receipt</button></div>`
                }
            </div>
        `;
    }).join('')
    : `<div class="history-row no-orders">
            <div class="col" style="text-align:center; width:100%">No orders yet</div>
       </div>`;

    walletDiv.innerHTML = `
        <div class="history-header">
            <div class="col orderNum">Orders No.</div>
            <div class="col desc">Description</div>
            <div class="col amount">Amount</div>
            <div class="col quantity">Quantity</div>
            <div class="col total">Total</div>
            <div class="col status">Status</div>
            <div class="col receipt">Receipt</div>
        </div>
        ${ordersRow}
    `;

    paginationDiv.innerHTML = '';
    for (let i = 1; i <= totalPages + 1; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className = i === currentPage ? "active" : "";
        btn.addEventListener("click", () => { currentPage = i; renderTransactions(); });
        paginationDiv.appendChild(btn);
    }
}

searchInput.addEventListener("input", () => { currentPage = 1; renderTransactions(); });
sortSelect.addEventListener("change", () => { currentPage = 1; renderTransactions(); });

initWallet()