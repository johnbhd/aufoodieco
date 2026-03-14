import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { firebaseConfig } from "../../config/firebase-config.js";
import { getFirestore, collection, query, where, addDoc, serverTimestamp, getDocs } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export async function doLogin() {
  const email = document.getElementById("txtEmail").value;
  const password = document.getElementById("txtPassword").value;
  
  if (email == "" || password == "") {
    alert("All fields are required!");
    return;
  }
  if (!email.includes("@")) {
    alert("Email must contain @");
    return;
  }
  
  try {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      alert("User not found!");
    }
    
    let userData = null;
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      
      if (data.password === password) {
        userData = data;
        sessionStorage.setItem("session", JSON.stringify(data));
      }
    });
    
    if (!userData) {
      alert("Wrong password try again!");
    }
    
    if (userData.role == "user") {
      alert("Welcome user!");
      window.location.href = "./pages/homepage.html";
    } else {
      alert("Welcome Admin!");
      window.location.href = "./pages/admin/dashboard.html";
    }
    
  } catch (error) {
    console.error("Error login: ",error);
  }
}

export async function doRegister() {
  const email = document.getElementById("txtEmail").value;
  const password = document.getElementById("txtPassword").value;
  const name = email.split("@")[0];
  const role = "user";
  
  const confirmPassword = document.getElementById("confirmPasswordInput").value;
  if (!email.includes("@")) {
    alert("Email must contain @");
    return;
  }
  if(password === confirmPassword) {
    await addDoc(collection(db, "users"), {
      name: name,
      email: email,
      password: password,
      role: role,
      createdAt: serverTimestamp()
    });
    
    alert(`Registered!\nEmail: ${email}\nPassword: ${password}`);
    window.location.reload();
    
    authBtn.innerHTML = `Don't have an account? <u>Register here.</u>`;
  } else {
    alert("Passwords do not match!");
  }
}