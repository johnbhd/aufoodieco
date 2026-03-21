export function foodImportAll(foodArray) {
  if (!Array.isArray(foodArray)) {
    console.error("foodImportAll expects an array");
    return;
  }

  localStorage.setItem("foods", JSON.stringify(foodArray));
}

export function addToCart(id) {
  const foods = JSON.parse(localStorage.getItem("foods")) || [];
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const food = foods.find(item => item.id === id);
  if (!food) return;

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: food.id,
      name: food.name,
      category: food.category,
      price: food.price,
      img: food.img,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}
