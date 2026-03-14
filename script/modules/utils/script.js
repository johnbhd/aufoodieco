import { protectRoute } from "./middleware.js"

const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const menuBtn = document.getElementById("menu-btn");
const logoutBtn = document.getElementById("logout-btn");

function openSidebar() {
  sidebar.classList.remove("sidebar-hidden");
  overlay.classList.add("show");
}

function closeSidebar() {
  sidebar.classList.add("sidebar-hidden");
  overlay.classList.remove("show");
}
function logout() {
    sessionStorage.setItem("session", "");
    window.location.href = "/index.html";
}
if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}
menuBtn.addEventListener("click", openSidebar);
overlay.addEventListener("click", closeSidebar);


protectRoute()

