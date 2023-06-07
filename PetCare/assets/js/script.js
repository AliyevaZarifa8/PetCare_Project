let navbar = document.querySelector("#navbar");

function scrollFun() {
  let x =
    document.body.scrollTop > 400 || document.documentElement.scrollTop > 400;
  if (x) {
    navbar.style.background = "#2e8b57";
  } else {
    navbar.style.background = "";
  }
}

window.addEventListener("scroll", function () {
  scrollFun();
});
