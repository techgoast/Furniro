let navSearchIcon = document.getElementById("nav-search-icon");
let navSearch = document.getElementById("nav-search");
let navSearchInput = document.getElementById("nav-search-input");
let navSearchWarning = document.getElementById("nav-warning");
let shoppingCart = document.getElementById("shopping-cart");
let paths = document.querySelectorAll("path");
let cartSideBar = document.getElementById("cart-side-bar");
let navMenu = document.getElementById("nav-menu");
let navMenuSpans = document.querySelectorAll("#nav-menu span");
let navLinks = document.getElementById("links");

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
  navLinks.classList.remove("show");
  navSearch.classList.remove("show");
});

navSearchIcon.addEventListener("click", () => {
  navLinks.classList.remove("show");
  cartSideBar.classList.remove("show");
  if (navSearchInput.value === "") {
    if (navSearch.classList.contains("show")) {
      navSearchWarning.classList.add("show");
    } else {
      navSearch.classList.toggle("show");
    }
  } else {
    location.href = "./single-product.html"
  }
});
navSearch.addEventListener("submit", (e) => {
    e.preventDefault()
    if (navSearchInput.value === "") {
    navSearchWarning.classList.add("show");
    navSearchInput.blur()
  } else {
    location.href = "./single-product.html"
  }
});

navSearchInput.addEventListener("focus", () => {
  navSearchWarning.classList.remove("show");
})

navMenu.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  navSearch.classList.remove("show");
  cartSideBar.classList.remove("show");
});

window.addEventListener("click", (e) => {
  let deleteShow = true;
  if (e.target === navMenu || e.target === shoppingCart || e.target === navSearchIcon || e.target === navSearchInput) {
    deleteShow = false;
  } else {
    for (const span of navMenuSpans) {
      if (e.target === span) {
        deleteShow = false;
        break;
      }
    }
    for (const child of shoppingCart.children) {
      if (e.target === child) {
        deleteShow = false;
        break;
      }
    }
    for (const child of navSearchIcon.children) {
      if (e.target === child) {
        deleteShow = false;
        break;
      }
    }
    for (const path of paths) {
      if (e.target === path) {
        deleteShow = false;
        break;
      }
    }
  }
  deleteShow && navLinks.classList.remove("show");
  deleteShow && cartSideBar.classList.remove("show");
  deleteShow && navSearch.classList.remove("show");
  deleteShow && navSearchWarning.classList.remove("show");
});
