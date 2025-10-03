let tasks = [];
let currentFilter = 'Semua';

function saveTasks() {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

const textInput = document.querySelector('.form input[type="text"]');
const prioritySelect = document.querySelector('.form select:nth-of-type(1)');
const categorySelect = document.querySelector('.form select:nth-of-type(2)');
const dateInput = document.querySelector('.form input[type="date"]');
const addButton = document.querySelector('.form button');
const filterButtons = document.querySelectorAll('.filters button:not(.delete)');
const deleteButton = document.querySelector('.filters .delete');
const tasksContainer = document.querySelector('.tasks');

addButton.addEventListener('click', () => {
    const text = textInput.value.trim();
    const priority = prioritySelect.value;
    const category = categorySelect.value;
    const dueDate = dateInput.value;

    if (!text) {
        alert('Masukkan deskripsi tugas!');
        return;
    }

        const newTask = {
        id: Date.now(),
        text: text,
        priority: priority,
        category: category,
        dueDate: dueDate,
        completed: false
    };


        tasks.unshift(newTask);
    saveTasks();
    renderTasks();

        textInput.value = '';
    prioritySelect.value = 'Normal';
    categorySelect.value = 'Pekerjaan';
    dateInput.value = '';
});