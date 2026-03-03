// ADD TASK
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let dueDate = document.getElementById("dueDate").value;

    if (taskInput.value === "" || dueDate === "") {
        alert("Please enter task and deadline!");
        return;
    }

    let li = document.createElement("li");

    // Overdue check
    let today = new Date().toISOString().split("T")[0];

    if (dueDate < today) {
        li.style.color = "red";
    }

    li.innerHTML = `${taskInput.value} 📅 ${dueDate}`;

    document.getElementById("activityList").appendChild(li);

    taskInput.value = "";
    document.getElementById("dueDate").value = "";

    saveTasks();
}


// SEARCH FUNCTION
function searchTask() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let tasks = document.getElementsByTagName("li");

    for (let i = 0; i < tasks.length; i++) {
        let text = tasks[i].innerText.toLowerCase();

        if (text.includes(input)) {
            tasks[i].style.display = "flex";
        } else {
            tasks[i].style.display = "none";
        }
    }
}


// SAVE TO LOCAL STORAGE
function saveTasks() {
    localStorage.setItem("tasks", document.getElementById("activityList").innerHTML);
}


// LOAD SAVED TASKS
window.onload = function () {
    let savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        document.getElementById("activityList").innerHTML = savedTasks;
    }
};


// DARK MODE
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}
