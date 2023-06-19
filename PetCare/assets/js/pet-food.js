let navbar = document.querySelector("#navbar");
const upIcon = document.querySelector("#upicon");
const petFoods = document.querySelector("#pet-foods");
navbar.style.background = "#2e8b57";

let selectFood = document.querySelector("#select");
let searchInp = document.querySelector("#search");
let sortBtn = document.querySelector("#sort");
let showMore = document.querySelector(".showmore");
let spinnerInfo = document.querySelector("#spinner");
spinnerInfo.style.display = "flex";
let filterData = [];
let getallData = [];
let sortData = [];
let evrData = [];
let sort = "asc";
let maxLen = 8;
const foodUrl = "http://localhost:8080/dog-food";

async function drawFood() {
  const res = await axios(foodUrl);
  const data = res.data;
  getallData = data;
  spinnerInfo.style.display = "none";
  filterData =
    filterData.length || searchInp.value
      ? filterData.slice(0, maxLen)
      : getallData.slice(0, maxLen);

  petFoods.innerHTML = "";

  filterData.forEach((element) => {
    petFoods.innerHTML += `
    <div class="col-lg-3">
    <div class="card">
      <img src="${element.photo}" alt="" />
      <h2>Category:</h2>
      <h2>${element.category}</h2>
      <h3>Price: $ ${element.price}</h3>
      <p>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <span>${element.starprice}</span>
      </p>
      <div>
      <button id="button">Buy Now</button>
      </div>
      <div class="food-hover">
      <i class="fa-regular fa-bookmark" onclick=addBasket("${element.id}")></i>
      <button type="button" class="btn shadow-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      <i class="fa-solid fa-eye"></i>
     </button>
     
     <i class="fa-regular fa-heart" onclick=addFav("${element.id}")></i>
     </div>
    </div>
  </div>
        
        `;
  });
}
drawFood();

showMore.addEventListener("click", function () {
  getallData.length > maxLen + 7
    ? maxLen + 4
    : (maxLen = maxLen - (maxLen - getallData.length));
  drawFood();
  filterData = getallData.slice(0, maxLen);
});

searchInp.addEventListener("input", function (e) {
  spinnerInfo.style.display = "flex";
  filterData = getallData.filter((item) => {
    return item.category.toLowerCase().includes(e.target.value.toLowerCase());
  });

  spinnerInfo.style.display = "none";
  drawFood();
  getallData = filterData;
  evrData = filterData;
});

selectFood.addEventListener("input", async function (e) {
  spinnerInfo.style.display = "flex";
  filterData = getallData.filter((item) => {
    return item.category.toLowerCase().includes(e.target.value.toLowerCase());
  });
  spinnerInfo.style.display = "none";
  drawFood();
});

sortBtn.addEventListener("click", function () {
  sortData = filterData;
  if (sort == "asc") {
    sortBtn.innerHTML = "Sort By Asc";
    sort = "dcs";
    sortData.sort((a, b) => a.price - b.price);

    drawFood();
  } else if (sort == "dcs") {
    sortBtn.innerHTML = "Sort By Dcs";
    sort = "def";
    sortData.sort((a, b) => b.price - a.price);

    drawFood();
  } else {
    filterData = searchInp.value ? evrData : getallData;
    sortBtn.innerHTML = "Sort By";
    sort = "asc";
    drawFood();
  }
});

const favStorage = JSON.parse(localStorage.getItem("favUser")) || [];
async function addBasket(userId) {
  const res = await axios(`${foodUrl}/${userId}`);
  const data = await res.data;

  isTrue = favStorage.some((element) => element.id === data.id);

  if (!isTrue) {
    favStorage.push(data);
    localStorage.setItem("favUser", JSON.stringify(favStorage));
  } else {
    alert("Character already exists in your list!");
  }
}
const favFood = JSON.parse(localStorage.getItem("favFoods")) || [];
async function addFav(userId) {
  const res = await axios(`${foodUrl}/${userId}`);
  const data = await res.data;

  isTrue = favFood.some((element) => element.id === data.id);

  if (!isTrue) {
    favFood.push(data);
    localStorage.setItem("favFoods", JSON.stringify(favFood));
  } else {
    alert("Character already exists in your list!");
  }
}

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

const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    autoplayTimeLeft(s, time, progress) {
      progressCircle.style.setProperty("--progress", 1 - progress);
      progressContent.textContent = `${Math.ceil(time / 1000)}s`;
    },
  },
});
