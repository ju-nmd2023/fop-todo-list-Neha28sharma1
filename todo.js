// let completed = true;

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
  const itemElement = document.createElement("p"); // created li in ul
  itemElement.innerText = value;
  listitemElement.appendChild(itemElement);
  listitemElement.classList.add("item"); // li class
  listElement.appendChild(listitemElement); //  adding li as ul child
  // if (createButtons) {
  //   createButton(listitemElement);
  // }
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

  doneButton.innerText = "🤍";

  doneButton.classList.add("done");
  doneButton.addEventListener("click", finishedTask);
  listitemElement.appendChild(doneButton);
}

function saveListInformationLocal(value) {
  // function to save information on local storage in an array inspired by Garrit's coin flip game
  //   console.log(value);
  //   inputElement = document.getElementById("enterText");

  let inputElement = {
    name: value,
    completed: false,
  };

  if (
    localStorage.inputElement === undefined
    //  ||
    // value !== ""
    // value[0] === ""
  ) {
    // to save highscore in the local storage
    localStorage.inputElement = JSON.stringify([]); // if local storage is undefined we want to store all the information in an empty array

    // we take this , extract it ,, add sometging to the aaray and then put it back
  }
  if (localStorage.inputElement !== undefined) {
    let inputElementsArray = JSON.parse(localStorage.inputElement); ///  TO CONVERT TO OBJECT
    inputElementsArray.push(inputElement); // adds new value to array
    localStorage.inputElement = JSON.stringify(inputElementsArray);

    // saveElementsOnRefresh();
  }
}

function saveElementsOnRefresh() {
  const listElement = document.getElementById("list");
  listElement.innerHTML = "";

  if (localStorage.inputElement !== undefined) {
    let inputElementsArray = JSON.parse(localStorage.inputElement);

    for (let inputelement of inputElementsArray) {
      const listitemElement = document.createElement("div"); // created li in ul
      const itemElement = document.createElement("div"); // created li in ul
      itemElement.innerText = inputelement.name;
      listitemElement.classList.add("item");
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
  // localStorage.setItem("inputElement", JSON.stringify(inputElementsArray));
}

function finishedTask() {
  ///// there is problem with this
  const element = this; // Get the clicked button
  const doneTaskValue = element.parentNode.childNodes[0].innerText; // we called the child at index o with innertext so that it doesnt take strings
  // listItem.classList.toggle("completed"); // Toggle the completed class on the li element
  const inputElementsArray = JSON.parse(localStorage.inputElement);

  const inputIndex = inputElementsArray.findIndex(function (event) {
    return event.name === doneTaskValue;
  });
  if (inputIndex !== -1) {
    inputElementsArray[inputIndex].completed = true;
    localStorage.setItem("inputElement", JSON.stringify(inputElementsArray));
  }
  // for (let element of inputElementsArray) {
  //   console.log(element.name);
  //   if (element.name === listItem.name) {
  //   }
  // }
  // Update the completed status in local storage

  // Update the button text
  if (element.completed === "false") {
    element.innerText = "🤍";
    // element.completed = "true";
  } else {
    element.innerText = "❤️";
    // element.completed = true;
  }
}
function updateLocalStorage() {
  console.log(this);
  listElement.innerHTML = "";
  const listItems = listElement.querySelectorAll(".item");
  const listItems = document.getElementsByClassName("item");
  listItems.innerHTML = "";
  let inputElementsArray = [];
  for (let i = 0; i < listItems.length; i++) {
    const item = listItems[i];
    console.log(item);
    inputElementsArray.push(item);
    inputElementsArray.push({
      name: item.innerText,
      completed: item.classList.contains("completed"),
    });
  }
  inputElementsArray = JSON.parse(localStorage.inputElement); ///  TO CONVERT TO OBJECT
  inputElementsArray.push(inputElement); // adds new value to array
  localStorage.setItem("inputElement", JSON.stringify(inputElementsArray));
}

function onLoadHandler() {
  const button = document.getElementById("addButton"); // called button element
  button.addEventListener("click", clickHandler); // event listner

  //   saveListInformationLocal();
  saveElementsOnRefresh();
}

window.addEventListener("load", onLoadHandler);
/// the error is that it is saving the buttons in localstorage and then fething it again for the value which are completed or removed
