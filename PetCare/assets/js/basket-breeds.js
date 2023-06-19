let navbar = document.querySelector("#navbar");
const upIcon = document.querySelector("#upicon");
navbar.style.background = "#2e8b57";
const breedsUrl = "http://localhost:8080/pet-breeds";
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

let basket = document.querySelector("#breeds-basket");

let setBasket = JSON.parse(localStorage.getItem("setBaskets")) || [];

function getallBasket() {
  basket.innerHTML = "";
  setBasket.forEach((element) => {
    basket.innerHTML += `
    <div class="col-lg-3 text-center">
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
      <div >
      <i class="fa-regular fa-heart text-danger my-3 mx-2" onclick=addFavs("${element.id}")></i>
      <i class="fa-solid fa-eraser text-danger text-center" onclick=removeBas("${element.id}")></i></div>
        
        `;
  });
}
getallBasket();

function removeBas(id) {
    setBasket = setBasket.filter((el) => el.id != id);
  localStorage.setItem("setBaskets", JSON.stringify(setBasket));
  getallBasket();
}

const getItem = JSON.parse(localStorage.getItem("getBaskets")) || [];
async function addFavs(userId) {
  const res = await axios(`${breedsUrl}/${userId}`);
  const data = await res.data;

  isTrue = getItem.some((element) => element.id === data.id);

  if (!isTrue) {
    getItem.push(data);
    localStorage.setItem("getBaskets", JSON.stringify(getItem));
  } else {
    alert("Character already exists in your list!");
  }
}
