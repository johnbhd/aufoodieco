import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { firebaseConfig } from "../../../config/firebase-config.js";
import { getFirestore, doc, setDoc, serverTimestamp, deleteDoc, onSnapshot  } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { reviewPaymentOrders } from "../review-payment.js"
import { generateOrderId } from "../../lib/generateId.js";
import { checkoutOrder } from "../cart.js";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function modalQrCode(cart, total, type) {
  const modal = document.querySelector('.modal-con');
  
  const orderId = generateOrderId();
  
  sessionStorage.setItem("pendingGcashOrderId", orderId);
  
  await setDoc(doc(db, "pendingGcashOrders", orderId), {
    cart,
    total,
    payment: "gcash",
    status: "pending",
    createdAt: serverTimestamp()
  });

  modal.innerHTML = `
    <div class="modal">
        <div class="modal-title">
            <h2>Scan QR CODE</h2>
            <p>Order: ${orderId}</p>
        </div>
        <div class="modal-body">
            <div class="modal-qr">
                <canvas id="qr"></canvas>
                <div class="qr-logo">
                    <img src="../imgs/aulogo.png" >
                </div>
            </div><br>
            <div class="modal-btn">
                <button id="modal-option">Choose other option</button>
            </div>
        </div>


    </div> 
    `
    const closeBtn = document.getElementById("modal-option");

    QRCode.toCanvas(
        document.getElementById("qr"),
        orderId,
          {
                width: 160,  
                margin: 2    
            }
    );

    async function cancelPendingOrder() {
        try {
        await deleteDoc(doc(db, "pendingGcashOrders", orderId));
        sessionStorage.removeItem("pendingGcashOrderId");
        } catch (err) {
        console.error("Failed to delete pending order:", err);
        }
    }

    closeBtn.addEventListener("click", async () => {
        await cancelPendingOrder();
        reviewPaymentOrders(cart, total);
    });

    const orderRef = doc(db, "pendingGcashOrders", orderId);
    const unsubscribe = onSnapshot(orderRef, (docSnap) => {
        if (!docSnap.exists()) return;

        const data = docSnap.data();

        if (data.status === "paid") {
            modal.innerHTML = `
            <div class="modal">
                <div class="modal-title">
                    <h2>Order: ${orderId}</h2>
                </div>
                <div class="modal-body">
                    <p>Your payment has been confirmed!</p>
                </div>

            </div>
            `;

            setTimeout(() => {
                checkoutOrder(cart, total, "gcash", orderId);
            }, 2000)
            unsubscribe();
            sessionStorage.removeItem("pendingGcashOrderId");
        }
    });
    
    window.addEventListener("beforeunload", async (e) => {
        if (sessionStorage.getItem("pendingGcashOrderId")) {
        await cancelPendingOrder();
        }
    });
    return orderId;
}