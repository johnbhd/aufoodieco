import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { firebaseConfig } from "../../config/firebase-config.js";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const user = JSON.parse(sessionStorage.getItem("session"));

const ctx = document.getElementById("expenseChart");

async function loadExpenseChart() {
  const q = query(collection(db, "orders"), where("email", "==", user.email));
  const snapshot = await getDocs(q);

  const categoryTotals = {};

  snapshot.docs.forEach(doc => {
    const data = doc.data();

    if (!data.items) return;

    data.items.forEach(item => {
      const category = item.category || "Others";
      const total = Number(item.price || 0) * Number(item.qty || 1);

      if (!categoryTotals[category]) {
        categoryTotals[category] = 0;
      }

      categoryTotals[category] += total;
    });
  });

  const labels = Object.keys(categoryTotals);
  const values = Object.values(categoryTotals);

  renderChart(labels, values);
}

function renderChart(labels, values) {
  new Chart(ctx, {
    type: "pie",
    data: {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            "#4CAF50",
            "#2196F3",
            "#FFC107",
            "#FF5722",
            "#9C27B0",
            "#00BCD4"
          ]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right",
          labels: {
            boxWidth: 15,
            boxHeight: 15
          }
        },
        datalabels: {
          color: "#fff",
          font: {
            weight: "bold",
            size: 14
          },
          formatter: (value, context) => {
            const data = context.chart.data.datasets[0].data;
            const total = data.reduce((a, b) => a + b, 0);
            return ((value / total) * 100).toFixed(1) + "%";
          }
        }
      }
    },
    plugins: [ChartDataLabels]
  });
}

loadExpenseChart();