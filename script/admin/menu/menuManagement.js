
import { getMenu, getMenuCount } from "../../modules/api/getData.js"
import { getFirestore, doc, updateDoc, deleteDoc, setDoc, collection, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { firebaseConfig } from "../../config/firebase-config.js";
import { toastSuccess, toastError } from "../../modules/utils/utils.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const loader = document.getElementById("loader");
const menuSearch = document.getElementById('txtsearch');
let allMenu = [];

async function initMenu() {
    await menuTable()
    loader.style.display = "none";
}
async function getNextMenuId() {
    // Fetch the highest existing ID and add 1
    const q = query(collection(db, "menu"), orderBy("id", "desc"), limit(1));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
        const lastId = snapshot.docs[0].data().id;
        return lastId + 1;
    }
    return 11; // start from 11 if no items exist
}
function createMenuModal() {
    const modal = document.createElement("div");
    modal.classList.add("popup-overlay");
    modal.style.display = "flex";

    modal.innerHTML = `
    <div class="popup-field">
        <h4>Add Menu</h4>
        <div class="details-content">
            <p><strong>Name:</strong> <input type="text" id="add-name"></p>
            <p><strong>Category:</strong> <input type="text" id="add-category"></p>
            <p><strong>Price:</strong> <input type="number" id="add-price"></p>
            <p><strong>Image URL:</strong> <input type="text" id="add-img"></p>

            <p><strong>Description (EN):</strong> <input type="text" id="add-desc-en"></p>
            <p><strong>Description (TL):</strong> <input type="text" id="add-desc-tl"></p>

            <p><strong>Tags (comma separated):</strong> <input type="text" id="add-tags"></p>
            <p><strong>Meal Time (comma separated):</strong> <input type="text" id="add-mealTime"></p>
            <p><strong>Diet Type (comma separated):</strong> <input type="text" id="add-dietType"></p>
            <p><strong>Health Tags (comma separated):</strong> <input type="text" id="add-healthTags"></p>

            <p><strong>Calories:</strong> <input type="number" id="add-calories"></p>
            <p><strong>Protein (g):</strong> <input type="number" id="add-protein"></p>
            <p><strong>Carbs (g):</strong> <input type="number" id="add-carbs"></p>
            <p><strong>Fat (g):</strong> <input type="number" id="add-fat"></p>
            <p><strong>Sodium (mg):</strong> <input type="number" id="add-sodium"></p>
            <p><strong>Potassium (mg):</strong> <input type="number" id="add-potassium"></p>
            <p><strong>Sugar (g):</strong> <input type="number" id="add-sugar"></p>
            <p><strong>Fiber (g):</strong> <input type="number" id="add-fiber"></p>

            <p><strong>Vitamin A (mcg):</strong> <input type="number" id="add-vitA"></p>
            <p><strong>Vitamin C (mg):</strong> <input type="number" id="add-vitC"></p>
            <p><strong>Iron (mg):</strong> <input type="number" id="add-iron"></p>
            <p><strong>Calcium (mg):</strong> <input type="number" id="add-calcium"></p>

            <p><strong>Popular:</strong> 
                <input type="checkbox" id="add-popular">
            </p>

            <div class="btnModal">
                <button id="addMenuBtn">Add</button>
                <button id="closeAddMenuBtn">Close</button>
            </div>
        </div>
    </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("addMenuBtn").addEventListener("click", async () => {
        const newMenu = {
            name: document.getElementById("add-name").value.trim(),
            category: document.getElementById("add-category").value.trim(),
            price: Number(document.getElementById("add-price").value),
            img: document.getElementById("add-img").value.trim(),
            description: {
                en: document.getElementById("add-desc-en").value.trim(),
                tl: document.getElementById("add-desc-tl").value.trim()
            },
            tags: document.getElementById("add-tags").value.split(",").map(t => t.trim()).filter(t => t),
            mealTime: document.getElementById("add-mealTime").value.split(",").map(t => t.trim()).filter(t => t),
            dietType: document.getElementById("add-dietType").value.split(",").map(t => t.trim()).filter(t => t),
            healthTags: document.getElementById("add-healthTags").value.split(",").map(t => t.trim()).filter(t => t),
            nutrition: {
                calories: Number(document.getElementById("add-calories").value) || 0,
                protein_g: Number(document.getElementById("add-protein").value) || 0,
                carbs_g: Number(document.getElementById("add-carbs").value) || 0,
                fat_g: Number(document.getElementById("add-fat").value) || 0,
                sodium_mg: Number(document.getElementById("add-sodium").value) || 0,
                potassium_mg: Number(document.getElementById("add-potassium").value) || 0,
                sugar_g: Number(document.getElementById("add-sugar").value) || 0,
                fiber_g: Number(document.getElementById("add-fiber").value) || 0,
                vitamins: {
                    vitaminA_mcg: Number(document.getElementById("add-vitA").value) || 0,
                    vitaminC_mg: Number(document.getElementById("add-vitC").value) || 0,
                    iron_mg: Number(document.getElementById("add-iron").value) || 0,
                    calcium_mg: Number(document.getElementById("add-calcium").value) || 0
                }
            },
            isPopular: document.getElementById("add-popular").checked
        };

        if (!newMenu.name || !newMenu.category || !newMenu.price) {
            toastError("Please fill all required fields");
            return;
        }

        try {
            const nextId = await getNextMenuId();
            newMenu.id = nextId;

            await setDoc(doc(db, "menu", String(nextId)), newMenu);
            toastSuccess("Menu added!");
            modal.remove();
            await menuTable();
        } catch (err) {
            console.error(err);
            toastError("Add failed");
        }
    });

    document.getElementById("closeAddMenuBtn").addEventListener("click", () => modal.remove());
}
function updateMenuModal(menu) {
    const modal = document.createElement("div");
    modal.classList.add("popup-overlay");
    modal.style.display = "flex";

    modal.innerHTML = `
    <div class="popup-field">
        <h4>Edit Menu</h4>
        <div class="details-content">
            <p><strong>Name:</strong> <input type="text" id="edit-name" value="${menu.name}"></p>
            <p><strong>Category:</strong> <input type="text" id="edit-category" value="${menu.category}"></p>
            <p><strong>Price:</strong> <input type="number" id="edit-price" value="${menu.price}"></p>
            <p><strong>Image URL:</strong> <input type="text" id="edit-img" value="${menu.img}"></p>

            <p><strong>Description (EN):</strong> <input type="text" id="edit-desc-en" value="${menu.description?.en || ''}"></p>
            <p><strong>Description (TL):</strong> <input type="text" id="edit-desc-tl" value="${menu.description?.tl || ''}"></p>

            <p><strong>Tags (comma separated):</strong> <input type="text" id="edit-tags" value="${menu.tags?.join(', ') || ''}"></p>
            <p><strong>Meal Time (comma separated):</strong> <input type="text" id="edit-mealTime" value="${menu.mealTime?.join(', ') || ''}"></p>
            <p><strong>Diet Type (comma separated):</strong> <input type="text" id="edit-dietType" value="${menu.dietType?.join(', ') || ''}"></p>
            <p><strong>Health Tags (comma separated):</strong> <input type="text" id="edit-healthTags" value="${menu.healthTags?.join(', ') || ''}"></p>

            <p><strong>Calories:</strong> <input type="number" id="edit-calories" value="${menu.nutrition?.calories || 0}"></p>
            <p><strong>Protein (g):</strong> <input type="number" id="edit-protein" value="${menu.nutrition?.protein_g || 0}"></p>
            <p><strong>Carbs (g):</strong> <input type="number" id="edit-carbs" value="${menu.nutrition?.carbs_g || 0}"></p>
            <p><strong>Fat (g):</strong> <input type="number" id="edit-fat" value="${menu.nutrition?.fat_g || 0}"></p>
            <p><strong>Sodium (mg):</strong> <input type="number" id="edit-sodium" value="${menu.nutrition?.sodium_mg || 0}"></p>
            <p><strong>Potassium (mg):</strong> <input type="number" id="edit-potassium" value="${menu.nutrition?.potassium_mg || 0}"></p>
            <p><strong>Sugar (g):</strong> <input type="number" id="edit-sugar" value="${menu.nutrition?.sugar_g || 0}"></p>
            <p><strong>Fiber (g):</strong> <input type="number" id="edit-fiber" value="${menu.nutrition?.fiber_g || 0}"></p>

            <p><strong>Vitamin A (mcg):</strong> <input type="number" id="edit-vitA" value="${menu.nutrition?.vitamins?.vitaminA_mcg || 0}"></p>
            <p><strong>Vitamin C (mg):</strong> <input type="number" id="edit-vitC" value="${menu.nutrition?.vitamins?.vitaminC_mg || 0}"></p>
            <p><strong>Iron (mg):</strong> <input type="number" id="edit-iron" value="${menu.nutrition?.vitamins?.iron_mg || 0}"></p>
            <p><strong>Calcium (mg):</strong> <input type="number" id="edit-calcium" value="${menu.nutrition?.vitamins?.calcium_mg || 0}"></p>

            <p><strong>Popular:</strong> 
                <input type="checkbox" id="edit-popular" ${menu.isPopular ? "checked" : ""}>
            </p>

            <div class="btnModal">
                <button id="saveMenuBtn">Save</button>
                <button id="closeMenuBtn">Close</button>
            </div>
        </div>
    </div>
    `;

    document.body.appendChild(modal);

    // SAVE CHANGES
    document.getElementById("saveMenuBtn").addEventListener("click", async () => {
        const updatedMenu = {
            name: document.getElementById("edit-name").value.trim(),
            category: document.getElementById("edit-category").value.trim(),
            price: Number(document.getElementById("edit-price").value),
            img: document.getElementById("edit-img").value.trim(),
            description: {
                en: document.getElementById("edit-desc-en").value.trim(),
                tl: document.getElementById("edit-desc-tl").value.trim()
            },
            tags: document.getElementById("edit-tags").value.split(",").map(t => t.trim()).filter(t => t),
            mealTime: document.getElementById("edit-mealTime").value.split(",").map(t => t.trim()).filter(t => t),
            dietType: document.getElementById("edit-dietType").value.split(",").map(t => t.trim()).filter(t => t),
            healthTags: document.getElementById("edit-healthTags").value.split(",").map(t => t.trim()).filter(t => t),
            nutrition: {
                calories: Number(document.getElementById("edit-calories").value) || 0,
                protein_g: Number(document.getElementById("edit-protein").value) || 0,
                carbs_g: Number(document.getElementById("edit-carbs").value) || 0,
                fat_g: Number(document.getElementById("edit-fat").value) || 0,
                sodium_mg: Number(document.getElementById("edit-sodium").value) || 0,
                potassium_mg: Number(document.getElementById("edit-potassium").value) || 0,
                sugar_g: Number(document.getElementById("edit-sugar").value) || 0,
                fiber_g: Number(document.getElementById("edit-fiber").value) || 0,
                vitamins: {
                    vitaminA_mcg: Number(document.getElementById("edit-vitA").value) || 0,
                    vitaminC_mg: Number(document.getElementById("edit-vitC").value) || 0,
                    iron_mg: Number(document.getElementById("edit-iron").value) || 0,
                    calcium_mg: Number(document.getElementById("edit-calcium").value) || 0
                }
            },
            isPopular: document.getElementById("edit-popular").checked
        };

        try {
            const ref = doc(db, "menu", String(menu.id));
            await updateDoc(ref, updatedMenu);
            toastSuccess("Menu updated!");
            modal.remove();
            await menuTable();
        } catch (err) {
            console.error(err);
            toastError("Update failed");
        }
    });

    // CLOSE MODAL
    document.getElementById("closeMenuBtn").addEventListener("click", () => modal.remove());
}

function deleteMenuModal(id) {
    const modal = document.createElement("div");
    modal.classList.add("popup-overlay");
    modal.style.display = "flex";

    modal.innerHTML = `
    <div class="popup-field">
        <h4>Delete Menu</h4>
        <p>Are you sure you want to delete this menu?</p>

        <div class="btnModal">
            <button id="confirmDelete">Yes, Delete</button>
            <button id="cancelDelete">Cancel</button>
        </div>
    </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("confirmDelete").addEventListener("click", async () => {
        try {
            await deleteDoc(doc(db, "menu", String(id)));
            toastSuccess("Menu deleted!");

            modal.remove();
            await menuTable();
        } catch (err) {
            console.error(err);
            toastError("Delete failed");
        }
    });

    document.getElementById("cancelDelete").addEventListener("click", () => {
        modal.remove();
    });
}

function searchMenu() {
    const val = menuSearch.value.toLowerCase().trim();

    const filteredMenu = allMenu.filter(food => {
        const basicMatch = 
            food.name.toLowerCase().includes(val) ||
            food.category.toLowerCase().includes(val) ||
            food.id.toString().includes(val);
      const descMatch =
          food.description?.en?.toLowerCase().includes(val) ||
          food.description?.tl?.toLowerCase().includes(val);
      
      const arrayMatch = 
          food.tags?.some(tag => tag.toLowerCase().includes(val)) ||
          food.mealTime?.some(time => time.toLowerCase().includes(val)) ||
          food.dietType?.some(type => type.toLowerCase().includes(val)) ||
          food.healthTags?.some(tag => tag.toLowerCase().includes(val));

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
              <button class="update" data-id="${food.id}">Update</button>
                <button class="delete" data-id="${food.id}">Delete</button>
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

document.addEventListener("click", (e) => {
    
    if (e.target.closest(".create-btn")) {
        createMenuModal();
        return;
    }
  if (e.target.closest(".update")) {
      const id = e.target.closest(".update").dataset.id;
      const menu = allMenu.find(m => String(m.id) === String(id));
      if (!menu) return;
  
      updateMenuModal(menu);
      return;
  }
  if (e.target.closest(".delete")) {
        const id = e.target.closest(".delete").dataset.id;

        deleteMenuModal(id);
        return;
  }

});
document.addEventListener('DOMContentLoaded', () => {
    initMenu();
});
