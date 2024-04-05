function clickHandler() {
  const inputElement = document.getElementById("enterText"); ///called input element
  const value = inputElement.value; //input element value

  const listElement = document.getElementById("list"); /// called ul
  const listitemElement = document.createElement("li"); // created li in ul
  listitemElement.innerText = value;
  
  listElement.appendChild(listitemElement); // adding li as ul child

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Remove";
  deleteButton.classList.add("delete");
  deleteButton.addEventListener("click", removeElement);
  listitemElement.appendChild(deleteButton);

  const doneButton = document.createElement("button");
  doneButton.innerText = "Completed";
  doneButton.classList.add("done");

  listitemElement.appendChild(doneButton);
}

function removeElement() {
  const element = this.parentNode;
  element.parentNode.removeChild(element);
}

function onLoadHandler() {
  const button = document.getElementById("addButton"); // called button element
  button.addEventListener("click", clickHandler); // event listner
}

window.addEventListener("load", onLoadHandler);
