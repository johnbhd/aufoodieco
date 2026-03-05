const cardDashboard = document.querySelector('.card-dashboard');
const ctx = document.getElementById('myChart').getContext('2d');

const data = [
    { label: "Orders", value: 203, icon: "fa-solid fa-cart-shopping" },
    { label: "Users", value: 20, icon: "fa-solid fa-users" },
    { label: "Menu Items", value: 23, icon: "fa-solid fa-utensils" },
    { label: "Revenue", value: 103, icon: "fa-solid fa-peso-sign" }
];

function dashboardCard() {
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
}

function dashboardCharts() {
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Data',
                data: [0, 30, 20, 35, 60, 90, 140],
                backgroundColor: ['red', 'blue', 'green'],
                fill: true,
                borderColor: '#6b8c07',     // pink line
                backgroundColor: '#38245e',
                tension: 0.2
            }]
        }
    })

}

dashboardCard();
dashboardCharts();