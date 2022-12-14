const API_URL = "https://63969f1c90ac47c68089df44.mockapi.io";

const listForm = document.querySelector("#create-list");

const titleLabel = document.querySelector("#title-label");
const titleInput = document.querySelector("#title");
const titleAlert = document.querySelector("#required-title");

const descriptionInput = document.querySelector("#description");

const dueDateLabel = document.querySelector("#dueDate-label");
const dueDateInput = document.querySelector("#dueDate");
const dueDateAlert = document.querySelector("#required-dueDate");

const submitBtn = document.querySelector("#submit-btn");

// Create
async function createNewList(e) {
  e.preventDefault();
  const newList = gatherFormDate(e);
  if (newList) {
    try {
      const res = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newList),
      });
      // When page does not found
      if (res.status === 404) {
        window.location.href = "notFoundPage.html";
      }
      removeAlert();
      successfullMessage();
      resetForm();
    } catch (error) {
      console.log(error);
    }
  }
}

// Edit
async function editTodos(todosId) {
  try {
    const res = await fetch(`${API_URL}/todos?search=${todosId}`);
    const data = await res.json();
    const { items: item } = data;
    addToForm(item);
  } catch (error) {
    console.log(error);
  }
}
function addToForm(item) {
  titleInput.value = item[0].title;
  descriptionInput.value = item[0].description;
  dueDateInput.value = item[0].dueDate;
  submitBtn.innerText = "Save";
  listForm.dataset.createDate = item[0].createdAt;
}
async function updatedList(e) {
  e.preventDefault();
  const updatedList = gatherFormDate(e);
  if (updatedList) {
    const id = window.location.href.split("=")[1].split("-")[0];
    try {
      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedList),
        headers: { "Content-Type": "application/json" },
      });
      removeAlert();
      successfullMessage();
      resetForm();
      resetUrl();
    } catch (error) {
      console.log(error);
    }
  }
}
// Gather form data
function gatherFormDate(e) {
  const { title, description, dueDate } = e.target;
  if (title.value === "") {
    titleLabel.style.color = "red";
    titleInput.style.border = "3px solid red";
    titleAlert.style.display = "block";
  } else if (dueDate.value === "") {
    dueDateLabel.style.color = "red";
    dueDateInput.style.border = "3px solid red";
    dueDateAlert.style.display = "block";
  } else {
    let createDate;
    e.target.getAttribute("data-create-date")
      ? (createDate = e.target.getAttribute("data-create-date"))
      : (createDate = `${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDate()}`);
    return {
      title: title.value,
      dueDate: dueDate.value,
      description: description.value,
      createdAt: createDate,
      updatedAt: `${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDate()}`,
      checked: false,
      id: new Date().getTime(),
    };
  }
}
// Remove Alert signs
function removeAlert() {
  titleLabel.style.color = "white";
  titleInput.style.border = "none";
  titleAlert.style.display = "none";
  dueDateLabel.style.color = "white";
  dueDateInput.style.border = "none";
  dueDateAlert.style.display = "none";
}
// Successful message
function successfullMessage() {
  const message = document.querySelector(".toast");
  const successfulSubmit = document.querySelector("#successful-submit");
  const successfulUpdate = document.querySelector("#successful-update");
  if (submitBtn.innerText === "Submit") {
    successfulSubmit.style.display = "block";
    successfulUpdate.style.display = "none";
  } else {
    successfulSubmit.style.display = "none";
    successfulUpdate.style.display = "block";
  }
  message.style.transform = "translateX(0)";
  setTimeout(() => {
    message.style.transform = "translateX(-150%)";
  }, 3000);
}
// Reset form
function resetForm() {
  listForm.reset();
  if (submitBtn.innerText === "Save") {
    submitBtn.innerText = "Submit";
  }
}
// Reset url
function resetUrl() {
  setTimeout(() => {
    window.location.href = "index.html";
  }, 4000);
}

// Create or Edit
const format = "?id=";
if (window.location.href.includes(format)) {
  const specificId = window.location.href.split("=")[1].split("-")[1];
  editTodos(specificId);
  listForm.addEventListener("submit", updatedList);
} else {
  listForm.addEventListener("submit", createNewList);
}
