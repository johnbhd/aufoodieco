// Columns
const newOrdersDiv = document.getElementById("new-orders");
const preparingDiv = document.getElementById("preparing-orders");
const readyDiv = document.getElementById("ready-orders");
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

// Load and render orders
function renderOrders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  newOrdersDiv.innerHTML = "";
  preparingDiv.innerHTML = "";
  readyDiv.innerHTML = "";

  orders.forEach(order => {
    const orderCard = document.createElement("div");
    orderCard.className = "bg-gray-200 rounded p-3 flex flex-col gap-2 shadow";
    orderCard.innerHTML = `
      <div class="flex justify-between items-center">
        <span class="font-semibold text-red-700">#${order.id}</span>
        <span class="text-sm text-gray-600">${order.date}</span>
      </div>
      <ul class="text-sm text-black list-disc list-inside">
        ${order.items.map(item => `<li>${item.name} (${item.qty}x)</li>`).join("")}
      </ul>

      <div class="mt-2 flex gap-2">
        ${
          order.status === "new"
            ? `<button class="move-btn bg-yellow-400 text-black px-2 py-1 rounded" data-id="${order.id}" data-next="preparing">Move to Preparing</button>`
            : order.status === "preparing"
            ? `<button class="move-btn bg-green-400 text-black px-2 py-1 rounded" data-id="${order.id}" data-next="ready">Move to Ready</button>`
            : ""
        }
      </div>
    `;

    if (order.status === "new") newOrdersDiv.appendChild(orderCard);
    else if (order.status === "preparing") preparingDiv.appendChild(orderCard);
    else if (order.status === "ready") readyDiv.appendChild(orderCard);
  });
}

// Move order to next stage
document.addEventListener("click", e => {
  const btn = e.target.closest(".move-btn");
  if (!btn) return;

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const id = Number(btn.dataset.id);
  const nextStatus = btn.dataset.next;

  const updatedOrders = orders.map(order => {
    if (order.id === id) order.status = nextStatus;
    return order;
  });

  localStorage.setItem("orders", JSON.stringify(updatedOrders));
  renderOrders();
});

// Initial render
renderOrders();
