let selectFood = document.querySelector("#select");
let searchInp = document.querySelector("#search");
let sortBtn = document.querySelector("#sort");
let showMore = document.querySelector(".showmore");
let spinnerInfo = document.querySelector("#spinnerr");
let tBody = document.querySelector("tbody");
spinnerInfo.style.display = "flex";
let foodDinamik = document.querySelector("#food-dinamik");
let filterData = [];
let getallData = [];
let sortData = [];
let evrData = [];
let sort = "asc";
const foodUrl = "http://localhost:8080/dog-food";

async function drawFood() {
  const res = await axios(foodUrl);
  const data = res.data;
  getallData = data;
  spinnerInfo.style.display = "none";
  filterData = filterData.length || searchInp.value ? filterData : getallData;

  tBody.innerHTML = "";

  filterData.forEach((element) => {
    tBody.innerHTML += `
    
    <tr>
                  <td>${element.id} </td>
                  <td> ${element.category} </td>
                  <td>${element.price}</td>
                  <td>${element.starprice}</td>
                  <td><img src=".${element.photo}"  alt="" /></td>
                  <td>  <i class="fa-solid fa-eraser" onclick=deleteFood("${element.id}")></i></td>
                  <td>  <a href="food-crud.html?id=${element.id}"><i class="fa-regular fa-pen-to-square"></i></a></td>
      </tr>
        
        `;
  });
}
drawFood();

searchInp.addEventListener("input", function (e) {
  foodDinamik.style.height = "100vh";
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

async function deleteFood(id) {
  axios.delete(`${foodUrl}/${id}`);
}

let logOut = document.querySelector(".admin-exit");

logOut.addEventListener("click", function () {
  window.location = "../index.html";
});
