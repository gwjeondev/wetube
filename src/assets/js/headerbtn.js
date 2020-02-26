const headerContainer = document.getElementById("headerContainer");
const headerBtn = document.getElementById("headerBtn");
const headerMenu = document.getElementById("headerMenu");
const headerSearch = document.getElementById("headerSearch");

const handleClick = () => {
  headerContainer.classList.toggle("show");
  headerMenu.classList.toggle("show");
  headerSearch.classList.toggle("show");
  if (headerSearch.classList.contains("show")) {
    headerBtn.innerHTML = '<i class="fas fa-times"></i>';
  } else {
    headerBtn.innerHTML = '<i class="fas fa-bars"></i>';
  }
};
const init = () => {
  headerBtn.addEventListener("click", handleClick);
};
if (headerBtn) {
  init();
}
