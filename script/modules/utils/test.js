/*import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { firebaseConfig } from "../../config/firebase-config.js";
 import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { FoodData } from "../food/food.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const menuData = FoodData();

const testBtn = document.getElementById("test-btn");


async function uploadMenu() {
  for (const food of menuData) {
    await setDoc(
      doc(db, "menu", food.id.toString()),
      food
    );
  }
}

testBtn.addEventListener("click", async () => {
  await uploadMenu();
  alert("Success push firebase menu")
})