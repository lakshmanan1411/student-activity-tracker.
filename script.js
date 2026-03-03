let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") return;

    tasks.push({ text: taskText, completed: false });
    input.value = "";
    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById("activityList");
    list.innerHTML = "";

    let completedCount = 0;

    tasks.forEach((task, index) => {
        if (task.completed) completedCount++;

        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        li.innerHTML = `
            <span onclick="toggleTask(${index})">${task.text}</span>
            <button onclick="deleteTask(${index})">❌</button>
        `;

        list.appendChild(li);
    });

    updateProgress(completedCount);
}

function updateProgress(completedCount) {
    const total = tasks.length;
    const progressText = document.getElementById("progressText");
    const progressFill = document.getElementById("progressFill");

    progressText.textContent = `${completedCount} out of ${total} completed`;

    const percent = total === 0 ? 0 : (completedCount / total) * 100;
    progressFill.style.width = percent + "%";
}

renderTasks();