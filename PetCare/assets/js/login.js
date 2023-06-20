let formLogin = document.querySelector(".login");
let sbmtBtn = document.querySelector(".button");
let userName = document.querySelector("#username");
let passWord = document.querySelector("#password");
let signUrl = "http://localhost:8080/sigin";
let navbar = document.querySelector("#navbar");
const upIcon = document.querySelector("#upicon");
navbar.style.background = "#2e8b57";
const menuIcon = document.querySelector("#menu");
const menuBar = document.querySelector("#menubar");
const closeIcon = document.querySelector("#close");

menuBar.style.display = "none";

menuIcon.addEventListener("click", function () {

  menuBar.style.display = "block";
});
closeIcon.addEventListener("click", function () {

  menuBar.style.display = "none";
});

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

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  let res = await axios(signUrl);
  let data = await res.data;



  if (!userName.value && !passWord.value) {
    alert("Pls enter username and password !");
    window.location = "login.html";
  } else if (
    data.find(
      (obj) =>
        obj.fullname == userName.value &&
        obj.password == passWord.value &&
        obj.isadmin == false
    )
  ) {
    window.location = "index.html";
  } else if (
    data.find(
      (obj) =>
        obj.fullname == userName.value &&
        obj.password == passWord.value &&
        obj.isadmin == true
    
  )) {
    window.location = "./admin/admin.html";
  } else {
    alert("This account does not exist, please signin!");
    window.location = "signin.html";
  }
});
