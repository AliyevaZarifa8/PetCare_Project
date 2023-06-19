let searchInp = document.querySelector("#search");
let tBody = document.querySelector("tbody");
let spinnerInfo = document.querySelector("#spinner");
spinnerInfo.style.display = "flex";
let branchesWork = document.querySelector("#branches-work");
let showMore = document.querySelector(".showmore");
let filterData = [];
let getallData = [];

const branchesUrl = "http://localhost:8080/branches";

async function drawBranches() {
  const res = await axios(branchesUrl);
  const data = res.data;
  getallData = data;
  spinnerInfo.style.display = "none";
  filterData =
    filterData.length || searchInp.value
      ? filterData : getallData;
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
                  <td>  <i class="fa-solid fa-eraser" onclick=deleteBranches("${element.id}")></i></td>
                  <td>  <a href="branches-crud.html?id=${element.id}"><i class="fa-regular fa-pen-to-square"></i></a></td>
      </tr>
          
          `;
  });
}
drawBranches();

searchInp.addEventListener("input", function (e) {
  branchesWork.style.height = "100vh";
  spinnerInfo.style.display = "flex";
  filterData = getallData.filter((item) => {
    return item.placeposition
      .toLowerCase()
      .includes(e.target.value.toLowerCase());
  });
  drawBranches();
  spinnerInfo.style.display = "none";
});


async function deleteBranches(id) {
  axios.delete(`${branchesUrl}/${id}`);
}


let logOut=document.querySelector(".admin-exit");


logOut.addEventListener("click", function(){
    window.location="../index.html"
})
