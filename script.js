const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let editTodo = null;

const getCurrentTime = () => new Date().getTime();

const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText === "") {
        alert("You must write something in your to-do list.");
        return;
    }

    const startTime = getCurrentTime();

    const li = document.createElement("li");
    const taskContainer = document.createElement("div");

    const p = document.createElement("p");
    p.innerHTML = inputText;
    taskContainer.appendChild(p);

    li.dataset.startTime = startTime;

    const durationElement = document.createElement("span");
    durationElement.textContent = `Duration: 0s`;
    durationElement.classList.add("duration");
    li.appendChild(durationElement);

    const updateDuration = () => {
        const elapsedTime = Math.floor((getCurrentTime() - startTime) / 1000);
        let hours = Math.floor(elapsedTime / 3600);
        let minutes = Math.floor((elapsedTime % 3600) / 60);
        let seconds = elapsedTime % 60;
        durationElement.textContent = `Duration: ${hours}h ${minutes}m ${seconds}s`;
    };

    const durationInterval = setInterval(updateDuration, 1000);

    const completeBtn = document.createElement("button");
    completeBtn.innerText = "Complete";
    completeBtn.classList.add("btn", "completeBtn");
    completeBtn.addEventListener("click", () => {
        clearInterval(durationInterval);
        completeBtn.remove();
    });
    li.appendChild(completeBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    deleteBtn.classList.add("btn", "deleteBtn");
    deleteBtn.addEventListener("click", () => {
        clearInterval(durationInterval);
        deleteLocalTodos(li);
        todoList.removeChild(li);
    });
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    saveLocalTodos(inputText, startTime);
    inputBox.value = "";
};

const saveLocalTodos = (todo, startTime) => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push({ task: todo, startTime: startTime });
    localStorage.setItem("todos", JSON.stringify(todos));
};

const getLocalTodos = () => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(({ task, startTime }) => {
        const li = document.createElement("li");

        const p = document.createElement("p");
        p.innerHTML = task;
        li.appendChild(p);

        li.dataset.startTime = startTime;

        const durationElement = document.createElement("span");
        durationElement.textContent = `Duration: 0s`;
        durationElement.classList.add("duration");
        li.appendChild(durationElement);

        const updateDuration = () => {
            const elapsedTime = Math.floor((getCurrentTime() - startTime) / 1000);
            let hours = Math.floor(elapsedTime / 3600);
            let minutes = Math.floor((elapsedTime % 3600) / 60);
            let seconds = elapsedTime % 60;
            durationElement.textContent = `Duration: ${hours}h ${minutes}m ${seconds}s`;
        };

        const durationInterval = setInterval(updateDuration, 1000);

        const completeBtn = document.createElement("button");
        completeBtn.innerText = "Complete";
        completeBtn.classList.add("btn", "completeBtn");
        completeBtn.addEventListener("click", () => {
            clearInterval(durationInterval);
            completeBtn.remove();
        });
        li.appendChild(completeBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");
        deleteBtn.addEventListener("click", () => {
            clearInterval(durationInterval);
            deleteLocalTodos(li);
            todoList.removeChild(li);
        });
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });
};

const deleteLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    const todoText = todo.children[0].innerHTML;
    todos = todos.filter(t => t.task !== todoText);
    localStorage.setItem("todos", JSON.stringify(todos));
};

document.addEventListener("DOMContentLoaded", getLocalTodos);
addBtn.addEventListener("click", addTodo);
