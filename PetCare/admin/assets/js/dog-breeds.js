let petBreeds = document.querySelector("#pet-breedss");
let selectBreeds = document.querySelector("#select");
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
let maxLen = 4;
const breedsUrl = "http://localhost:8080/pet-breeds";

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
    <div class="col-lg-3">
    <div class="card">
      <img src=".${element.photo}" alt="" />
      <h2>Dog Breeds:</h2>
      <h3>${element.breedsname}</h3>
      <i>Prices : $${element.prices}</i>
      <div>
        <p>
        ${element.breedstext.slice(0, 30)} ...
        </p>
      </div>
      <div>
      <i class="fa-solid fa-eraser" onclick=deleteBreeds("${element.id}")></i>
      <a href="breeds-crud.html?id=${element.id}"><i class="fa-regular fa-pen-to-square"></i></a>
      </div>
    </div>
  </div>
        
        `;
  });
}
drawBranches();

showMore.addEventListener("click", function () {
  getallData.length > maxLen + 3
    ? (maxLen += 4)
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




async function deleteBreeds(id) {
  axios.delete(`${breedsUrl}/${id}`);
}
