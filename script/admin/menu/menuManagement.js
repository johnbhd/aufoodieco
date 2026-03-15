
import { getMenu, getMenuCount } from "../../modules/api/getData.js"

const loader = document.getElementById("loader");
const menuSearch = document.getElementById('txtsearch');
let allMenu = [];

async function initMenu() {
    await menuTable()
    loader.style.display = "none";
}

function searchMenu() {
    const val = menuSearch.value.toLowerCase().trim();

    const filteredMenu = allMenu.filter(food => {
        const basicMatch = 
            food.name.toLowerCase().includes(val) ||
            food.category.toLowerCase().includes(val) ||
            food.id.toString().includes(val);

        const descMatch =
            food.description.en.toLowerCase().includes(val) ||
            food.description.tl.toLowerCase().includes(val);

        const arrayMatch = 
            food.tags.some(tag => tag.toLowerCase().includes(val)) ||
            food.mealTime.some(time => time.toLowerCase().includes(val)) ||
            food.dietType.some(type => type.toLowerCase().includes(val)) ||
            food.healthTags.some(tag => tag.toLowerCase().includes(val));

        return basicMatch || descMatch || arrayMatch;
    });
    
    renderMenu(filteredMenu, filteredMenu.length)
}

function renderMenu(allMenu, menuCount) {
  const tableMenu = document.getElementById("menu-management");
  
  const menuRow = allMenu.length ? allMenu.map((food, index) => {
      return `
        <tr>
            <td>${index + 1}</td>
            <td><img src="../${food.img}" class="menuImg"></td>
            <td>${food.name}</td>
            <td>${food.category}</td>
            <td>₱${food.price}</td>
            <td class="actions">
              <button class="update">Update</button>
              <button class="delete">Delete</button>
            </td>
          </tr>` ;
      }).join("") : `
            <tr class="countTotal">
            <td colspan="6">No Menu Found.</td>
        </tr>`;
  
  tableMenu.innerHTML = ` 
    <tr>
      <th>No.</th>
      <th>Image</th>
      <th>Name</th>
      <th>Category</th>
      <th>Price</th>
      <th>Actions</th>
    </tr>
    ${menuRow}
    <tr class="countTotal">
          <td>Total Menu</td>
          <td colspan="4"></td>
          <td>${menuCount}</td>
      </tr>
  `;
}

async function menuTable() {
  const menuCount = await getMenuCount();
  allMenu = await getMenu();

  renderMenu(allMenu, menuCount);

}

menuSearch.addEventListener('input', searchMenu); 

document.addEventListener('DOMContentLoaded', () => {
    initMenu();
});
