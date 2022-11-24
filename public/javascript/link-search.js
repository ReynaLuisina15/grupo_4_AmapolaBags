const linkSearch = document.querySelector(".link-search");
const barSearch = document.querySelector("#search-form");
const nav = document.querySelector("nav.home__nav__container");

linkSearch.addEventListener("click", () => {
  barSearch.classList.toggle("active");
  nav.classList.toggle("active");
});

