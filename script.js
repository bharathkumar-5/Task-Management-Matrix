const categories = {
    'urgent-important': 'Urgent and Important',
    'important-not-urgent': 'Important but Not Urgent',
    'urgent-not-important': 'Urgent but Not Important',
    'neither-urgent-nor-important': 'Neither Urgent nor Important'
};

function initializePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const todoApp = document.getElementById('todo-app');
    const landingPage = document.getElementById('landing-page');
    const sectionTitle = document.getElementById('section-title');
    const taskList = document.getElementById('task-list');
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');

    if (category && categories[category]) {
        landingPage.style.display = 'none';
        todoApp.style.display = 'flex';
        sectionTitle.textContent = categories[category];
        
        // Load tasks from local storage
        taskList.innerHTML = localStorage.getItem(`tasks-${category}`) || '';

        function saveTasks() {
            localStorage.setItem(`tasks-${category}`, taskList.innerHTML);
        }

        // Event listener for adding tasks
        addTaskBtn.addEventListener('click', function () {
            const taskText = taskInput.value.trim();
            if (taskText) {
                const li = document.createElement('li');
                li.textContent = taskText;
                const span = document.createElement('span');
                span.textContent = '×';
                span.addEventListener('click', function() {
                    li.remove();
                    saveTasks();
                });
                li.appendChild(span);
                taskList.appendChild(li);
                taskInput.value = '';
                saveTasks();
            }
        });

        // Event listener for marking tasks as checked or deleting
        document.querySelector('.matrix-section').addEventListener('click', function (e) {
            if (e.target.tagName === 'LI') {
                e.target.classList.toggle('checked');
                saveTasks();
            }
        });

    } else {
        todoApp.style.display = 'none';
        landingPage.style.display = 'grid';
    }
}

document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('click', function () {
        const category = this.getAttribute('data-category');
        window.location.search = `?category=${category}`;
    });
});

initializePage();