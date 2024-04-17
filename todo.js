function clickHandler() {
  const inputElement = document.getElementById("enterText"); ///called input element
  const value = inputElement.value; //input element value
  if (value !== "") {
    updateListitem(value);
    saveListInformationLocal(value);
    inputElement.value = ""; // Clear input field after adding task
  }
}

function updateListitem(value) {
  const listElement = document.getElementById("list"); /// called ul

  const listitemElement = document.createElement("div"); // created li in ul
  const itemElement = document.createElement("p");
  itemElement.innerText = value;
  listitemElement.appendChild(itemElement);
  listitemElement.classList.add("item"); // li class
  listElement.appendChild(listitemElement); //  adding li as ul child
  createButton(listitemElement);
}

function createButton(listitemElement) {
  //passed the list item element to create button
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "❌";
  deleteButton.classList.add("delete");
  deleteButton.addEventListener("click", removeElement);
  listitemElement.appendChild(deleteButton);

  const doneButton = document.createElement("button");

  if (listitemElement.classList.contains("completed")) {
    doneButton.innerText = "❤️";
  } else {
    doneButton.innerText = "🤍";
  }

  doneButton.classList.add("done");
  doneButton.addEventListener("click", finishedTask);
  listitemElement.appendChild(doneButton);
}

function saveListInformationLocal(value) {
  // function to save information on local storage in an array inspired by Garrit's coin flip game
  let inputElement = {
    name: value,
    completed: false,
  };

  if (localStorage.inputElement === undefined) {
    // to save highscore in the local storage
    localStorage.inputElement = JSON.stringify([]); // if local storage is undefined we want to store all the information in an empty array

    // we take this , extract it , add sometging to the aaray and then put it back
  }
  if (localStorage.inputElement !== undefined) {
    let inputElementsArray = JSON.parse(localStorage.inputElement); ///  TO CONVERT TO OBJECT
    inputElementsArray.push(inputElement); // adds new value to array
    localStorage.inputElement = JSON.stringify(inputElementsArray); // put it  to local storage
  }
}

function displayFromLocalstorage() {
  const listElement = document.getElementById("list");
  listElement.innerHTML = "";

  if (localStorage.inputElement !== undefined) {
    let inputElementsArray = JSON.parse(localStorage.inputElement);

    for (let inputelement of inputElementsArray) {
      const listitemElement = document.createElement("div"); // created li in ul
      const itemElement = document.createElement("p");
      itemElement.innerText = inputelement.name;
      listitemElement.classList.add("item");
      if (inputelement.completed) {
        listitemElement.classList.add("completed");
      }
      listitemElement.appendChild(itemElement);
      listElement.appendChild(listitemElement);
      createButton(listitemElement);
    }
  }
}

function removeElement() {
  // to remove the task inspired by Garrit fruit chart
  const element = this.parentNode;
  element.parentNode.removeChild(element);
  updateLocalStorage();
}

function finishedTask() {
  const element = this; // Get the clicked button
  const listItem = element.parentNode;
  // listItem.classList.add("completed");
  console.log(listItem);
  listItem.classList.toggle("completed"); // Toggle the completed class on the li element

  // Update the button text
  if (listItem.classList.contains("completed")) {
    element.innerText = "❤️";
    element.completed = "true";
  } else {
    element.innerText = "🤍";
    element.completed = "false";
  }
  updateLocalStorage();
}

function updateLocalStorage() {
  const listItems = document.getElementsByClassName("item");

  localStorage.inputElement = JSON.stringify([]);

  for (let i = 0; i < listItems.length; i++) {
    const item = listItems[i];
    console.log(item);
    let inputElement = {
      name: item.childNodes[0].innerText, // Retrieve the task name
      completed: item.classList.contains("completed"), // Check if task is completed
    };

    console.log(item.classList.contains("completed"));
    let inputElementsArray = JSON.parse(localStorage.inputElement);
    inputElementsArray.push(inputElement);
    localStorage.inputElement = JSON.stringify(inputElementsArray);
  }
}

function onLoadHandler() {
  const button = document.getElementById("addButton"); // called button element
  button.addEventListener("click", clickHandler); // event listner

  displayFromLocalstorage();
}

window.addEventListener("load", onLoadHandler);
