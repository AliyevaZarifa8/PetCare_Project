let navbar = document.querySelector("#navbar");
const upIcon = document.querySelector("#upicon");
navbar.style.background = "#2e8b57";
let searchInp = document.querySelector("#search");
let tBody = document.querySelector("tbody");
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
const branchesUrl = "http://localhost:8080/branches";

async function drawBranches() {
  const res = await axios(branchesUrl);
  const data = res.data;
  getallData = data;
  spinnerInfo.style.display = "none";
  filterData = filterData.length || searchInp.value ? filterData : getallData;
  tBody.innerHTML = "";

  filterData.forEach((element) => {
    tBody.innerHTML += `
      <tr>
                  <td>
                    <i class="fa-solid fa-landmark-dome"></i> ${element.placename}
                  </td>
                  <td>
                    <i class="fa-solid fa-location-dot"></i>
                   ${element.placeposition}
                  </td>
                  <td>
                    <i class="fa-solid fa-calendar-check"></i> ${element.weekdays}
                   
                  </td>
                  <td><i class="fa-solid fa-phone-volume"></i> ${element.phone}</td>
      </tr>
          
          `;
  });
}
drawBranches();

searchInp.addEventListener("input", function (e) {
 spinnerInfo.style.display = "flex";
  filterData = getallData.filter((item) => {
    return item.placeposition
      .toLowerCase()
      .includes(e.target.value.toLowerCase());
  });
  drawBranches();
  spinnerInfo.style.display = "none";
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
