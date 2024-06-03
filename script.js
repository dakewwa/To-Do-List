// Retrieve todo from local storage or initialize an empty array
let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoDate = document.getElementById("todoDate");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
    addButton.addEventListener("click", addTask);
    todoInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevents default Enter key behavior
            addTask();
        }
    });
    deleteButton.addEventListener("click", () => {
        if (deleteButton.textContent === "Delete All") {
            deleteAllTasks();
        } else {
            deleteSelectedTasks();
        }
    });
    displayTasks();
});

function addTask() {
    const newTask = todoInput.value.trim();
    const taskDate = todoDate.value;
    if (newTask !== "" && taskDate !== "") {
        todo.push({ text: newTask, date: taskDate, disabled: false });
        saveToLocalStorage();
        todoInput.value = "";
        todoDate.value = "";
        displayTasks();
    }
}

function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(todo));
}

function displayTasks() {
    todoList.innerHTML = "";
    todo.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="todo-container">
                <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled ? "checked" : ""}>
                <p id="todo-${index}" class="${item.disabled ? "disabled" : ""}" onclick="editTask(${index})">${item.text}</p>
                <span class="todo-date" onclick="editDate(${index})">${item.date}</span>
            </div>
        `;
        li.querySelector(".todo-checkbox").addEventListener("change", () => toggleTask(index));
        todoList.appendChild(li);
    });
    todoCount.textContent = todo.length;
    updateDeleteButton();
}

function updateDeleteButton() {
    const selectedTasks = todo.filter(item => item.disabled);
    if (todo.length > 0 && selectedTasks.length === 0) {
        deleteButton.textContent = "Delete All";
    } else {
        deleteButton.textContent = "Delete";
    }
}

function toggleTask(index) {
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
    updateDeleteButton(); // добавлено обновление кнопки после изменения выбранной задачи
}


function deleteAllTasks() {
    todo = [];
    saveToLocalStorage();
    displayTasks();
}

function deleteSelectedTasks() {
    todo = todo.filter(item => !item.disabled);
    saveToLocalStorage();
    displayTasks();
}

function editTask(index) {
    const todoItem = document.getElementById(`todo-${index}`);
    const existingText = todo[index].text;
    const inputElement = document.createElement("input");
    inputElement.value = existingText;
    todoItem.replaceWith(inputElement);
    inputElement.focus();

    inputElement.addEventListener("blur", function () {
        const updatedText = inputElement.value.trim();
        if (updatedText) {
            todo[index].text = updatedText;
            saveToLocalStorage();
            displayTasks();
        }
    });
}

function editDate(index) {
    const todoItem = todoList.children[index].querySelector(".todo-date");
    const existingDate = todo[index].date;
    const inputElement = document.createElement("input");
    inputElement.type = "date";
    inputElement.value = existingDate;
    todoItem.replaceWith(inputElement);
    inputElement.focus();

    inputElement.addEventListener("blur", function () {
        const updatedDate = inputElement.value.trim();
        if (updatedDate) {
            todo[index].date = updatedDate;
            saveToLocalStorage();
            displayTasks();
        }
    });
}
