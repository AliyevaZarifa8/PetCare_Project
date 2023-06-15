let contactUrl = "http://localhost:8080/contact";
let showMore = document.querySelector(".showmore");
let meessagesCard = document.querySelector(".meessages");
let maxLen = 2;
let getallData = [];
let filterData = [];

async function drawMessages() {
  const res = await axios(contactUrl);
  const data = res.data;
  getallData = data;
  filterData = getallData.slice(0, maxLen);

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
          <p>Email : ${element.email} </p>
          <p>Commit : ${element.commit} </p>
          <i>Dog Breeds :${element.select} </i>
          </div>
          <div id="icon">
          <i class="fa-solid fa-eraser"></i>
          </div>
        
      </div>
    </div>
          
          `;
  });
}
drawMessages();

showMore.addEventListener("click", function () {
  getallData.length > maxLen + 3
    ? (maxLen += 3)
    : (maxLen = maxLen - (maxLen - getallData.length));
  drawMessages();
  filterData = getallData.slice(0, maxLen);
});
