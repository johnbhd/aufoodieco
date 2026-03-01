const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const menuBtn = document.getElementById("menu-btn");

function openSidebar() {
  sidebar.classList.remove("sidebar-hidden");
  overlay.classList.add("show");
}

function closeSidebar() {
  sidebar.classList.add("sidebar-hidden");
  overlay.classList.remove("show");
}

menuBtn.addEventListener("click", openSidebar);
overlay.addEventListener("click", closeSidebar);