import { getOrders, getOrdersCount } from "../../modules/api/getData.js"

const loader = document.getElementById("loader");
const orderSearch = document.getElementById('txtsearch');
let allOrders = [];

async function initOrderHistory() {
    await orderHistoryManagement()
    loader.style.display = "none";
}

function searchOrders() {
    const val = orderSearch.value.toLowerCase().trim();

    const filteredOrders = allOrders.filter(order => 
        order.id.toLowerCase().includes(val) ||
        order.status.toLowerCase().includes(val) ||
        order.items.some(item => item.name.toLowerCase().includes(val))
    );
    
    renderOrders(filteredOrders, filteredOrders.length); // <-- fixed here
}

function renderOrders(orders, ordersCount) {
    const tableOrders = document.getElementById('order-history');
    
    const orderRow = orders.length ? orders.map(order => {
        const multipleItems = order.items.length > 1;

        const itemNames = order.items.map(item => multipleItems ? `• ${item.name}` : item.name).join('<br>');
        const itemPrices = order.items.map(item => multipleItems ? `• ₱${item.price}` : `₱${item.price}`).join('<br>');
        const itemQtys   = order.items.map(item => multipleItems ? `• ${item.qty}` : item.qty).join('<br>');

        return `
            <tr>
                <td>${order.id}</td>
                <td>${itemNames}</td>
                <td>${itemPrices}</td>
                <td>${itemQtys}</td>
                <td>${order.total}</td>
                <td>${order.date}</td>
                <td class="actions">
                    <button class="view">View</button>
                    <button class="update">Receipt</button>

                </td>
            </tr>
        `;
    }).join('') : `
        <tr class="countTotal">
            <td colspan="8">No Orders Found.</td>
        </tr>
    `;

    tableOrders.innerHTML = `
        <tr>
            <th>Order ID</th>
            <th>Food</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Date</th>
            <th>Actions</th>
        </tr>
        ${orderRow}
        <tr class="countTotal">
            <td>Total Orders</td>
            <td colspan="5"></td>
            <td>${ordersCount}</td>
        </tr>
    `;
}

async function orderHistoryManagement() {
    const ordersCount = await getOrdersCount();
    allOrders = await getOrders();

    renderOrders(allOrders, ordersCount)
    console.log(allOrders)
}

orderSearch.addEventListener('input', searchOrders); 

document.addEventListener('DOMContentLoaded', () => {
    initOrderHistory();
});
