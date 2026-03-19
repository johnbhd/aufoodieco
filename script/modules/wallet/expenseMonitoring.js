const ctx = document.getElementById("expenseChart");

new Chart(ctx, {
  type: "pie",

  data: {
    labels: ["Foods", "Drinks", "Snacks", "Others"],
    datasets: [{
      data: [500, 300, 200, 100],
      backgroundColor: [
        "#4CAF50",
        "#2196F3",
        "#FFC107",
        "#FF5722"
      ]
    }]
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

          const percentage = ((value / total) * 100).toFixed(1) + "%";

          return percentage;
        }
      }

    }
  },

  plugins: [ChartDataLabels]
});