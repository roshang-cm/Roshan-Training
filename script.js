let todoListStateStack = [[]];
let hideUndoTimer = null;

//Data functions

function addToDo(todoText) {
  let todoList = todoListStateStack[todoListStateStack.length - 1].slice();
  let todo = {};
  todo.title = todoText;
  todo.id = todoList.length;
  todoList.push(todo);
  todoListStateStack.push(todoList);
  buildToDoList();
}

function deleteToDo(todoId) {
  if (hideUndoTimer) {
    clearInterval(hideUndoTimer);
  }
  let todoList = todoListStateStack[todoListStateStack.length - 1].slice();
  let newTodoList = [];
  todoList.forEach(todo => {
    if (todo.id != todoId) {
      newTodoList.push(todo);
    }
  });
  todoListStateStack.push(newTodoList);
  buildToDoList();
  undoChangesElement.style.display = "block";
  hideUndoTimer = setInterval(() => {
    undoChangesElement.style.display = "none";
  }, 3000);
}

function undoChange() {
  if (todoListStateStack.length != 0) {
    todoListStateStack.pop();
  }
  buildToDoList();
}

//Builders

function buildListElement(todo) {
  let listItem = document.createElement("li");
  let listItemContent = document.createElement("div");
  listItemContent.classList.add("list-container");
  let listItemTitle = document.createElement("b");
  let deleteItemButton = document.createElement("button");
  let deleteIcon = document.createElement("i");
  deleteIcon.innerText = "delete_outline";
  deleteIcon.classList.add("material-icons");
  deleteItemButton.appendChild(deleteIcon);
  deleteItemButton.classList.add("deleteButton");
  deleteItemButton.addEventListener("click", index => {
    deleteToDo(todo.id);
  });
  listItemTitle.innerText = todo.title;
  listItemContent.appendChild(listItemTitle);
  listItemContent.appendChild(deleteItemButton);
  listItem.appendChild(listItemContent);
  return listItem;
}

function buildToDoList() {
  console.log(todoListStateStack);
  while (listContainerElement.lastElementChild) {
    listContainerElement.removeChild(listContainerElement.lastElementChild);
  }
  let todoList = todoListStateStack[todoListStateStack.length - 1];
  todoList.forEach(todo => {
    listContainerElement.appendChild(buildListElement(todo));
  });
}

//Setting up the initial layout

const titleElement = document.createElement("h1");
const userInputElement = document.createElement("input");
const submitButtonElement = document.createElement("button");
const formElement = document.createElement("div");
const listContainerElement = document.createElement("ul");
const undoChangesElement = document.createElement("button");
undoChangesElement.innerText = "Undo Changes";
undoChangesElement.style.display = "none";
undoChangesElement.addEventListener("click", () => {
  undoChange();
  undoChangesElement.style.display = "none";
});
titleElement.innerText = "To-Do list using JS";
userInputElement.setAttribute("type", "text");
userInputElement.setAttribute("placeholder", "Type something here");
userInputElement.setAttribute("required", true);
userInputElement.addEventListener("keyup", keyUpEvent => {
  if (keyUpEvent.key == "Enter") {
    submitButtonElement.click();
  }
});
submitButtonElement.setAttribute("type", "button");
submitButtonElement.innerText = "Add To-Do";
submitButtonElement.addEventListener("click", () => {
  if (userInputElement.value) {
    addToDo(userInputElement.value);
    userInputElement.value = "";
  }
});
let styleElement = document.createElement("link");
styleElement.setAttribute("href", "style.css");
styleElement.setAttribute("rel", "stylesheet");
let materialIconsElement = document.createElement("link");
materialIconsElement.setAttribute(
  "href",
  "https://fonts.googleapis.com/icon?family=Material+Icons"
);
materialIconsElement.setAttribute("rel", "stylesheet");
document.head.appendChild(materialIconsElement);
document.head.appendChild(styleElement);
formElement.appendChild(userInputElement);
formElement.appendChild(submitButtonElement);
document.body.appendChild(titleElement);
document.body.appendChild(formElement);
document.body.appendChild(undoChangesElement);
document.body.appendChild(listContainerElement);
