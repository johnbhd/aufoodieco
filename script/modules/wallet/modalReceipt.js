import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { firebaseConfig } from "../../config/firebase-config.js";
import { toastSuccess, toastError } from "../utils/utils.js";
import { downloadPDF, downloadJPG } from "./downloadPdfJpg.js"

const app = initializeApp(firebaseConfig);

const modal = document.getElementById("receiptModal");
const receiptActions = document.getElementById("receipt-actions");

// OPEN RECEIPT
export function openReceipt() {
    const order = JSON.parse(sessionStorage.getItem("selectedOrder"));

    if (!order) {
        modal.innerHTML = "<p>No receipt data</p>";
        receiptActions.style.display = "none";
        modal.style.display = "flex";
        return;
    }

    receiptModal(order);
    renderReceiptActions();
    modal.style.display = "flex";
    receiptActions.style.display = "flex";
}

// RENDER RECEIPT CONTENT
function receiptModal(order) {
    const itemsHTML = order.items.map(item => `
        <div class="receipt-row">
            <span>${item.name} x${item.qty}</span>
            <span>₱${item.price * item.qty}</span>
        </div>
    `).join("");

    modal.innerHTML = `
        <div class="receipt-box">

            <div class="receipt-header">
                <img src="../imgs/receipt.png" alt="">
                <div>
                    <h3>AU FoodieCo</h3>
                    <p>Arellano University</p>
                    <p>Juan Sumulong Campus</p>
                </div>
            </div>

            <div class="receipt-body">

                <p><b>Order #:</b> ${order.id}</p>
                <p><b>Date:</b> ${order.date}</p>
                <p><b>Payment:</b> ${order.type}</p>

                <hr>

                <div class="receipt-items">
                    ${itemsHTML}
                </div>

                <hr>

                <div class="receipt-total">
                    <span>Total</span>
                    <span>₱${order.total}</span>
                </div>

            </div>
        </div>
    `;
}

// RENDER ACTION BUTTONS
function renderReceiptActions() {
    receiptActions.innerHTML = `
        <button class="btn-pdf" id="btn-pdf">
            <i class="fa btn-pdf"></i> PDF
        </button>

        <button class="btn-jpg" id="btn-jpg">
            <i class="fa btn"></i> JPG
        </button>

        <button class="btn-close" id="closeReceipt">
            Close
        </button>
    `;

    const pdfBtn = document.getElementById("btn-pdf");
    const jpgBtn = document.getElementById("btn-jpg");

    pdfBtn.addEventListener("click", () => downloadPDF());
    jpgBtn.addEventListener("click", () => downloadJPG());
}

