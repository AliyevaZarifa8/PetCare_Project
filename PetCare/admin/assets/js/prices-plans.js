const pricesDnmk = document.querySelector(".prices-dinamk");
const pricesUrl = "http://localhost:8080/prices-plans";

function drawPrices(array) {
  pricesDnmk.innerHTML = "";
  array.forEach((element) => {
    pricesDnmk.innerHTML += `
 
    <div class="col-lg-5 offset-lg-1">
              <div class="card prices-card">
                <h1>${element.title}</h1>
                <h2>$ ${element.prices}</h2>
                <i>${element.daily}</i>
                <p>$ ${element.daily}</p>
                <p>$ ${element.dailypay}</p>
                <div class="card-text">
                  <p>
                  ${element.text}
                  </p>
                </div>
                <div>
                <i class="fa-solid fa-eraser" onclick=deleteCard("${element.id}")></i>
               <a href="prices-crud.html?id=${element.id}"><i class="fa-regular fa-pen-to-square"></i></a>
                </div>
              </div>
            </div>
    `;
  });
}

async function getallData() {
  const res = await axios(pricesUrl);
  const data = res.data;
  drawPrices(data);
}

getallData();

async function deleteCard(id) {
  axios.delete(`${pricesUrl}/${id}`);
}


let logOut=document.querySelector(".admin-exit");


logOut.addEventListener("click", function(){
    window.location="../index.html"
})