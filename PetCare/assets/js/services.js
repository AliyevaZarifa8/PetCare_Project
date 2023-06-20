let navbar = document.querySelector("#navbar");
const upIcon = document.querySelector("#upicon");
const pricesDnmk = document.querySelector(".prices-dinamk");
navbar.style.background = "#2e8b57";
const pricesUrl = "http://localhost:8080/prices-plans";
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

function drawPrices(array) {
  pricesDnmk.innerHTML = "";
  array.forEach((element) => {
    pricesDnmk.innerHTML += `
 
    <div class="col-lg-4">
              <div class="card prices-card">
                <h1>${element.title}</h1>
                <h2>$ ${element.prices}</h2>
                <i>${element.daily}</i>
                <p>$ ${element.daily}</p>
                <p>$ ${element.dailypay}</p>
                <div class="card-text">
                  <p>
                  ${element.text}
                  </p>
                </div>
                <div><button>Book Now</button></div>
              </div>
            </div>
    `;
  });
}

async function getallData() {
  const res = await axios(pricesUrl);
  const data = res.data;
  drawPrices(data);
}
getallData();

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

let slide_index = 1;
displaySlides(slide_index);

function nextSlide(n) {
  displaySlides((slide_index += n));
}

function currentSlide(n) {
  displaySlides((slide_index = n));
}

function displaySlides(n) {
  let i;
  let slides = document.getElementsByClassName("showSlide");
  if (n > slides.length) {
    slide_index = 1;
  }
  if (n < 1) {
    slide_index = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slide_index - 1].style.display = "block";
}
