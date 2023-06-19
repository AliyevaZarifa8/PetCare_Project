let contactUrl = "http://localhost:8080/contact";
let showMore = document.querySelector(".showmore");
let meessagesCard = document.querySelector(".meessages");

let getallData = [];
let filterData = [];

async function drawMessages() {
  const res = await axios(contactUrl);
  const data = res.data;
  getallData = data;
  filterData = getallData;

  meessagesCard.innerHTML = "";

  filterData.forEach((element) => {
    meessagesCard.innerHTML += `
      <div class="col-lg-9 offset-lg-3">
      <div class="card">
        <div id="img-text">
          <img src=".${element.photo}" alt="" />
          <b><i>${element.lastname} ${element.firstname}</i></b>
        </div>
        <div id="text">
        <p>Tel : ${element.phone} </p>
          <p>Email : ${element.email} </p>
          <p>Commit : ${element.commit} </p>
          <i>Dog Breeds :${element.select} </i>
          </div>
          <div id="icon">
          <i class="fa-solid fa-eraser" onclick=deleteCard("${element.id}")></i>
          </div>
      </div>
    </div>
          `;
  });
}
drawMessages();

async function deleteCard(id) {
  await axios.delete(`${contactUrl}/${id}`);
}


let logOut=document.querySelector(".admin-exit");


logOut.addEventListener("click", function(){
    window.location="../index.html"
})