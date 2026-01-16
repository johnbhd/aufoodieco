import { foodImportAll, addToCart } from "./localstorage.js";
import { FoodData } from "./food.js";
import { renderCart } from "./orders.js";
import { renderFoods, renderCategory, renderSearch } from "./classFunction.js";
// import food data
const foods = FoodData();
foodImportAll(foods);

// variables
const foodList = document.getElementById('food-list');
const orderCart = document.getElementById('order-cart');
const categoryFilter = document.getElementById("category-filter");
const searchInput = document.getElementById("food-search");

// food show
renderFoods(foods, foodList);

// add to cart
foodList.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;

  const id = Number(e.target.dataset.id);
  alert("Added to cart!");
  window.location.reload();
  addToCart(id);
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