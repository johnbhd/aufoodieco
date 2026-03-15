import { getOrders, getUserCount, getOrdersCount, getSales, getMenuCount } from "../../modules/api/getData.js"

const loader = document.getElementById("loader");

async function initDashboard(){
    await recentOrders();
    dashboardCard()
    dashboardCharts();
    loader.style.display = "none";
}

async function chartSales() {
    const sales = await getSales();
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dailySales = Array(daysInMonth).fill(0);
    sales.forEach(order => {
        const orderDate = new Date(order.date);
        if (orderDate.getMonth() === month && orderDate.getFullYear() === year) {
            dailySales[orderDate.getDate() - 1] += order.total;
        }
    });
    return dailySales;
}


const cardDashboard = document.querySelector('.card-dashboard');
const recentWrapper = document.querySelector('.recent-wrapper');
const ctx = document.getElementById('myChart').getContext('2d');


async function dashboardCard() {
    const userCount = await getUserCount();
    const menuCount = await getMenuCount();
    const ordersCount = await getOrdersCount();
    
    const sales = await getSales();
    
    const totalSale = sales.reduce((sum, sale) => sum + sale.total, 0);
    const formattedTotal = totalSale.toFixed(2);

    const data = [
        { label: "Orders", value: ordersCount || 0, icon: "fa-solid fa-cart-shopping" },
        { label: "Users", value: userCount || 0, icon: "fa-solid fa-users" },
        { label: "Menu Items", value: menuCount || 0, icon: "fa-solid fa-utensils" },
        { label: "Revenue", value: formattedTotal || 0, icon: "fa-solid fa-peso-sign" }
    ];

    cardDashboard.innerHTML = data.map((item) => `
        <div class="card">
            <div class="card-title">
                <h4>${item.label}</h4>
                <p>${item.value}</p>
            </div>
            <div class="card-icon">
                <i class="${item.icon}"></i>
            </div>
        </div>
    `).join('');

    dashboardCharts();
   
}

async function dashboardCharts() {
    const ctx = document.getElementById("myChart");
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const labels = [];
    for (let i = 1; i <= daysInMonth; i++) labels.push(i);
    const dailySales = await chartSales();
    if (window.salesChart) window.salesChart.destroy();
    window.salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'This Month Sales',
                data: dailySales,
                   backgroundColor: ['red', 'blue', 'green'],
                fill: true,
                borderColor: '#6b8c07',     // pink line
                backgroundColor: '#38245e',
                tension: 0.2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

async function recentOrders() {
    const orders = await getOrders();
    console.log(orders)

    const oneHourAgo = Date.now() - (60 * 60 * 1000);

    const filteredOrders = orders.filter(order => {
        const orderTime = new Date(order.date).getTime();
        return orderTime >= oneHourAgo;
    });

    const recentOrdersDiv = filteredOrders.length ?
        filteredOrders.map(order => {
        
            const itemsHTML = order.items
                .map(item => `${item.name} <span>(${item.qty}x)</span>`)
                .join("<br>");

            return `
                <div class="orders-card">
                    <span>${order.id || "#234242"}</span>
                    <span>${itemsHTML}</span>
                    <span class="status-${order.status || "pending"}">${order.status || "pending"}</span>
                    <span>${order.date || "1/2/23"}</span>
                </div>
            `;
    }).join("") : `<div style="text-align: center;">No Orders for the previous 1 hour</div>`;

    recentWrapper.innerHTML = `
        <div class="recent-header">
            <span>Order Id</span>
            <span>Items</span>
            <span>Status</span>
            <span>Time</span>
        </div>
        <div class="recent-orders">
            ${recentOrdersDiv}
        </div>
    
    `
}


initDashboard();