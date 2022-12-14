const API_URL = "https://63969f1c90ac47c68089df44.mockapi.io";
const DEFAULT_PAGE_SIZE = 2;
const todosContainer = document.querySelector("#todos-container");
// Modal
const deleteModal = document.querySelector(".delete-modal");
const deleteModalBtn = document.querySelector("#modal-delete-btn");
const cancelModalBtn = document.querySelector("#modal-cancel-btn");
const deleteItemTitle = document.querySelector("#delete-item-title");
const deleteItemDueDate = document.querySelector("#delete-item-due-date");

// when page is refreshed
let pageNumber;
function pageUrl() {
  const savedPage = localStorage.getItem("pageNumber");
  if (savedPage) {
    pageNumber = savedPage;
  } else {
    pageNumber = 1;
  }
  if (history.pushState) {
    let newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?page=" +
      pageNumber;
    window.history.pushState({ path: newurl }, "", newurl);
  }
}
pageUrl();
readTodos(pageNumber);

// Read
async function readTodos(page = 1) {
  todosContainer.innerHTML = "";
  try {
    const res = await fetch(`${API_URL}/todos`);
    const data = await res.json();
    const { items, count } = data;

    let itemInPage = frontEndPagination(items, page);
    // when all items in a page are removed
    if (itemInPage === undefined) {
      localStorage.setItem("pageNumber", `${page - 1}`);
      page = page - 1;
      pageUrl()
      itemInPage = frontEndPagination(items, page);
    }
    // when each item is removed
    itemInPage = itemInPage.filter((item) => item !== undefined);
    itemInPage.forEach(addToDom);
    createPagination(count, page);
  } catch (error) {
    console.log(error);
  }
}

function frontEndPagination(items, page) {
  let subItems = [];
  for (let i = 0; i < items.length; i += DEFAULT_PAGE_SIZE) {
    let temp = [];
    for (let j = i; j < i + DEFAULT_PAGE_SIZE; j++) {
      temp.push(items[j]);
    }
    subItems.push(temp);
  }
  return subItems[page - 1];
}

function addToDom(todo) {
  const html = `
<div class="todolist" id="${todo.id}-${todo.userId}">
  <div class="title-reaction">
    <div class="title-date">
      <div class="todo-title">
        <input type="radio" id="${todo.list}" />
        <label for="${todo.list}">${todo.title}</label>
      </div>
      <p class="dueDate">${todo.dueDate}</p>
    </div>
    <div class="edit-delete">
      <span class="material-symbols-outlined edit">edit</span>
      <span class="material-symbols-outlined delete">delete</span>
    </div>
  </div>
  <p class="description">${todo.description}</p>
</div>
    `;
  todosContainer.insertAdjacentHTML("beforeend", html);
}

// Pagination
function createPagination(productCount, currentPage) {
  const pageCount = Math.ceil(productCount / DEFAULT_PAGE_SIZE);
  let lis = "";
  for (let i = 1; i <= pageCount; i++) {
    lis += `<li class="page-item ${
      i === currentPage ? "active" : ""
    }"><a href="todos.html?page=${i}" class="page-link">${i}</a></li>`;
  }
  document.querySelector("ul.pagination").innerHTML = lis;
}
document.querySelector("ul.pagination").addEventListener("click", (e) => {
  e.preventDefault();
  const lis = document.querySelectorAll(".page-item");
  lis.forEach((li) => li.classList.remove("active"));
  if (e.composedPath()[0].classList.contains("page-link")) {
    e.target.parentElement.classList.add("active");
    if (history.pushState) {
      let newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?page=" +
        e.target.innerHTML;
      window.history.pushState({ path: newurl }, "", newurl);
    }
  }
  const currentPage = Number(e.target.innerText);

  readTodos(currentPage);

  // when refresh page
  localStorage.setItem("pageNumber", `${currentPage}`);
});

// Edit / Delete
todosContainer.addEventListener("click", (e) => {
  const id = e.target.closest(".todolist").id;
  if (e.target.classList.contains("edit")) {
    window.location.href = "index.html?id=" + id;
  }
  if (e.target.classList.contains("delete")) {
    const currentPage = window.location.href.split("=")[1];
    deleteModal.style.display = "flex";
    deleteModal.id = id;
    deleteModal.dataset.currentPage = currentPage;
    modalInformations(e);
  }
});

// Delete
deleteModalBtn.addEventListener("click", () => {
  const modalId = deleteModal.id;
  const currentPage = deleteModal.dataset.currentPage;
  deleteList(modalId, currentPage);
  deleteModal.style.display = "none";
});

async function deleteList(listId, currentPage) {
  const id = listId.split("-")[0];
  try {
    const res = await fetch(`${API_URL}/todos/${id}`, { method: "DELETE" });
    readTodos(currentPage);
  } catch (error) {
    console.log(error);
  }
}

cancelModalBtn.addEventListener("click", () => {
  deleteModal.style.display = "none";
});

// display title and due date of item in modal
function modalInformations(e) {
  const titleDueDate = e.target.closest(".edit-delete").previousElementSibling;
  const title = titleDueDate.children[0].children[1].innerHTML;
  const date = titleDueDate.children[1].innerHTML;
  deleteItemTitle.innerHTML = title;
  deleteItemDueDate.innerHTML = date;
}
