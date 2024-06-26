const columns = document.querySelectorAll('.column');

// Function to load tasks from local storage on page load
const loadTasksFromLocalStorage = () => {
    columns.forEach(column => {
        const columnId = column.id;
        const tasks = JSON.parse(localStorage.getItem(columnId)) || [];
        tasks.forEach(task => {
            const ticket = createTicket(task);
            column.insertBefore(ticket, column.querySelector('form'));
        });
        adjustColumnHeight(column);
    });
};

// Function to save tasks to local storage
const saveTasksToLocalStorage = (columnId, tasks) => {
    localStorage.setItem(columnId, JSON.stringify(tasks));
};

const addTask = (event) => {
    event.preventDefault();
    const currentForm = event.target;
    const value = currentForm.elements[0].value;
    const parentColumn = currentForm.parentElement;
    const ticket = createTicket(value);

    parentColumn.insertBefore(ticket, currentForm);

    // Save tasks to local storage
    const columnId = parentColumn.id;
    const tasks = JSON.parse(localStorage.getItem(columnId)) || [];
    tasks.push(value);
    saveTasksToLocalStorage(columnId, tasks);

    // Adjust column height
    adjustColumnHeight(parentColumn);

    currentForm.reset();
};

columns.forEach(column => {
    const form = column.querySelector('form');
    form.addEventListener("submit", addTask);
});

const createTicket = (value) => {
    const ticket = document.createElement("p");
    const elementText = document.createTextNode(value);
    ticket.setAttribute("draggable", "true");
    ticket.appendChild(elementText);

    return ticket;
};

const adjustColumnHeight = (column) => {
    const tickets = column.querySelectorAll('p');
    const columnHeight = (tickets.length + 1) * 30; // Adjust the height calculation based on your needs
    column.style.minHeight = columnHeight + 'px';
};

// Load tasks from local storage when the page loads
window.addEventListener('load', loadTasksFromLocalStorage);
