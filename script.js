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

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderTasks();
    });
});

deleteButton.addEventListener('click', () => {
    if (confirm('Hapus semua tugas yang sudah selesai?')) {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
    }
});

function renderTasks() {
    tasksContainer.innerHTML = '';

        let filteredTasks = tasks;
    const today = new Date().toISOString().split('T')[0];

    switch (currentFilter) {
        case 'Semua':
            filteredTasks = tasks;
            break;
        case 'Aktif':
            filteredTasks = tasks.filter(task => !task.completed);
            break;
        case 'Hari Ini':
            filteredTasks = tasks.filter(task => task.dueDate === today);
            break;
        case 'Prioritas Tinggi':
            filteredTasks = tasks.filter(task => task.priority === 'Urgent');
            break;
        default:
            filteredTasks = tasks;
    }

        if (filteredTasks.length === 0) {
        // Show no tasks message
        tasksContainer.innerHTML = `
            <p>Tidak memiliki tugas</p>
            <small>Tambahkan tugas baru</small>
        `;
        return;
    }

        filteredTasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.style.cssText = 'display: flex; align-items: center; padding: 10px; border-bottom: 1px solid #eee; gap: 10px;';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });