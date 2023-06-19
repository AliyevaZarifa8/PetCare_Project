let formBranches = document.querySelector(".form-branches");
let placeName = document.querySelector("#placename");
let placePosition = document.querySelector("#placeposition");
let weekDays = document.querySelector("#weekdays");
let phone = document.querySelector("#phone");
let buttonText = document.querySelector(".button");
let id = new URLSearchParams(window.location.search).get("id");
const branchesUrl = "http://localhost:8080/branches";




let logOut=document.querySelector(".admin-exit");


logOut.addEventListener("click", function(){
    window.location="../index.html"
})


async function editBranches() {
    const res = await axios(`${branchesUrl}/${id}`);
    const obj = res.data;
    heading.innerHTML = "Edit Branches";
    buttonText.innerHTML = "Edit ";
    placeName.value = obj.placename;
    placePosition.value = obj.placeposition;
    weekDays.value = obj.weekdays;
    phone.value = obj.phone;
    
  }
  
  if (id) {
    editBranches();
  }
  
  formBranches.addEventListener("submit", function (e) {
    e.preventDefault();
  
    let obj = {
        placename: placeName.value,
        placeposition: placePosition.value ,
        weekdays:weekDays.value,
        phone:phone.value,
    };
  
    if (id) {
      axios.put(`${branchesUrl}/${id}`, obj);
      window.location.href = "branches-info.html";
    } else {
      axios.post(branchesUrl, obj);
    }
  });