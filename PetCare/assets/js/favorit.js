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

let favorit = document.querySelector("#favorit");

let favFood = JSON.parse(localStorage.getItem("favFoods")) || [];

function getallFavFood() {
  favorit.innerHTML = "";
  favFood.forEach((element) => {
    favorit.innerHTML += `
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
             
              <i class="fa-solid fa-eraser text-danger text-center" onclick=removeFav("${element.id}")></i>
            </div>
          </div>
        </div>
        
        `;
  });
}
getallFavFood();

function removeFav(id) {
  favFood = favFood.filter((el) => el.id != id);
  localStorage.setItem("favFoods", JSON.stringify(favFood));
  getallFavFood();
}
