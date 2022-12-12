const API_URL = "https://63969f1c90ac47c68089df44.mockapi.io";

const listForm = document.querySelector("#create-list");

const titleLabel = document.querySelector("#title-label");
const titleInput = document.querySelector("#title");
const titleAlert = document.querySelector("#required-title");

const dueDateLabel = document.querySelector("#dueDate-label");
const dueDateInput = document.querySelector("#dueDate");
const dueDateAlert = document.querySelector("#required-dueDate");

// Create
async function createNewList(e) {
  e.preventDefault();
  const newList = gatherFormDate(e);
  if (newList) {
    try {
      const res = await fetch(
        `https://63969f1c90ac47c68089df44.mockapi.io/todos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newList),
        }
      );
      removeAlert();
      successfullMessage();
      resetForm();
    } catch (error) {
      console.log(error);
    }
  }
}
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
    return {
      title: title.value,
      dueDate: dueDate.value,
      description: description.value,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      checked: false,
      id: new Date().getTime(),
    };
  }
}
listForm.addEventListener("submit", createNewList);

// Successful message
function successfullMessage() {
  const message = document.querySelector(".toast");
  message.style.transform = "translateX(0)";
  setTimeout(() => {
    message.style.transform = "translateX(-150%)";
  }, 3000);
}
// Reset form
function resetForm() {
  listForm.reset();
}
// Remove Alert
function removeAlert() {
  titleLabel.style.color = "white";
  titleInput.style.border = "none";
  titleAlert.style.display = "none";
  dueDateLabel.style.color = "white";
  dueDateInput.style.border = "none";
  dueDateAlert.style.display = "none";
}
