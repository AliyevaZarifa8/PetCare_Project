let formMeet = document.querySelector(".form-meet");
let fullName = document.querySelector("#fullname");
let position = document.querySelector("#position");
let photo = document.querySelector("#photo");
let buttonText = document.querySelector(".button");
let id = new URLSearchParams(window.location.search).get("id");
const teamUrl = "http://localhost:8080/meet-team";



let logOut=document.querySelector(".admin-exit");


logOut.addEventListener("click", function(){
    window.location="../index.html"
})



async function editTeam() {
    const res = await axios(`${teamUrl}/${id}`);
    const obj = res.data;
    heading.innerHTML = "Edit Team";
    buttonText.innerHTML = "Edit ";
    // photo.value = obj.photo;
    position.value = obj.position;
    fullName.value = obj.fullname;
  }
  
  if (id) {
    editTeam();
  }
  
  formMeet.addEventListener("submit", function (e) {
    e.preventDefault();
  
    let obj = {
        photo:  `./assets/image/${photo.value.split("\\")[2]}`,
        fullname: fullName.value ,
        position: position.value,
       
    };
  
    if (id) {
      axios.put(`${teamUrl}/${id}`, obj);
      window.location.href = "meet-team.html";
    } else {
      axios.post(teamUrl, obj);
    }
  });