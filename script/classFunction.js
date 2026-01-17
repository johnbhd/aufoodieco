export function renderFoods(list, foodList) {
  if (!foodList) return; // safeguard

  foodList.innerHTML = list.map(food => `
    <div class="bg-[#1E1D27] rounded-lg p-5 h-[220px] flex flex-col justify-between gap-3">
      <div class="h-34 rounded-md overflow-hidden">
        <img src="${food.img}" alt="${food.name}" class="w-full h-full object-cover">
      </div>

      <div class="space-y-1">
        <h4 class="font-semibold text-sm">${food.name}</h4>
        <p class="text-xs text-gray-300">₱${food.price}</p>
      </div>

      <button 
        class="w-full py-1.5 rounded bg-red-600 text-white text-xs hover:bg-red-500/80"
        data-id="${food.id}"
      >
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
      btn.classList.remove("bg-red-600");
    } else {
      filteredFoods = foods.filter(food => food.category === category);
      activeCategory = category;

      document.querySelectorAll(".category-btn").forEach(b => 
        b.classList.remove("bg-red-600")
      );
      btn.classList.add("bg-red-600");
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
          `<p class="text-gray-400 text-center col-span-full text-xl mt-5">
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
