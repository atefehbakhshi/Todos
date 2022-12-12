const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const hamburgerMenu = document.querySelector("#hamburger-menu");
const form = document.querySelector("#form");
openMenu.addEventListener("click", () => {
  hamburgerMenu.style.transform = "translateX(0)";
  openMenu.style.opacity = 0;
});
closeMenu.addEventListener("click", () => {
  hamburgerMenu.style.transform = "translateX(100%)";
  openMenu.style.opacity = 1;
});
