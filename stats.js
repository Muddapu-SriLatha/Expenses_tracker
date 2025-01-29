const totalAmountElement = document.getElementById('total-amount');
const expenseChartCanvas = document.getElementById('expense-chart').getContext('2d');

// Retrieve expenses from localStorage
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Initialize Chart.js
const expenseChart = new Chart(expenseChartCanvas, {
    type: 'pie',
    data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: ['#FF9999', '#66B3FF', '#99FF99', '#FFCC99', '#FFB3E6'],
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    }
});

// Update category-wise chart and total
function updateChartAndTotal() {
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalAmountElement.textContent = totalAmount.toFixed(2);

    const categoryTotals = expenses.reduce((acc, expense) => {
        if (acc[expense.category]) {
            acc[expense.category] += expense.amount;
        } else {
            acc[expense.category] = expense.amount;
        }
        return acc;
    }, {});

    expenseChart.data.labels = Object.keys(categoryTotals);
    expenseChart.data.datasets[0].data = Object.values(categoryTotals);
    expenseChart.update();
}

// Initial update of chart and total
updateChartAndTotal();
