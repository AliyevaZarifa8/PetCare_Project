let formSign = document.querySelector(".sign");
let fullName = document.querySelector("#fullname");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let sbmtBtn = document.querySelector(".button");
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
let signUrl = "http://localhost:8080/sigin";

formSign.addEventListener("submit", function (e) {
  e.preventDefault();

  let obj = {
    email: email.value,
    fullname: fullName.value,
    password: password.value,
    isadmin: false,
  };


  fullName.value && password.value
  ? axios.post(signUrl, obj) && (window.location = "index.html")
  :alert("pls fill form :(")
});

