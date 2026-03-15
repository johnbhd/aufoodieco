import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { firebaseConfig } from "../../config/firebase-config.js";
 import { getFirestore, getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
 
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// get data
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
 
 export async function getUser() {
   const querySnapshot = await getDocs(collection(db, "users"));
   
   const users = querySnapshot.docs.map(doc => ({
     id: doc.id,
     ...doc.data()
   }));
   
   return users;
 };
 
 // get data with condition
  export async function getSales() {
   const q = await query(
    collection(db, "orders"),
    where("status", "==", "completed")
   );

   const querySnapshot = await getDocs(q);
   
   const sales = querySnapshot.docs.map(doc => ({
     id: doc.id,
     ...doc.data()
   }));
   
   return sales;
 };


 // count dashboard
 export async function getUserCount() {
   const querySnapshot = await getDocs(collection(db, "users"));
   
   return querySnapshot.size;
 };
 export async function getMenuCount() {
   const querySnapshot = await getDocs(collection(db, "menu"));
   
   return querySnapshot.size;
 };
 export async function getOrdersCount() {
   const querySnapshot = await getDocs(collection(db, "orders"));
   
   return querySnapshot.size;
 };
