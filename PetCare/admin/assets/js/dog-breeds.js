let petBreeds = document.querySelector("#pet-breedss");
let selectBreeds = document.querySelector("#select");
let searchInp = document.querySelector("#search");
let sortBtn = document.querySelector("#sort");
let showMore = document.querySelector(".showmore");
let spinnerInfo = document.querySelector("#spinner");
let petBreeds3 = document.querySelector("#pet-breeds3");
spinnerInfo.style.display = "flex";
let filterData = [];
let getallData = [];
let sortData = [];
let evrData = [];
let sort = "asc";

const breedsUrl = "http://localhost:8080/pet-breeds";

async function drawBranches() {
  const res = await axios(breedsUrl);
  const data = res.data;
  getallData = data;
  spinnerInfo.style.display = "none";
  filterData = filterData.length || searchInp.value ? filterData : getallData;

  petBreeds.innerHTML = "";

  filterData.forEach((element) => {
    petBreeds.innerHTML += `
    <div class="col-lg-4">
    <div class="card">
      <img src=".${element.photo}" alt="" />
      <h2>Dog Breeds:</h2>
      <h3>${element.breedsname}</h3>
      <i>Prices : $${element.prices}</i>
      <div>
        <p>
        ${element.breedstext.slice(0, 40)} ...
        </p>
      </div>
      <div>
      <i class="fa-solid fa-eraser" onclick=deleteBreeds("${element.id}")></i>
      <a href="breeds-crud.html?id=${element.id}">
      <i class="fa-regular fa-pen-to-square"></i></a>
      </div>
    </div>
  </div>
        
        `;
  });
}
drawBranches();

searchInp.addEventListener("input", function (e) {
  petBreeds3.style.height = "100vh";
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

async function deleteBreeds(id) {
  axios.delete(`${breedsUrl}/${id}`);
}


let logOut=document.querySelector(".admin-exit");


logOut.addEventListener("click", function(){
    window.location="../index.html"
})