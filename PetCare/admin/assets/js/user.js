let logOut = document.querySelector(".admin-exit");
let isAdmin = document.querySelector("#isadmin");
const userUrl = "http://localhost:8080/sigin";
let searchInp = document.querySelector("#search");
let tBody = document.querySelector("tbody");
let spinnerInfo = document.querySelector("#spinner");
let userWork = document.querySelector("#user-work");
spinnerInfo.style.display = "flex";
let showMore = document.querySelector(".showmore");
let filterData = [];
let getallData = [];

logOut.addEventListener("click", function () {
  window.location = "../index.html";
});

async function drawUser() {
  const res = await axios(userUrl);
  const data = res.data;
  getallData = data;

  spinnerInfo.style.display = "none";
  filterData = filterData.length || searchInp.value ? filterData : getallData;
  tBody.innerHTML = "";

  filterData.forEach((element) => {
    tBody.innerHTML += `
        <tr>
                    <td>${element.id}</td>
                    <td>${element.fullname}</td>
                    <td>${element.email}</td>
                    <td>${element.isadmin}</td>

                    
                    <td><i id="isadmin" class="fa-solid fa-unlock-keyhole"  onclick=IsAdmin("${element.id}")></i></td>

                    <td>  <i class="fa-solid fa-eraser" onclick=deleteUser("${element.id}")></i></td>
        </tr>
            
            `;
  });
}
drawUser();

searchInp.addEventListener("input", function (e) {
  userWork.style.height = "100vh";
  spinnerInfo.style.display = "flex";
  filterData = getallData.filter((item) => {
    return item.fullname.toLowerCase().includes(e.target.value.toLowerCase());
  });
  drawUser();
  spinnerInfo.style.display = "none";
});

async function IsAdmin(id) {
  let res = await axios(`${userUrl}/${id}`);
  let data = res.data;
  console.log(data);
  if (data.isadmin==false) {
    alert(
      `Are you sure you want to make user id  ${data.fullname} an admin ?`
    );
  } else {
    alert(`Are you sure you want to remove user id  ${data.fullname} an admin ?`);
  }

  let obj = {
    isadmin: !data.isadmin,
  };
  axios.patch(`${userUrl}/${id}`, obj);
}


async function deleteUser(id) {
    axios.delete(`${userUrl}/${id}`);
  }
  