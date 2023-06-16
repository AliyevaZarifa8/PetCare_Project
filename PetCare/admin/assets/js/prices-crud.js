let formPrices = document.querySelector(".form-prices");
let title = document.querySelector("#title");
let price = document.querySelector("#price");
let daily = document.querySelector("#daily");
let dailyPay = document.querySelector("#dailypay");
let dailyText = document.querySelector("#dailytext");
let heading = document.querySelector("#heading");
let text = document.querySelector("#text");
let buttonText = document.querySelector(".button");
let id = new URLSearchParams(window.location.search).get("id");
const pricesUrl = "http://localhost:8080/prices-plans";





async function editCard() {
    const res = await axios(`${pricesUrl}/${id}`);
    const obj = res.data;
    heading.innerHTML = "Edit Prices-Plans";
    buttonText.innerHTML = "Edit ";
    title.value = obj.title;
    price.value = obj.prices;
    daily.value = obj.daily;
    dailyPay.value = obj.dailypay;
    dailyText.value = obj.dailyextr;
    text.value = obj.text;
  }
  
  if (id) {
    editCard();
  }
  
  formPrices.addEventListener("submit", function (e) {
    e.preventDefault();
  
    let obj = {
       title: title.value,
       prices: price.value ,
       daily:daily.value,
       dailypay:dailyPay.value,
       dailyextr:dailyText.value,
       text:text.value 
    };
  
    if (id) {
      axios.put(`${pricesUrl}/${id}`, obj);
      window.location.href = "prices-plans.html";
    } else {
      axios.post(pricesUrl, obj);
    }
  });
  