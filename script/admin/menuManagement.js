
import { FoodData } from "../modules/food/food.js";

function menuTable() {
  const table = document.getElementById("menu-management");
  const foods = FoodData();
  let rows = "";
  
  foods.forEach(food => {
     rows += ` 
    <tr>
        <td>${food.id}</td>
        <td><img src="../${food.img}" width="50"></td>
        <td>${food.name}</td>
        <td>${food.category}</td>
        <td>₱${food.price}</td>
        <td class="actions">
          <button class="update">Update</button>
          <button class="delete">Delete</button>
        </td>
      </tr>` ;
  })
  
  table.innerHTML = ` 
    <tr>
      <th>ID</th>
      <th>Image</th>
      <th>Name</th>
      <th>Category</th>
      <th>Price</th>
      <th>Actions</th>
    </tr>
    ${rows}
  `;
}
menuTable();
console.log("hello")