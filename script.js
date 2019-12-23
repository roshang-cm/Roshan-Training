let todoListStateStack = [[]];

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
  let todoList = todoListStateStack[todoListStateStack.length - 1].slice();
  let newTodoList = [];
  todoList.forEach(todo => {
    if (todo.id != todoId) {
      newTodoList.push(todo);
    }
  });
  todoListStateStack.push(newTodoList);
  buildToDoList();
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
  let listItemTitle = document.createElement("b");
  let deleteItemButton = document.createElement("button");
  deleteItemButton.innerHTML = "Delete";
  deleteItemButton.addEventListener("click", index => {
    deleteToDo(todo.id);
  });
  listItemTitle.innerHTML = todo.title;
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
  undoChangesElement.style.display = todoListStateStack.length
    ? "block"
    : "none";
  setInterval(() => {
    undoChangesElement.style.display = "none";
  }, 3000);
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
undoChangesElement.addEventListener("click", () => undoChange());
titleElement.innerHTML = "To-Do list using JS";
userInputElement.setAttribute("type", "text");
userInputElement.setAttribute("placeholder", "Type something here");
userInputElement.setAttribute("required", true);
submitButtonElement.setAttribute("type", "button");
submitButtonElement.innerHTML = "Add To-Do";
submitButtonElement.addEventListener("click", () => {
  if (userInputElement.value) {
    addToDo(userInputElement.value);
  }
});
formElement.appendChild(userInputElement);
formElement.appendChild(submitButtonElement);
document.body.appendChild(titleElement);
document.body.appendChild(formElement);
document.body.appendChild(undoChangesElement);
document.body.appendChild(listContainerElement);
