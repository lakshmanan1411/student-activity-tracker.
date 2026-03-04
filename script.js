// LOAD SAVED TASKS ON STARTUP
window.onload = function () {
    let savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        document.getElementById("activityList").innerHTML = savedTasks;
        updateProgress(); // Load aanavudane progress update aaganum
    }
};

// ADD TASK
function addTask() {
    let taskInput = document.getElementById("taskInput").value;
    let dueDate = document.getElementById("dueDate").value;
    let priority = document.getElementById("priorityInput").value;

    if (taskInput === "" || dueDate === "") {
        alert("Please enter task and deadline!");
        return;
    }

    let li = document.createElement("li");

    // Overdue check
    let today = new Date().toISOString().split("T")[0];
    let dateStyle = (dueDate < today) ? 'style="color: red; font-weight: bold;"' : '';

    // Create Task HTML inside the list item
    li.innerHTML = `
        <span class="task-text">
            ${taskInput} <span ${dateStyle}>📅 ${dueDate}</span> 
            <span class="priority">${priority}</span>
        </span>
        <div class="action-btns">
            <button onclick="markComplete(this)">✔️</button>
            <button onclick="deleteTask(this)">❌</button>
        </div>
    `;

    document.getElementById("activityList").appendChild(li);

    // Clear inputs after adding
    document.getElementById("taskInput").value = "";
    document.getElementById("dueDate").value = "";

    updateProgress();
    saveTasks();
}

// DELETE TASK
function deleteTask(button) {
    let li = button.parentElement.parentElement;
    li.remove();
    updateProgress();
    saveTasks();
}

// MARK AS COMPLETE
function markComplete(button) {
    let li = button.parentElement.parentElement;
    li.classList.toggle("completed"); 
    updateProgress();
    saveTasks();
}

// SEARCH FUNCTION
function searchTask() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let tasks = document.getElementsByTagName("li");

    for (let i = 0; i < tasks.length; i++) {
        let text = tasks[i].querySelector(".task-text").innerText.toLowerCase();

        if (text.includes(input)) {
            tasks[i].style.display = "flex";
        } else {
            tasks[i].style.display = "none";
        }
    }
}

// FILTER TASKS
function filterTasks(status) {
    let tasks = document.getElementsByTagName("li");

    for (let i = 0; i < tasks.length; i++) {
        let isCompleted = tasks[i].classList.contains("completed");

        if (status === "all") {
            tasks[i].style.display = "flex";
        } else if (status === "completed" && isCompleted) {
            tasks[i].style.display = "flex";
        } else if (status === "pending" && !isCompleted) {
            tasks[i].style.display = "flex";
        } else {
            tasks[i].style.display = "none";
        }
    }
}

// UPDATE PROGRESS BAR
function updateProgress() {
    let tasks = document.getElementsByTagName("li");
    let totalTasks = tasks.length;
    let completedTasks = document.getElementsByClassName("completed").length;

    let progressText = document.getElementById("progressText");
    let progressFill = document.getElementById("progressFill");

    progressText.innerText = `${completedTasks} out of ${totalTasks} completed`;

    let percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    progressFill.style.width = percentage + "%";
}

// SAVE TO LOCAL STORAGE
function saveTasks() {
    localStorage.setItem("tasks", document.getElementById("activityList").innerHTML);
}

// DARK MODE TOGGLE
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}
