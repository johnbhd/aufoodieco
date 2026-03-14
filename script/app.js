import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { firebaseConfig } from "./config/firebase-config.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const textCon = document.getElementById("textCon");

export async function testFirebase() {
  try {
      await setDoc(doc(db, "test", "connection"), {
        connected: true,
        time: new Date()
      })
      const get = JSON.parse(sessionStorage.getItem("session"));
      console.log(db)
      textCon.textContent = get ?? "firebase connected";
      console.log(get);
  } catch (error) {
      textCon.textContent = "Failed Connection firebase";
    console.log("Error firebase", error);
  }
}

