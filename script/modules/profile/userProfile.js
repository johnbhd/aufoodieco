import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { firebaseConfig } from "../../config/firebase-config.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { toastSuccess, toastError } from "../utils/utils.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const loader = document.getElementById("loader");

async function initProfile(){
  await loadUserProfile();
  updateProfile();
  loader.style.display = "none";
}

async function loadUserProfile() {
  const sessionData = JSON.parse(sessionStorage.getItem('session'));
  if (!sessionData || !sessionData.email) return;

  const userId = sessionData.email;
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return; // Only load if user exists

  const userData = userSnap.data();

  document.getElementById('display-name').textContent = userData.name || sessionData.name || '';
  document.getElementById('fullName').value = userData.name || sessionData.name || '';
  document.getElementById('studentId').value = userData.studentId || '';
  document.getElementById('email').value = userData.email || sessionData.email || '';
  document.getElementById('course').value = userData.course || '';
  document.getElementById('yearLevel').value = userData.yearLevel || '';
  if (userData.profileImg) document.getElementById('profile-img').src = userData.profileImg;
}


function updateProfile() {
  const profileForm = document.getElementById('profile-form');
  profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const sessionData = JSON.parse(sessionStorage.getItem('session'));
    if (!sessionData || !sessionData.email) return;
    
    const userId = sessionData.email;
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      toastError("Cannot update: User does not exist.");
      return; // Do not create a new user
    }
    
    const updatedData = {
      name: document.getElementById('fullName').value || null,
      studentId: document.getElementById('studentId').value || null,
      email: document.getElementById('email').value || null,
      course: document.getElementById('course').value || null,
      yearLevel: document.getElementById('yearLevel').value || null,
      profileImg: null
    };
    
    try {
      await updateDoc(userRef, updatedData); // Only updates existing fields or creates missing fields
      toastSuccess("Profile updated successfully!");
    } catch (error) {
      toastError("Failed to update profile.");
      console.error(error);
    }
  });
}

initProfile()