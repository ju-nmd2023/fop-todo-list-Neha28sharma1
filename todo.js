let completed = false;
// let inputElementsArray = [];

function clickHandler() {
  const inputElement = document.getElementById("enterText"); ///called input element
  const value = inputElement.value; //input element value

  const listElement = document.getElementById("list"); /// called ul
  const listitemElement = document.createElement("li"); // created li in ul
  listitemElement.innerText = value;
  listitemElement.classList.add("item");

  listElement.appendChild(listitemElement); //  adding li as ul child

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "❌";
  deleteButton.classList.add("delete");
  deleteButton.addEventListener("click", removeElement);
  listitemElement.appendChild(deleteButton);

  const doneButton = document.createElement("button");

  doneButton.innerText = "🤍";

  doneButton.classList.add("done");
  doneButton.addEventListener("click", completedTask);
  listitemElement.appendChild(doneButton);
  saveListInformation(value);
}

function saveListInformation(value) {
  //   console.log(value);
  if (localStorage.inputElement === undefined || value[1] === "") {
    // to save highscore in the local storage
    localStorage.inputElement = JSON.stringify([]); // if local storage is undifen we want to store all the information in an empty array
    // we take this , extract it ,, add sometging to the aaray and then put it back
  }
  let inputElementsArray = JSON.parse(localStorage.inputElement);
  inputElementsArray.push(value); // adds new value to array
  localStorage.inputElement = JSON.stringify(inputElementsArray);
  
}

function SaveElementsOnRefresh() {
  const value = localStorage.getItem(inputElement);
  if (value !== undefined) {
    // const inputElement = document.getElementById("enterText");
    saveListInformation();
  }
}

function removeElement() {
  // to remove the task inspired by Garrit fruit chart
  const element = this.parentNode;
  element.parentNode.removeChild(element);
}

function completedTask() {
  // to change the color on toggle inspired by Garrit's Hamstergram
  const doneButton = this;

  if (doneButton.completed === "true") {
    doneButton.innerText = "❤️";
    doneButton.completed = "false";
  } else {
    doneButton.innerText = "🤍";
    doneButton.completed = "true";
  }
}

function onLoadHandler() {
  const button = document.getElementById("addButton"); // called button element
  button.addEventListener("click", clickHandler); // event listner
  saveListInformation();
  SaveElementsOnRefresh();
}

window.addEventListener("load", onLoadHandler);
