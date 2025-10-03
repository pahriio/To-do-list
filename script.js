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

                const textSpan = document.createElement('span');
        textSpan.textContent = task.text;
        textSpan.style.flex = '1';
        if (task.completed) {
            textSpan.style.textDecoration = 'line-through';
            textSpan.style.opacity = '0.6';
        }

        const prioritySpan = document.createElement('span');
        prioritySpan.textContent = `Prioritas: ${task.priority}`;
        prioritySpan.style.fontSize = '12px';
        prioritySpan.style.color = task.priority === 'Urgent' ? 'red' : task.priority === 'Medium' ? 'orange' : 'green';
        prioritySpan.style.background = '#f0f0f0';
        prioritySpan.style.padding = '2px 6px';
        prioritySpan.style.borderRadius = '4px';

        const categorySpan = document.createElement('span');
        categorySpan.textContent = `Kategori: ${task.category}`;
        categorySpan.style.fontSize = '12px';
        categorySpan.style.background = '#f0f0f0';
        categorySpan.style.padding = '2px 6px';
        categorySpan.style.borderRadius = '4px';

                const dateSpan = document.createElement('span');
        dateSpan.textContent = task.dueDate ? `Jatuh tempo: ${task.dueDate}` : 'Tidak ada tanggal';
        dateSpan.style.fontSize = '12px';
        dateSpan.style.color = task.dueDate === today ? 'red' : '#666';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Hapus';
        deleteBtn.style.background = 'red';
        deleteBtn.style.color = 'white';
        deleteBtn.style.border = 'none';
        deleteBtn.style.padding = '4px 8px';
        deleteBtn.style.borderRadius = '4px';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.addEventListener('click', () => {
            if (confirm('Hapus tugas ini?')) {
                tasks = tasks.filter(t => t.id !== task.id);
                saveTasks();
                renderTasks();
            }
        });

        // Append elements to taskDiv
        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(textSpan);
        taskDiv.appendChild(prioritySpan);
        taskDiv.appendChild(categorySpan);
        taskDiv.appendChild(dateSpan);
        taskDiv.appendChild(deleteBtn);

        tasksContainer.appendChild(taskDiv);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    renderTasks();

    // Set default active filter button
    const allButton = document.querySelector('.filters button');
    if (allButton) {
        allButton.classList.add('active');
    }

    // Set default date to today
    dateInput.value = new Date().toISOString().split('T')[0];
});
