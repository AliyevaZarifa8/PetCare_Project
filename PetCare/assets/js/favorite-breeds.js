let navbar = document.querySelector("#navbar");
const upIcon = document.querySelector("#upicon");
navbar.style.background = "#2e8b57";
const menuIcon = document.querySelector("#menu");
const menuBar = document.querySelector("#menubar");
const closeIcon = document.querySelector("#close");

menuBar.style.display = "none";

menuIcon.addEventListener("click", function () {

  menuBar.style.display = "block";
});
closeIcon.addEventListener("click", function () {

  menuBar.style.display = "none";
});

function scrollFun() {
  let x =
    document.body.scrollTop > 200 || document.documentElement.scrollTop > 200;
  if (x) {
    upIcon.style.display = "block";
  } else {
    upIcon.style.display = "none";
  }
}

window.addEventListener("scroll", function () {
  scrollFun();
});

upIcon.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

const favorit = document.querySelector("#breeds-fav");

let getBasket = JSON.parse(localStorage.getItem("getBaskets")) || [];

function getallFav() {
  favorit.innerHTML = "";
  getBasket.forEach((element) => {
    favorit.innerHTML += `
    <div class="col-lg-3 col-md-6 col-sm-10 text-center">
    <div class="card">
      <img src="${element.photo}" alt="" />
      <h2>Dog Breeds:</h2>
      <h3>${element.breedsname}</h3>
      <i>Prices : $${element.prices}</i>
      <div>
        <p>
        ${element.breedstext}
        </p>
      </div>
    
      <i class="fa-solid fa-eraser text-danger text-center my-3" onclick=removeFav("${element.id}")></i>
        
        `;
  });
}
getallFav();

function removeFav(id) {
  getBasket = getBasket.filter((el) => el.id != id);
  localStorage.setItem("getBaskets", JSON.stringify(getBasket));
  getallFav();
}
