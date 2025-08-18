let sizePicker = document.querySelectorAll("#size-pick div");
let colorPicker = document.querySelectorAll("#color-pick div");
let addForm = document.getElementById("add-form");
let formRes = document.getElementById("form-res");
let shareRes = document.getElementById("share-res");
let platForms = document.querySelectorAll("#share-platform .platform");
let categories = document.querySelectorAll("#categories div");
let description = document.querySelectorAll("#desc div");
let products = document.getElementById("related-products");
let showMore = document.getElementById("show-more");
let showLess = document.getElementById("show-less");


let pros = [];

function productUI(data) {
  data.forEach((element) => {
    products.innerHTML += `
      <a
        href="single-product.html"
        class="product"
        ${element.discount ? `data-before=""` : ""}
        ${element.discount ? `dicount="${element.discount}"` : ""}
      >
        <div class="image">
          <img src="${element.image}" alt="${element.title} img" />
        </div>
        <div class="content">
          <h3>${element.title}</h3>
          <p>${element.desc}</p>
          <p class="price">
            <span>Rp ${element.currentPrice.toLocaleString()}</span>
            <span>${
              element.previousPrice
                ? `Rp ${element.previousPrice.toLocaleString()}`
                : ""
            }</span>
          </p>
        </div>
        <div class="over-lay">
          <button class="btn-light">Product Details</button>
          <div class="options">
            <span><i class="fa-solid fa-square-share-nodes"></i>share</span>
            <span><i class="fa-solid fa-code-compare"></i>compare</span>
            <span><i class="fa-solid fa-heart"></i>like</span>
          </div>
        </div>
      </a>
    `;
  });
}


window.addEventListener("load", async () => {
  let res = await fetch("./assets/apis/home.json");
  let data = await res.json();
  pros = [...data.ourProducts];
  productUI(pros.slice(0, 4));
});

showMore.addEventListener("click", (e) => {
  products.innerHTML = "";
  productUI(pros);
  e.target.parentElement.classList.toggle("hide");
  showLess.parentElement.classList.toggle("hide");
});

showLess.addEventListener("click", (e) => {
  products.innerHTML = "";
  productUI(pros.slice(0, 4));
  e.target.parentElement.classList.toggle("hide");
  showMore.parentElement.classList.toggle("hide");
});

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
  formRes.classList.remove("hide");
})

formRes.addEventListener("click", (e) => {
  e.target.classList.add("hide");
  location.href = "/cart.html";
})

shareRes.addEventListener("click", (e) => {
  e.target.classList.add("hide");
})

platForms.forEach(platForm => {
  platForm.addEventListener("click", () => {
    shareRes.classList.remove("hide");
  })
})

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
