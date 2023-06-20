let navbar = document.querySelector("#navbar");
navbar.style.background = "#2e8b57";
const upIcon = document.querySelector("#upicon");
const meetCards = document.querySelector(".meet-cards");
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
const teamUrl = "http://localhost:8080/meet-team";

async function drawTeam() {
  const res = await axios(teamUrl);
  const data = res.data;
  getallData = data;
  spinnerInfo.style.display = "none";
  filterData =
    filterData.length || searchInp.value
      ? filterData.slice(0, maxLen)
      : getallData.slice(0, maxLen);

  meetCards.innerHTML = "";

  filterData.forEach((element) => {
    meetCards.innerHTML += `
    <div class="col-lg-3 col-md-6 col-sm-12">
    <div class="card">
      <img src="${element.photo}" alt="" />
      <div class="meet-card">
        <div class="meets-text">
          <h1>${element.fullname}</h1>
          <p>${element.position}</p>
        </div>
        <div class="meet-hover">
          <a href="#"> <i class="fa-brands fa-linkedin"></i></a>
          <a href="#"> <i class="fa-brands fa-instagram"></i></a>
          <a href="#"> <i class="fa-brands fa-facebook"></i></a>
          <a href="#"> <i class="fa-brands fa-whatsapp"></i></a>
          <a href="#"> <i class="fa-brands fa-twitter"></i></a>
        </div>
      </div>
    </div>
  </div>
        
        `;
  });
}
drawTeam();

showMore.addEventListener("click", function () {
  getallData.length > maxLen + 7
    ? maxLen + 4
    : (maxLen = maxLen - (maxLen - getallData.length));
  drawTeam();
  filterData = getallData.slice(0, maxLen);
});

searchInp.addEventListener("input", function (e) {
  spinnerInfo.style.display = "flex";
  filterData = getallData.filter((item) => {
    return item.fullname.toLowerCase().includes(e.target.value.toLowerCase());
  });

  drawTeam();
  spinnerInfo.style.display = "none";
  getallData = filterData;
  evrData = filterData;
});

sortBtn.addEventListener("click", function () {
  sortData = filterData;
  if (sort == "asc") {
    sortBtn.innerHTML = "Sort By Asc";
    sort = "dcs";
    sortData.sort((a, b) => a.position.localeCompare(b.position));

    drawTeam();
  } else if (sort == "dcs") {
    sortBtn.innerHTML = "Sort By Dcs";
    sort = "def";
    sortData.sort((a, b) => b.position.localeCompare(a.position));

    drawTeam();
  } else {
    filterData = searchInp.value ? evrData : getallData;
    sortBtn.innerHTML = "Sort By";
    sort = "asc";
    drawTeam();
  }
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

//count

document.addEventListener("DOMContentLoaded", function () {
  let elements = document.querySelectorAll(".scroll-counter");

  elements.forEach(function (item) {
    item.counterAlreadyFired = false;
    item.counterSpeed = item.getAttribute("data-counter-time") / 45;
    item.counterTarget = +item.innerText;
    item.counterCount = 0;
    item.counterStep = item.counterTarget / item.counterSpeed;

    item.updateCounter = function () {
      item.counterCount = item.counterCount + item.counterStep;
      item.innerText = Math.ceil(item.counterCount);

      if (item.counterCount < item.counterTarget) {
        setTimeout(item.updateCounter, item.counterSpeed);
      } else {
        item.innerText = item.counterTarget;
      }
    };
  });

  var isElementVisible = function isElementVisible(el) {
    let scroll = window.scrollY || window.pageYOffset;
    let boundsTop = el.getBoundingClientRect().top + scroll;
    let viewport = {
      top: scroll,
      bottom: scroll + window.innerHeight,
    };
    var bounds = {
      top: boundsTop,
      bottom: boundsTop + el.clientHeight,
    };
    return (
      (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) ||
      (bounds.top <= viewport.bottom && bounds.top >= viewport.top)
    );
  };

  var handleScroll = function handleScroll() {
    elements.forEach(function (item, id) {
      if (true === item.counterAlreadyFired) return;
      if (!isElementVisible(item)) return;
      item.updateCounter();
      item.counterAlreadyFired = true;
    });
  };

  window.addEventListener("scroll", handleScroll);
});
