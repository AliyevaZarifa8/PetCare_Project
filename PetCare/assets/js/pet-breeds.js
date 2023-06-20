let navbar = document.querySelector("#navbar");
const upIcon = document.querySelector("#upicon");
navbar.style.background = "#2e8b57";
let modalDialog = document.querySelector("#modal-dialog");
let petBreeds = document.querySelector("#pet-breedss");
let selectBreeds = document.querySelector("#select");
let searchInp = document.querySelector("#search");
let sortBtn = document.querySelector("#sort");
let showMore = document.querySelector(".showmore");
let spinnerInfo = document.querySelector("#spinner");
spinnerInfo.style.display = "flex";
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
let filterData = [];
let getallData = [];
let sortData = [];
let evrData = [];
let sort = "asc";
let maxLen = 8;
const breedsUrl = "http://localhost:8080/pet-breeds";
// let signUrl = "http://localhost:8080/sigin";

async function drawBranches() {
  const res = await axios(breedsUrl);
  const data = res.data;
  getallData = data;
  spinnerInfo.style.display = "none";
  filterData =
    filterData.length || searchInp.value
      ? filterData.slice(0, maxLen)
      : getallData.slice(0, maxLen);

  petBreeds.innerHTML = "";

  filterData.forEach((element) => {
    petBreeds.innerHTML += `
    <div class="col-lg-3 col-md-6 col-sm-12">
    <div class="card">
      <img src="${element.photo}" alt="" />
      <h2>Dog Breeds:</h2>
      <h3>${element.breedsname}</h3>
      <i>Prices : $${element.prices}</i>
      <div>
        <p>
        ${element.breedstext.slice(0, 40)} ...
        </p>
      </div>
      <div class="breeds-hover">
      <img src="./assets/image/bskt.png " alt="" id="save"  onclick=addBasket("${
        element.id
      }")>

      <button
      type="button"
      class="btn"
      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"
    >
    <img src="./assets/image/eye1.png " id="details" alt="" onclick=viewBreeds("${
      element.id
    }")>
    </button>
      
      <img src="./assets/image/likes.png " id="like" alt="" onclick=addFav("${
        element.id
      }")>

   

     </div>
    </div>
  </div>
        
        `;
  });
}
drawBranches();

showMore.addEventListener("click", function () {
  getallData.length > maxLen + 7
    ? maxLen + 4
    : (maxLen = maxLen - (maxLen - getallData.length));
  drawBranches();
  filterData = getallData.slice(0, maxLen);
});

searchInp.addEventListener("input", function (e) {
  spinnerInfo.style.display = "flex";
  filterData = getallData.filter((item) => {
    return item.breedsname.toLowerCase().includes(e.target.value.toLowerCase());
  });

  spinnerInfo.style.display = "none";
  drawBranches();
  getallData = filterData;
  evrData = filterData;
});

selectBreeds.addEventListener("input", async function (e) {
  spinnerInfo.style.display = "flex";
  filterData = getallData.filter((item) => {
    return item.breedsname.toLowerCase().includes(e.target.value.toLowerCase());
  });
  spinnerInfo.style.display = "none";
  drawBranches();
});

sortBtn.addEventListener("click", function () {
  sortData = filterData;
  if (sort == "asc") {
    sortBtn.innerHTML = "Sort By Asc";
    sort = "dcs";
    sortData.sort((a, b) => a.prices - b.prices);

    drawBranches();
  } else if (sort == "dcs") {
    sortBtn.innerHTML = "Sort By Dcs";
    sort = "def";
    sortData.sort((a, b) => b.prices - a.prices);

    drawBranches();
  } else {
    filterData = searchInp.value ? evrData : getallData;
    sortBtn.innerHTML = "Sort By";
    sort = "asc";
    drawBranches();
  }
});

const setBasket = JSON.parse(localStorage.getItem("setBaskets")) || [];
async function addBasket(userId) {
  const res = await axios(`${breedsUrl}/${userId}`);
  const data = await res.data;
  // const resSign = await axios(`${signUrl}`);
  // const dataSign = await resSign.data;
  // console.log(dataSign);
  // dataSign.forEach(item=>{
  //   item?.isadmin
  //   ? setBasket.push(data) && localStorage.setItem("setBaskets", JSON.stringify(setBasket))
  //   :alert("Pls register!") && (window.location = "signin.html");
  // })

  isTrue = setBasket.some((element) => element.id === data.id);

  if (!isTrue) {
    setBasket.push(data);
    localStorage.setItem("setBaskets", JSON.stringify(setBasket));
  } else {
    alert("Character already exists in your list!");
  }
}

const getBasket = JSON.parse(localStorage.getItem("getBaskets")) || [];
async function addFav(userId) {
  const res = await axios(`${breedsUrl}/${userId}`);
  const data = await res.data;

  isTrue = getBasket.some((element) => element.id === data.id);

  if (!isTrue) {
    getBasket.push(data);
    localStorage.setItem("getBaskets", JSON.stringify(getBasket));
  } else {
    alert("Character already exists in your list!");
  }
}

async function viewBreeds(id) {
  const res = await axios(`${breedsUrl}/${id}`);
  const data = res.data;
  modalDialog.innerHTML = `
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-success mx-5 px-5" id="staticBackdropLabel">
                  Breeds : ${data.breedsname}
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body text-center">
                <img src="${data.photo}" alt="" width="300" />
                <p class="text-danger">Price : ${data.prices}</p>
                <p>
                ${data.breedstext}
              </p>
              </div>
              <div class="modal-footer text-center">
                <button
                  type="button"
                  class="btn btn-success text-center"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
  `;
}
viewBreeds();

//video
let videoIcon = document.querySelector(".video-txt");
let video = document.querySelector(".video");
let petBreeds4 = document.querySelector(".pet-breeds4");
let faMinus = document.querySelector(".fa-minus");
video.style.display = "none";

videoIcon.addEventListener("click", function () {
  videoIcon.style.display = "none";
  petBreeds4.style.display = "none";
  video.style.display = "block";
  faMinus.style.display = "block";
});
faMinus.addEventListener("click", function () {
  videoIcon.style.display = "flex";
  petBreeds4.style.display = "flex";
  video.style.display = "none";
  faMinus.style.display = "none";
});

// function controlVideo() {
//   let iframe = document.querySelector("iframe");
//   console.log(iframe);
//   iframe.contentWindow.postMessage(
//     '{"event":"command","func":"stopVideo","args":""}',
//     "*"
//   );
//   console.log(iframe);
// }

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
