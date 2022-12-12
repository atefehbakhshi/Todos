// API
// const API_URL = "https://63969f1c90ac47c68089df44.mockapi.io";
const listForm = document.querySelector("#create-list");

// Create
async function createNewList(e) {
  e.preventDefault();
  const newList = gatherFormDate(e);
  try {
    const res = await fetch(
      `https://63969f1c90ac47c68089df44.mockapi.io/todos`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newList),
      }
    );
    successfullMessage();
    resetForm();
  } catch (error) {
    console.log(error);
  }
}
function gatherFormDate(e) {
  const { title, description, dueDate } = e.target;
  console.log();
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
function resetForm(){
  listForm.reset();
}
