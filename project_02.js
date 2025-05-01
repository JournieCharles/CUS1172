document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskList = document.getElementById("task-list");
    let tasks = [];

    taskForm.onsubmit = function(event) {
        event.preventDefault();

        const taskTitle = document.getElementById("task-title").value.trim();
        const taskPriority = document.getElementById("task-priority").value;
        const taskStatus = document.querySelector("input[name='task-status']:checked").value;

        if (taskTitle === "") return;

        const task = {title: taskTitle, priority: taskPriority, status: taskStatus, completed: false };
        tasks.push(task);
        renderTasks();
        taskForm.requestFullscreen();

    };

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";

            if (task.completed) {
                li.style.textDecoration = "list-through";
            }
            li.innerHTML = `
            ${task.title} - <span class="bage bg-primary">${task.priority}</span> - ${task.status}
            <div>
                <button class="btn btn-success btn-sm complete-btn">Mark Complete</button>
                <button class="btn btn-danger btn-sm remove-btn"> Remove</button>
            </div>
            `;
            li.querySelector(".complete-btn").onclick = () => {
                task.completed = !task.completed;
                renderTasks();
            };
            li.querySelector(".remove-btn").onclick = () => {
                tasks.splice(index, 1);
                renderTasks();
            }
        })
    }
})