import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { firebaseConfig } from "../../config/firebase-config.js";
import { getFirestore, doc, getDoc, updateDoc, getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { toastSuccess, toastError } from "../utils/utils.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const user = JSON.parse(sessionStorage.getItem("session"));

const eMoneyInput = document.getElementById("balance-amount");

async function getUserEmoney() {
  const q = query(collection(db, "users"), where("email", "==", user.email));
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    const userData = doc.data();
    
    eMoneyInput.value = userData.eMoney || 0;
  } 
  
}
async function eMoneyCashIn() {
  const amountInput = document.getElementById("balance-amount");
  const newBalance = Number(amountInput.value.replace(/[^\d]/g, ""));

  if (isNaN(newBalance) || newBalance < 0) {
    toastError("Invalid balance");
    return;
  }

  const q = query(collection(db, "users"), where("email", "==", user.email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    const userRef = doc(db, "users", userDoc.id);

    await updateDoc(userRef, {
      eMoney: newBalance
    });

    toastSuccess(`Balance updated to ₱${newBalance}`);
  } else {
    toastError("User not found");
  }
}

document.addEventListener("click", async (e) => {
  const cashInBtn = e.target.closest(".cash-in-btn");
  
  if (cashInBtn) {
     await eMoneyCashIn();
  }
})
getUserEmoney();