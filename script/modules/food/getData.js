import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { firebaseConfig } from "../../config/firebase-config.js";
 import { getFirestore, getDocs, collection } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
 
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
 
export async function getMenu() {
   const querySnapshot = await getDocs(collection(db, "menu"));
   
   const foods = querySnapshot.docs.map(doc => ({
     id: doc.id,
     ...doc.data()
   }));
   
   return foods;
 };
 
 export async function getOrders() {
   const querySnapshot = await getDocs(collection(db, "orders"));
   
   const orders = querySnapshot.docs.map(doc => ({
     id: doc.id,
     ...doc.data()
   }));
   
   return orders;
 };
 
 