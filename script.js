let todoListStateStack = [[]];
//Setting up the initial layout

const titleElement = document.createElement("h1");
const userInputElement = document.createElement("input");
const submitButtonElement = document.createElement("button");
const formElement = document.createElement("div");
const listContainerElement = document.createElement("ul");
const undoChangesElement = document.createElement("button");
undoChangesElement.innerText = "Undo Changes";
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
console.log(todoListStateStack);
// Add To-Do
function addToDo(todo) {
  let todoList = todoListStateStack[todoListStateStack.length - 1].slice();
  todoList.push(todo);
  todoListStateStack.push(todoList);
  buildToDoList();
}

function undoChange() {
  todoListStateStack.pop();
  buildToDoList();
}
//Builders

function buildListElement(todo) {
  let listItem = document.createElement("li");
  let listItemContent = document.createElement("div");
  let listItemTitle = document.createElement("b");
  let deleteItemButton = document.createElement("button");
  deleteItemButton.innerHTML = "Delete";
  listItemTitle.innerHTML = todo;
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
  listContainerElement.remov;
  todoList.forEach(todo => {
    listContainerElement.appendChild(buildListElement(todo));
  });
}
