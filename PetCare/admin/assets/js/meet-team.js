const meetCards = document.querySelector(".meet-cards");
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
let maxLen = 3;
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
    <div class="col-lg-4">
    <div class="card">
      <img src=".${element.photo}" alt="" />
      <div class="meet-card">
        <div class="meets-text">
          <h1>${element.fullname}</h1>
          <p>${element.position}</p>
        </div>
        <div>
                <i class="fa-solid fa-eraser"></i>
                <a href=""><i class="fa-regular fa-pen-to-square"></i></a>
                </div>
      </div>
    </div>
  </div>
        
        `;
  });
}
drawTeam();

showMore.addEventListener("click", function () {
  getallData.length > maxLen + 2
    ? (maxLen += 3)
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
