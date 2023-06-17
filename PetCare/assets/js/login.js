let formLogin = document.querySelector(".login");
let userName = document.querySelector("#username");
let passWord = document.querySelector("#password");
let signUrl = "http://localhost:8080/sigin";

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
      (obj) => obj.fullname == "Zarifa Aliyeva" && obj.password =="zarifa123"
    )
  ) {
    window.location = "./admin/admin.html";
  } 
  
  else {
    alert("This account does not exist, please signin!");
    window.location = "signin.html";
  }
});
