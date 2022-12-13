const API_URL = "https://63969f1c90ac47c68089df44.mockapi.io";
const todosContainer = document.querySelector("#todos-container");
const DEFAULT_PAGE_SIZE = 5;

// Read
async function readTodos(page = 1) {
  todosContainer.innerHTML = "";
  try {
    const res = await fetch(
      `${API_URL}/todos?page=${page}&limit=${DEFAULT_PAGE_SIZE}`
    );
    const data = await res.json();
    const { items, count } = data;
    items.forEach(addToDom);
    createPagination(count, page);
  } catch (error) {
    console.log(error);
  }
}
function addToDom(todo) {
  const html = `
<div class='todolist' id="${todo.id}">
    <div class="title-reaction">
      <div class='todolist-title'>
        <input type="radio" id="${todo.list}">
        <label for="${todo.list}">${todo.title}</label>
      </div>

      <div class='edit-delete'>
        <span class="material-symbols-outlined edit" >edit</span>
        <span class="material-symbols-outlined delete" >delete</span>
      </div>

    </div>
    <p class='description'>${todo.description}</p>
   
</div>
    `;
  todosContainer.insertAdjacentHTML("beforeend", html);
}
readTodos();

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
  e.preventDefault()
  const lis = document.querySelectorAll(".page-item");
  lis.forEach((li) => li.classList.remove("activee"));
  if (e.composedPath()[0].classList.contains("page-link")) {
    e.target.parentElement.classList.add("active");
    if (history.pushState) {
      let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?page='+e.target.innerHTML;
      window.history.pushState({path:newurl},'',newurl);
  }
  }
  const currentPage = Number(e.target.innerText);
  readTodos(currentPage);
});
