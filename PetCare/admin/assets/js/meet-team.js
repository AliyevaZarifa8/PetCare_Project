const meetCards = document.querySelector(".meet-cards");
let searchInp = document.querySelector("#search");
let sortBtn = document.querySelector("#sort");
let showMore = document.querySelector(".showmore");
let spinnerInfo = document.querySelector("#spinner");
let meetTeam = document.querySelector("#meet-team");
spinnerInfo.style.display = "flex";
let filterData = [];
let getallData = [];
let sortData = [];
let evrData = [];
let sort = "asc";
const teamUrl = "http://localhost:8080/meet-team";

async function drawTeam() {
  const res = await axios(teamUrl);
  const data = res.data;
  getallData = data;
  spinnerInfo.style.display = "none";
  filterData = filterData.length || searchInp.value ? filterData : getallData;

  meetCards.innerHTML = "";

  filterData.forEach((element) => {
    meetCards.innerHTML += `
    <div class="col-lg-4">
    <div class="card">
      <img src=".${element.photo}" alt="" />
      <div class="meet-card">
        <div class="meets-text">
          <h1>${element.fullname}</h1>
          <p>${element.position}</p>
        </div>
        <div>
                <i class="fa-solid fa-eraser" onclick=deleteTeam("${element.id}")></i>
                <a href="team-crud.html?id=${element.id}"><i class="fa-regular fa-pen-to-square"></i></a>
                </div>
      </div>
    </div>
  </div>
        
        `;
  });
}
drawTeam();

searchInp.addEventListener("input", function (e) {
  meetTeam.style.height = "100vh";
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

async function deleteTeam(id) {
  axios.delete(`${teamUrl}/${id}`);
}

let logOut = document.querySelector(".admin-exit");

logOut.addEventListener("click", function () {
  window.location = "../index.html";
});
