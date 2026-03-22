import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { firebaseConfig } from "../../../config/firebase-config.js";
import {
  getFirestore,
  doc,
  updateDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { toastSuccess, toastError } from "../../utils/utils.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const user = JSON.parse(sessionStorage.getItem("session"));
let html5QrCode;

export function openScannerModal() {
  const modal = document.querySelector(".modal-con");
  modal.style.display = "flex";

  modal.innerHTML = `
    <div class="modal">
      <div class="modal-title">
        <h2>Scan QR Code</h2>
      </div>
      <div class="modal-body">
        <div id="reader">
          <div class="scanner-frame">
            <div class="corner tl"></div>
            <div class="corner tr"></div>
            <div class="corner bl"></div>
            <div class="corner br"></div>
          </div>
        </div>
      </div>
      <div class="modal-btn">
        <button id="close-scan">Cancel</button>
      </div>
    </div>
  `;

  html5QrCode = new Html5Qrcode("reader");

  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    async (decodedText) => {
      try {
        await html5QrCode.stop();
        html5QrCode.clear();

        const orderRef = doc(db, "pendingGcashOrders", decodedText);
        const orderSnap = await getDoc(orderRef);
        if (!orderSnap.exists()) {
          toastError("Order not found!");
          return;
        }

        const orderData = orderSnap.data();
        if (orderData.status !== "pending") {
          toastError("Order already paid!");
          return;
        }

        const orderTotal = Number(orderData.total || 0);
        const qUser = query(collection(db, "users"), where("email", "==", user.email));
        const userSnap = await getDocs(qUser);
        if (userSnap.empty) {
          toastError("User not found!");
          return;
        }

        const userDoc = userSnap.docs[0];
        const userRef = doc(db, "users", userDoc.id);
        const userData = userDoc.data();
        const currentBalance = Number(userData.eMoney || 0);

        if (currentBalance < orderTotal) {
          toastError("Insufficient balance!");
          return;
        }

        const newBalance = currentBalance - orderTotal;

        await updateDoc(userRef, { eMoney: newBalance });
        await updateDoc(orderRef, { status: "paid", paidAt: new Date() });

        modal.innerHTML = `
          <div class="modal">
            <div class="modal-title">
              <h2>Payment Success!</h2>
              <p>Order ID: ${decodedText}</p>
            </div>
            <div class="modal-body">
              <p>₱${orderTotal} has been deducted.</p>
              <p>New Balance: ₱${newBalance}</p>
            </div>
            <div class="modal-btn">
              <button id="close-success">Close</button>
            </div>
          </div>
        `;

        document.getElementById("close-success").addEventListener("click", () => {
          modal.style.display = "none";
        });

        toastSuccess(`Payment success! ₱${orderTotal} deducted`);
      } catch (err) {
        console.error(err);
        toastError("Something went wrong!");
      }
    },
    (error) => console.warn("QR error:", error)
  ).catch(() => toastError("Camera not accessible!"));

  document.getElementById("close-scan").addEventListener("click", async () => {
    modal.style.display = "none";
    if (html5QrCode) {
      await html5QrCode.stop().catch(() => {});
      html5QrCode.clear();
    }
  });
}

document.addEventListener("click", (e) => {
  if (e.target.closest("#wallet-scannerIcon")) {
    openScannerModal();
  }
});