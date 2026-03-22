export function renderFoods(list, foodList) {
  if (!foodList) return;

  foodList.innerHTML = list.map(food => `
    <div class="food-card">

      <div class="food-image">
        <img src="${food.img}" alt="${food.name}">
      </div>

      <div class="food-info">
        <h4 class="food-name">${food.name}</h4>
        <p class="food-price">₱${food.price}</p>
      </div>

      <button 
        class="add-cart-btn"
        data-id="${food.id}"
      >
      <i class="fa-solid fa-cart-plus" style="margin-right: 5px;"></i>
        Add to Cart
      </button>

    </div>
  `).join("");
}

export function renderCategory(foods, categoryFilter, foodList) {

  let activeCategory = null;

  categoryFilter.addEventListener("click", (e) => {
    const btn = e.target.closest(".category-btn");
    if (!btn) return;

    const category = btn.dataset.category;

    let filteredFoods;

    if (activeCategory === category) {
      filteredFoods = foods;
      activeCategory = null;
      btn.classList.remove("active-category");
    } else {
      filteredFoods = foods.filter(food => food.category === category);
      activeCategory = category;

      document.querySelectorAll(".category-btn")
        .forEach(b => b.classList.remove("active-category"));

      btn.classList.add("active-category");
    }

    renderFoods(filteredFoods, foodList);
  });
}

export function renderSearch(searchInputs, foods, foodList) {

  searchInputs.forEach(input => {
    input.addEventListener("input", () => {
      const query = input.value.toLowerCase();

      const filteredFoods = foods.filter(food =>
        food.name.toLowerCase().includes(query)
      );

      if (filteredFoods.length === 0) {
        foodList.innerHTML =
  `<p class="no-food">
      No food found...
   </p>`;
      } else {
        renderFoods(filteredFoods, foodList);
      }

      // keep both inputs in sync
      searchInputs.forEach(i => {
        if (i !== input) i.value = input.value;
      });
    });
  });

}
