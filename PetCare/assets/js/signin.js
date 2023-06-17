let formSign = document.querySelector(".sign");
let fullName = document.querySelector("#fullname");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let sbmtBtn = document.querySelector(".button");

let signUrl = "http://localhost:8080/sigin";

formSign.addEventListener("submit", function (e) {
  e.preventDefault();

  let obj = {
    email: email.value,
    fullname: fullName.value,
    password: password.value,
  };

  axios.post(signUrl, obj);
  window.location = "index.html";
});
