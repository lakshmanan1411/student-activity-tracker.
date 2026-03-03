let currentFilter = "all";
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save to LocalStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add Task (with Priority)
function addTask() {
    const input = document.getElementById("taskInput");
    const priority = document.getElementById("priorityInput").value;
    const taskText = input.value.trim();

    if (taskText === "") return;

    tasks.push({
        text: taskText,
        completed: false,
        priority: priority
    });

    input.value = "";
    saveTasks();
    renderTasks();
}

// Toggle Complete
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Render Tasks
function renderTasks() {
    const list = document.getElementById("activityList");
    list.innerHTML = "";

    let completedCount = 0;

    tasks.forEach((task, index) => {

        if (task.completed) completedCount++;

        if (
            currentFilter === "completed" && !task.completed ||
            currentFilter === "pending" && task.completed
        ) {
            return;
        }

        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        li.innerHTML = `
            <span onclick="toggleTask(${index})">${task.text}</span>
            <span class="priority ${task.priority}">${task.priority}</span>
            <button onclick="deleteTask(${index})">❌</button>
        `;

        list.appendChild(li);
    });

    updateProgress(completedCount);
}

// Update Progress
function updateProgress(completedCount) {
    const total = tasks.length;
    const progressText = document.getElementById("progressText");
    const progressFill = document.getElementById("progressFill");

    progressText.textContent = `${completedCount} out of ${total} completed`;

    const percent = total === 0 ? 0 : (completedCount / total) * 100;
    progressFill.style.width = percent + "%";
}

// Filter
function filterTasks(filter) {
    currentFilter = filter;
    renderTasks();
}

// Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark");

    const btn = document.getElementById("darkBtn");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        btn.textContent = "☀ Light Mode";
    } else {
        localStorage.setItem("theme", "light");
        btn.textContent = "🌙 Dark Mode";
    }
}

// Load Theme on Start
document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("darkBtn");

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        btn.textContent = "☀ Light Mode";
    }

    renderTasks();
});



