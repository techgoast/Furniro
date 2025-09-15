let mainContainer = document.getElementById("main-container");
let categories = document.querySelectorAll("#categories div");
let description = document.querySelectorAll("#desc div");
let pathTitle = document.getElementById("path-title");
let products = document.getElementById("related-products");
let showMore = document.getElementById("show-more");
let showLess = document.getElementById("show-less");


let pros = [];
let targetProduct = {};

function productUI(data) {
  data.forEach((element, i) => {
    products.innerHTML += `
      <a
        href="./single-product.html?productName=${element.title}"
        class="product"
        ${element.discount ? `data-before=""` : ""}
        ${element.discount ? `dicount="${element.discount}"` : ""}
        id="link-${i}"
      >
        <div class="image">
          <img src="${element.image}" alt="${element.title} img" />
        </div>
        <div class="content">
          <h3>${element.title}</h3>
          <p>${element.desc}</p>
          <p class="price">
            <span>$ ${element.currentPrice.toLocaleString()}</span>
            <span>${
              element.previousPrice
                ? `$ ${element.previousPrice.toLocaleString()}`
                : ""
            }</span>
          </p>
        </div>
        <div class="over-lay" id="over-lay-${i}">
        <button class="btn-light">Product Details</button>
        </div>
      </a>
    `;
  });
}

function productDetailsUI(product) {
  mainContainer.innerHTML += `
    <div class="images">
      <div class="main-image">
        <img
          fetchpriority="high"
          src="${product.image}"
          alt="single-image"
        />
      </div>
    </div>
    <div class="text">
      <h2>${product.title}</h2>
      <div class="price">$ ${product.currentPrice}</div>
      <div class="rating">
        <div class="rate">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="reviews">5 Customer Review</div>
      </div>
      <p>
        Setting the bar as one of the loudest speakers in its class, the
        Kilburn is a compact, stout-hearted hero with a well-balanced audio
        which boasts a clear midrange and extended highs for a sound.
      </p>
      <div class="size">
        <h3>Size</h3>
        <div class="size-pick" id="size-pick">
          <div class="size1 choosen" id="size-l">L</div>
          <div class="size2" id="size-xl">XL</div>
          <div class="size3" id="size-xs">XS</div>
        </div>
      </div>
      <div class="color">
        <h3>Color</h3>
        <div class="color-pick" id="color-pick">
          <div class="color1 choosen" id="color-violet"></div>
          <div class="color2" id="color-black"></div>
          <div class="color3" id="color-golden"></div>
        </div>
      </div>
      <form action="" id="add-form">
        <input type="number" value="1" id="quantity" name="quantity" aria-label="quantity"/>
        <input type="submit" value="Add To Cart" />
      </form>
      <div class="info">
        <div class="model"><span>sku</span> : &nbsp;SS001</div>
        <div class="category"><span>Category</span> : &nbsp;Sofas</div>
        <div class="tags">
          <span>Tags</span> : &nbsp;Sofa, Chair, Home, Shop
        </div>
      </div>
    </div>
  `
}

function pathTitleText (product) {
  pathTitle.innerText = product.title
}

window.addEventListener("load", async () => {
  let params = new URLSearchParams(location.search)
  let res = await fetch("./assets/apis/shop.json");
  let data = await res.json();
  pros = [...data.products];
  targetProduct = pros.find((p) => p.title === params.get("productName") && p.id === +params.get("productId"))
  targetProduct &&  pathTitleText (targetProduct);
  targetProduct ? productDetailsUI(targetProduct) : mainContainer.innerHTML += `<div style="color:red">There Is No Product Match Your Search</div>`;
  targetProduct && assignEvents() ;
  productUI(pros.slice(0, 4));
});

showMore.addEventListener("click", (e) => {
  products.innerHTML = "";
  productUI(pros.slice(0,8));
  e.target.parentElement.classList.toggle("hide");
  showLess.parentElement.classList.toggle("hide");
});

showLess.addEventListener("click", (e) => {
  products.innerHTML = "";
  productUI(pros.slice(0, 4));
  e.target.parentElement.classList.toggle("hide");
  showMore.parentElement.classList.toggle("hide");
  products.scrollIntoView({behavior:"smooth"})
});

function assignEvents() {
  let sizePicker = document.querySelectorAll("#size-pick div");
  let colorPicker = document.querySelectorAll("#color-pick div");
  let addForm = document.getElementById("add-form");

  sizePicker.forEach(size => {
    size.addEventListener("click", (e) => {
      sizePicker.forEach(siz => {
        siz.classList.remove("choosen");
      })
      e.target.classList.add("choosen");
    })
  })

  colorPicker.forEach(color => {
    color.addEventListener("click", (e) => {
      colorPicker.forEach(col => {
        col.classList.remove("choosen");
      })
      e.target.classList.add("choosen");
    })
  })

  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    location.href = "./cart.html";
  })
}

categories.forEach((category, i)=> {
  category.addEventListener("click", (e) => {
    categories.forEach(cat => {
      cat.classList.remove("active");
    })
    description.forEach((div, j) => {
      div.classList.remove("active");
      if(i === j) {
        div.classList.add("active");
      }
    })
    e.target.classList.add("active");
  })
})
