const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");

if (localStorage.getItem("todoItems") === null) {
  let todoItems = [];
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
  var tempID = -1;
  localStorage.setItem("ID", JSON.stringify(tempID));
}

document.addEventListener("DOMContentLoaded", getLocal);

todoButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (todoInput.value != "") {
    tempID = JSON.parse(localStorage.getItem("ID"));
    tempID++;
    const newTodoDiv = document.createElement("div");
    newTodoDiv.classList.add("todo-list-item");
    const newTodoLi = document.createElement("li");
    newTodoLi.classList.add("todo-value");
    newTodoLi.innerText = todoInput.value;
    newTodoDiv.appendChild(newTodoLi);
    let todoAdded = {
      id: tempID,
      input: todoInput.value,
      checked: 0,
    };
    //SAVE TO LOCALSTORAGE
    saveLocal(todoAdded);
    newTodoDiv.setAttribute("id", tempID.toString());
    localStorage.setItem("ID", JSON.stringify(tempID));

    const completedButton = document.createElement("button");
    completedButton.classList.add("comp-btn");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    newTodoDiv.appendChild(completedButton);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("del-btn");
    deleteButton.innerHTML = `<i class="fas fa-trash">`;
    newTodoDiv.appendChild(deleteButton);

    todoList.appendChild(newTodoDiv);
    todoInput.value = "";
  }
});

todoList.addEventListener("click", (e) => {
  console.log(e.target);
  const item = e.target;

  //Completed Button
  if (item.classList.contains("comp-btn")) {
    checkedFunc(item);
  }
  //Delete Button
  if (item.classList.contains("del-btn")) {
    deleteFunc(item);
  }
});

function checkedFunc(a) {
  const thisToDo = a.parentElement;
  thisToDo.classList.toggle("completed");
  todoItems = JSON.parse(localStorage.getItem("todoItems"));
  if (thisToDo.classList.contains("completed")) {
    for (let i = 0; i < todoItems.length; i++) {
      if (todoItems[i].id == parseFloat(thisToDo.getAttribute("id"))) {
        todoItems[i].checked = 1;
        break;
      }
    }
  } else {
    for (let i = 0; i < todoItems.length; i++) {
      if (todoItems[i].id == parseFloat(thisToDo.getAttribute("id"))) {
        todoItems[i].checked = 0;
        break;
      }
    }
  }
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
}
function deleteFunc(a) {
  const thisToDo = a.parentElement;
  thisToDo.classList.add("fallOff");
  thisToDo.addEventListener("transitionend", () => {
    const Index = parseFloat(thisToDo.getAttribute("id"));
    todoItems = JSON.parse(localStorage.getItem("todoItems"));
    for (let i = 0; i < todoItems.length; i++) {
      if (Index == todoItems[i].id) {
        todoItems.splice(todoItems.indexOf(todoItems[i]), 1);
      }
    }
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
    thisToDo.remove();
  });
}

function saveLocal(todoAdded) {
  todoItems = JSON.parse(localStorage.getItem("todoItems"));
  todoItems.push(todoAdded);
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
}

function getLocal() {
  todoItems = JSON.parse(localStorage.getItem("todoItems"));
  console.log(todoItems);
  for (let i = 0; i < todoItems.length; i++) {
    const newTodoDiv = document.createElement("div");
    newTodoDiv.classList.add("todo-list-item");
    const newTodoLi = document.createElement("li");
    newTodoLi.classList.add("todo-value");
    newTodoLi.innerText = todoItems[i].input;
    newTodoDiv.appendChild(newTodoLi);
    newTodoDiv.setAttribute("id", todoItems[i].id);
    if (todoItems[i].checked == 1) {
      newTodoDiv.classList.add("completed");
    }

    const completedButton = document.createElement("button");
    completedButton.classList.add("comp-btn");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    newTodoDiv.appendChild(completedButton);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("del-btn");
    deleteButton.innerHTML = `<i class="fas fa-trash">`;
    newTodoDiv.appendChild(deleteButton);

    todoList.appendChild(newTodoDiv);
  }
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
}
