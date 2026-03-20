import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { firebaseConfig } from "../../../config/firebase-config.js";
import { getFirestore, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { toastSuccess, toastError } from "../../utils/utils.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let html5QrCode;

export function openScannerModal() {
  const modal = document.querySelector('.modal-con');
  modal.style.display = "flex";

  modal.innerHTML = `
    <div class="modal">
      <div class="modal-title">
        <h2>Scan QR Code</h2>
      </div>
      <div class="modal-body">
        <div id="reader"></div>
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
        // Stop scanner
        await html5QrCode.stop();
        html5QrCode.clear();

        // Update Firebase
        const orderRef = doc(db, "pendingGcashOrders", decodedText);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists() && orderSnap.data().status === "pending") {
          await updateDoc(orderRef, { status: "paid" });
        } else {
          toastError("Order not found or already paid!");
          return;
        }

        // Show success modal
        modal.innerHTML = `
          <div class="modal">
            <div class="modal-title">
              <h2>Payment Success!</h2>
              <p>Order: ${decodedText}</p>
            </div>
            <div class="modal-body">
              <p>Payment has been confirmed.</p>
            </div>
            <div class="modal-btn">
              <button id="close-success">Close</button>
            </div>
          </div>
        `;

        document.getElementById("close-success").addEventListener("click", () => {
          modal.style.display = "none";
        });

        toastSuccess("Payment success! Order: " + decodedText);

      } catch (err) {
        console.error("Error completing scan:", err);
        toastError("Something went wrong. Try again.");
      }
    },
    (error) => {
      console.warn("QR scan error:", error);
    }
  ).catch((err) => {
    console.error("Failed to start QR scanner:", err);
    toastError("Cannot access camera. Please check permissions or try again.");
  });

  // Cancel button
  document.getElementById("close-scan").addEventListener("click", async () => {
    modal.style.display = "none";
    if (html5QrCode) {
      await html5QrCode.stop().catch(() => {});
      html5QrCode.clear();
    }
  });
}

document.addEventListener("click", (e) => {
    const iconScanner = e.target.closest("#wallet-scannerIcon");
    const closeModal = e.target.closest("#close-scan");
    const modal = document.querySelector('.modal-con');

    if (iconScanner) {
        openScannerModal()
    }

    if (closeModal) {
        modal.style.display = "none"
    }
})