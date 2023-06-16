let formBreeds = document.querySelector(".form-breeds");
let breedsName = document.querySelector("#breedsname");
let price = document.querySelector("#prices");
let photo = document.querySelector("#photo");
let breedsText = document.querySelector("#breedstext");
let heading = document.querySelector("#heading");
let buttonText = document.querySelector(".button");
let id = new URLSearchParams(window.location.search).get("id");
const breedsUrl = "http://localhost:8080/pet-breeds";





async function editBreeds() {
    const res = await axios(`${breedsUrl}/${id}`);
    const obj = res.data;
    heading.innerHTML = "Edit Pet-Breeds";
    buttonText.innerHTML = "Edit ";
    breedsName.value = obj.breedsname;
    price.value = obj.prices;
    breedsText.value = obj.breedstext;
    // photo.value = obj.photo;
  
  }
  
  if (id) {
    editBreeds();
  }
  
  formBreeds.addEventListener("submit", function (e) {
    e.preventDefault();
  
    let obj = {
       photo: `./assets/image/${photo.value.split("\\")[2]}`,
       breedsname: breedsName.value ,
       prices:price.value,
       breedstext:breedsText.value,
    };
  
    if (id) {
      axios.put(`${breedsUrl}/${id}`, obj);
      window.location.href = "dog-breeds.html";
    } else {
      axios.post(breedsUrl, obj);
    }
  });