let searchInp = document.querySelector("#search");
let tBody = document.querySelector("tbody");
let spinnerInfo = document.querySelector("#spinner");
spinnerInfo.style.display = "flex";
let showMore = document.querySelector(".showmore");
let filterData = [];
let getallData = [];
let maxLen = 5;
const branchesUrl = "http://localhost:8080/branches";

async function drawBranches() {
  const res = await axios(branchesUrl);
  const data = res.data;
  getallData = data;
  spinnerInfo.style.display = "none";
  filterData =
    filterData.length || searchInp.value
      ? filterData.slice(0, maxLen)
      : getallData.slice(0, maxLen);
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
                  <td>  <i class="fa-solid fa-eraser"></i></td>
                  <td>  <a href=""><i class="fa-regular fa-pen-to-square"></i></a></td>
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

showMore.addEventListener("click", function () {
  getallData.length > maxLen + 4
    ? (maxLen += 5)
    : (maxLen = maxLen - (maxLen - getallData.length));
  drawBranches();
  filterData = getallData.slice(0, maxLen);
});
