const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseDateInput = document.getElementById('expense-date');
const expenseCategoryInput = document.getElementById('expense-category');
const expenseList = document.getElementById('expense-list');

// Retrieve expenses from localStorage or initialize as empty array
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to render the expense list
function renderExpenseList() {
    expenseList.innerHTML = ''; // Clear the current list
    expenses.forEach((expense, index) => {
        const expenseItem = document.createElement('li');
        expenseItem.classList.add('expense-item');
        expenseItem.innerHTML = `
            ${expense.name} - $${expense.amount} (${expense.category}) - ${expense.date}
            <button class="delete-button" data-index="${index}">Delete</button>
        `;
        expenseList.appendChild(expenseItem);
    });

    // Attach delete buttons to the rendered items
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteExpense);
    });
}

// Add expense to the list and save to localStorage
function addExpense(event) {
    event.preventDefault();

    const expenseName = expenseNameInput.value.trim();
    const expenseAmount = parseFloat(expenseAmountInput.value.trim());
    const expenseDate = expenseDateInput.value;
    const expenseCategory = expenseCategoryInput.value;

    if (expenseName && !isNaN(expenseAmount) && expenseAmount > 0 && expenseDate) {
        const expense = {
            name: expenseName,
            amount: expenseAmount,
            date: expenseDate,
            category: expenseCategory
        };

        // Add the new expense to the expenses array
        expenses.push(expense);

        // Save the updated expenses array to localStorage
        localStorage.setItem('expenses', JSON.stringify(expenses));

        // Clear the form fields
        expenseNameInput.value = '';
        expenseAmountInput.value = '';
        expenseDateInput.value = '';

        // Re-render the expense list
        renderExpenseList();
    } else {
        alert("Please fill in all fields with valid values.");
    }
}

// Delete an expense from the list
function deleteExpense(event) {
    const expenseIndex = event.target.dataset.index;
    expenses.splice(expenseIndex, 1); // Remove the expense from the array

    // Update the localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Re-render the expense list
    renderExpenseList();
}

// Initial render of expense list
renderExpenseList();

// Event listener for form submission
expenseForm.addEventListener('submit', addExpense);
