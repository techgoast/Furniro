let shoppingCart = document.getElementById("shopping-cart");
let cartSideBar = document.getElementById("cart-side-bar");
let navMenu = document.getElementById("nav-menu");
let navNavigator = document.getElementById("nav-navigator");
let subscribeForm = document.getElementById("subscribe-form");
let subscribeEmail = document.getElementById("subscribe-email");
let subscribeRes = document.getElementById("subscribe-res");
let subscribeSuccess = document.getElementById("subscribe-success");
let subscribeFailed = document.getElementById("subscribe-failed");

shoppingCart.addEventListener("click", () => {
  cartSideBar.classList.toggle("show");
});

navMenu.addEventListener("click", () => {
  navNavigator.classList.toggle("show");
});

subscribeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (subscribeEmail.value === "") {
    subscribeRes.classList.remove("hide");
    subscribeFailed.classList.remove("hide");
  } else {
    subscribeRes.classList.remove("hide");
    subscribeSuccess.classList.remove("hide");
  }
});

subscribeRes.addEventListener("click", () => {
  subscribeRes.classList.add("hide");
  subscribeSuccess.classList.add("hide");
  subscribeFailed.classList.add("hide");
  subscribeEmail.value = "";
});
