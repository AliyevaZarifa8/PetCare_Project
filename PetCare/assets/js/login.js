let formLogin = document.querySelector(".login");
let userName = document.querySelector("#username");
let passWord = document.querySelector("#password");
let signUrl = "http://localhost:8080/sigin";
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

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  let res = await axios(signUrl);
  let data = await res.data;
  console.log(data);
  if (
    data.find(
      (obj) => obj.fullname == userName.value && obj.password == passWord.value
    )
  ) {
    window.location = "index.html";
  }
  if (
    data.find(
      (obj) => obj.fullname == "Zarifa Aliyeva" && obj.password == "zarifa123"
    )
  ) {
    window.location = "./admin/admin.html";
  } else {
    alert("This account does not exist, please signin!");
    window.location = "signin.html";
  }
});
