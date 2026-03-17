import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { firebaseConfig } from "../../config/firebase-config.js";
import { getFirestore, collection, query, where, doc, getDoc, setDoc, serverTimestamp, getDocs } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { toastSuccess, toastError } from "../utils/utils.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function doLogin() {
  const email = document.getElementById("txtEmail").value;
  const password = document.getElementById("txtPassword").value;

  if (email == "" || password == "") {
    toastError("All fields are required!");
    return;
  }

  if (!email.includes("@")) {
    toastError("Email must contain @");
    return;
  }

  try {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      toastError("User not found!");
      return;
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
      toastError("Wrong password try again!");
      return;
    }

    if (userData.role === "user") {
      toastSuccess("Welcome user!");
      setTimeout(()=>{
        window.location.href = "./pages/homepage.html";
      },2000);
    } else {
      toastSuccess("Welcome Admin!");
      setTimeout(()=>{
        window.location.href = "./pages/admin/dashboard.html";
      },2000);
    }

  } catch (error) {
    console.error("Error login:", error);
  }
}
export async function doRegister() {
  const email = document.getElementById("txtEmail").value;
  const password = document.getElementById("txtPassword").value;
  const confirmPassword = document.getElementById("confirmPasswordInput").value;

  const name = email.split("@")[0];
  const role = "user";

  if (!email.includes("@")) {
    toastError("Email must contain @");
    return;
  }

  if (password !== confirmPassword) {
    toastError("Passwords do not match!");
    return;
  }

  try {
    // Use email as the document ID
    const userDocRef = doc(db, "users", email);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      toastError("Email already registered! Try another email.");
      return;
    }

    await setDoc(userDocRef, {
      name: name,
      email: email,
      password: password,
      role: role,
      createdAt: serverTimestamp()
    });

    toastSuccess(`Registered!\nEmail: ${email}`);
    setTimeout(() => {
      window.location.reload();

    }, 2000)

  } catch (error) {
    console.error("Error registering: ", error);
  }
}