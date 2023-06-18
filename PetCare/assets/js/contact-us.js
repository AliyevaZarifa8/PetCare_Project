let navbar = document.querySelector("#navbar");
const upIcon = document.querySelector("#upicon");
navbar.style.background = "#2e8b57";

function scrollFun() {
  let x =
    document.body.scrollTop > 200 || document.documentElement.scrollTop > 200;
  if (x) {
    upIcon.style.display = "block";
  } else {
    upIcon.style.display = "none";
  }
}

window.addEventListener("scroll", function () {
  scrollFun();
});

upIcon.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

let formContactus = document.querySelector(".form-contactus");
let exampleInputFirstName = document.querySelector("#exampleInputFirstName");
let exampleInputLastName = document.querySelector("#exampleInputLastName");
let exampleInputEmail = document.querySelector("#exampleInputEmail1");
let exampleInputPhoto = document.querySelector("#exampleInputPhoto");
let phone = document.querySelector("#phone");
let textArea = document.querySelector("#textArea");
let selectInfo = document.querySelector("#select");
let sbmtBtn = document.querySelector(".button");

let contactUrl = "http://localhost:8080/contact";

formContactus.addEventListener("submit", function (e) {
  e.preventDefault();

  let obj = {
    photo: `./assets/image/${exampleInputPhoto.value.split("\\")[2]}`,
    email: exampleInputEmail.value,
    firstname: exampleInputFirstName.value,
    lastname: exampleInputLastName.value,
    phone: phone.value,
    commit: textArea.value,
    select: selectInfo.value,
  };

  axios.post(contactUrl, obj);
});
