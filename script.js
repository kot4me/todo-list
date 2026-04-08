document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');

    // Функция добавления задачи
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Введите задачу!');
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${escapeHtml(taskText)}</span>
            <button class="delete-btn">✖ Удалить</button>
        `;

        // Удаление задачи
        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            saveTasks(); // сохраним после удаления (пока заглушка)
        });

        taskList.appendChild(li);
        taskInput.value = '';
        saveTasks(); // сохраним (пока заглушка)
    }

    // Простая защита от XSS
    function escapeHtml(str) {
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }

    // Заглушка для сохранения (позже добавим localStorage)
    function saveTasks() {
        console.log('Задачи сохранены (пока только в консоль)');
    }

    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
});