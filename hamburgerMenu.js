const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const hamburgerMenu = document.querySelector("#hamburger-menu");

const paginationNav  = document.querySelector("#pagination-nav");

openMenu.addEventListener("click", () => {
  hamburgerMenu.style.transform = "translateX(0)";
  openMenu.style.opacity = 0;
  paginationNav.style.zIndex=-1;
});
closeMenu.addEventListener("click", () => {
  hamburgerMenu.style.transform = "translateX(100%)";
  openMenu.style.opacity = 1;
  paginationNav.style.zIndex=1;
});