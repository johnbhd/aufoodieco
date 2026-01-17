import { foodImportAll, addToCart } from "./localstorage.js";
import { FoodData } from "./food.js";
import { renderCart } from "./cart.js";
import { renderFoods, renderCategory, renderSearch } from "./classFunction.js";
import { showToast } from "./utils.js";

// import food data
const foods = FoodData();
foodImportAll(foods);

// variables
const foodList = document.getElementById('food-list');
const orderCart = document.getElementById('order-cart');
const categoryFilter = document.getElementById("category-filter");
const searchInput = document.querySelectorAll(".food-search");
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

function openSidebar() {
  sidebar.classList.remove("-translate-x-full");
  overlay.classList.remove("hidden");
}

function closeSidebar() {
  sidebar.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
}

menuBtn.addEventListener("click", openSidebar);
overlay.addEventListener("click", closeSidebar);
// food show
renderFoods(foods, foodList);

// add to cart
foodList.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;

  const id = Number(e.target.dataset.id);

  addToCart(id);
  showToast("Added to cart!");

});


// cart order
renderCart(orderCart)

orderCart.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-item");
  if (!deleteBtn) return;

  const id = Number(deleteBtn.dataset.id);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
  renderCart();
});


// category
renderCategory(foods, categoryFilter, foodList);


// search 
renderSearch(searchInput, foods, foodList);