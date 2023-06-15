let navbar = document.querySelector("#navbar");
const upIcon = document.querySelector("#upicon");
const pricesDnmk = document.querySelector(".prices-dinamk");
navbar.style.background = "#2e8b57";
const pricesUrl = "http://localhost:8080/prices-plans";



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