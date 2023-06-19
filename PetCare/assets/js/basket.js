let navbar = document.querySelector("#navbar");
const upIcon = document.querySelector("#upicon");
navbar.style.background = "#2e8b57";

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

let basket = document.querySelector("#basket");

let favUser = JSON.parse(localStorage.getItem("favUser")) || [];

function getallBasket() {
  basket.innerHTML = "";
  favUser.forEach((element) => {
    basket.innerHTML += `
        <div class="col-3 p-2 text-center">
          <div class="card " style="width: 18rem">
            <img src="${element.photo}"  class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title text-success">Category : ${element.category} </h5>
              <hr />
              <p class="card-text text-primary">Price : ${element.price}.</p>
              <p class="card-text "> 
              <i class="fa-solid fa-star text-warning"></i>
               <i class="fa-solid fa-star text-warning"></i>
               <i class="fa-solid fa-star text-warning"></i>
               <i class="fa-solid fa-star text-warning"></i>
               <i class="fa-regular fa-star text-warning"></i>
              ${element.starprice}</p>
              <i class="fa-regular fa-heart text-danger"></i>
              <i class="fa-solid fa-eraser text-danger text-center" onclick=removeBas("${element.id}")></i>
            </div>
          </div>
        </div>
        
        `;
  });
}
getallBasket();

function removeBas(id) {
  favUser = favUser.filter((el) => el.id != id);
  localStorage.setItem("favUser", JSON.stringify(favUser));
  getallBasket();
}
