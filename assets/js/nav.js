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
  cartSideBar.innerHTML = "";
  cartSideBar.innerHTML += `
  <div class="top">
      <h2>Shopping Cart</h2>
      <div class="cart-products">
        <div class="product">
          <div class="image">
            <img
              loading="lazy"
              src="./assets/images/cart-side-bar1.webp"
              alt="cart-side-bar1"
            />
          </div>
          <div class="info">
            <h3>Asgaard sofa</h3>
            <p>
              <span>1 x</span>
              <span>Rs. 2,500.00</span>
            </p>
          </div>
        </div>
        <div class="product">
          <div class="image">
            <img
              loading="lazy"
              src="./assets/images/cart-side-bar2.webp"
              alt="cart-side-bar2"
            />
          </div>
          <div class="info">
            <h3>Casaliving Wood</h3>
            <p>
              <span>1 x</span>
              <span>Rs. 2,700.00</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <p class="sub-total">
        <span>Subtotal</span>
        <span>Rs. 5,200.00</span>
      </p>
      <div class="actions">
        <a href="cart.html">Cart</a>
        <a href="check-out.html">Check Out</a>
      </div>
    </div>  
  `;
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
