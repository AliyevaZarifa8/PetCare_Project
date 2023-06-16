let formFood = document.querySelector(".form-food");
let categoryy = document.querySelector("#categoryy");
let price = document.querySelector("#price");
let photo = document.querySelector("#photo");
let starPrice = document.querySelector("#starprice");
let heading = document.querySelector("#heading");
let buttonText = document.querySelector(".button");
let id = new URLSearchParams(window.location.search).get("id");
const foodUrl = "http://localhost:8080/dog-food";





async function editFood() {
    const res = await axios(`${foodUrl}/${id}`);
    const obj = res.data;
    heading.innerHTML = "Edit Pet-Food";
    buttonText.innerHTML = "Edit ";
    categoryy.value = obj.category;
    price.value = obj.price;
    starPrice.value = obj.starprice;
    // photo.value = obj.photo;
  
  }
  
  if (id) {
    editFood();
  }
  
  formFood.addEventListener("submit", function (e) {
    e.preventDefault();
  
    let obj = {
       photo: `./assets/image/${photo.value.split("\\")[2]}`,
       category: categoryy.value ,
       price:price.value,
       starprice:starPrice.value,
    };
  
    if (id) {
      axios.put(`${foodUrl}/${id}`, obj);
      window.location.href = "dog-food.html";
    } else {
      axios.post(foodUrl, obj);
    }
  });
  