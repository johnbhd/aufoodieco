import { foodImportAll, addToCart } from "./modules/localstorage.js";
import { FoodData } from "./modules/food.js";
import { renderCart } from "./modules/cart.js";
import { renderFoods, renderCategory, renderSearch } from "./modules/classFunction.js";
import { showToast } from "./modules/utils.js";
import { testFirebase } from "./app.js"

const foods = FoodData();
foodImportAll(foods);

const foodList = document.getElementById("food-list");
const orderCart = document.getElementById("order-cart");
const orderSection = document.querySelector(".order-section");
const categoryFilter = document.querySelector(".categories");
const searchInput = document.querySelectorAll(".search-box input");

const cartIcon = document.getElementById("cart-div");


cartIcon.addEventListener("click", () => {
  if (orderSection.style.display !== "block") {
    orderSection.style.display = "block";
  } else {
    orderSection.style.display = "none";
  }
})



renderFoods(foods, foodList);
renderCart(orderCart);

foodList.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (!button) return;

  const id = Number(button.dataset.id);
  addToCart(id);
  renderCart(orderCart);
  showToast("Added to cart!");
});

orderCart.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-item");
  if (!deleteBtn) return;

  const id = Number(deleteBtn.dataset.id);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart(orderCart);
});

if (categoryFilter) {
  renderCategory(foods, categoryFilter, foodList);
}

if (searchInput.length) {
  renderSearch(searchInput, foods, foodList);
}

testFirebase();