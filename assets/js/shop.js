let filterCount = document.getElementById("filter-count");
let num = document.getElementById("num");
let allProducts = document.getElementById("all-products");
let products = document.getElementById("products");
let next = document.getElementById("next");
let pagination = document.getElementById("pagination");

let pros = [];
let start = 0;
let end = +num.value;
let pagesCount = 0;
let nextPage = 1;

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
          <button class="btn-light">Add to cart</button>
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

function paginationUI(count) {
  for (let i = 0; i < count; i++) {
    pagination.innerHTML += `<div class="${
      nextPage === i + 1 ? "active child" : "child"
    }">${i + 1}</div>`;
  }
}

window.addEventListener("load", async () => {
  let res = await fetch("/assets/apis/shop.json");
  let data = await res.json();
  pros = [...data.products];
  pagesCount = Math.ceil(pros.length / +num.value);
  filterCount.innerText += num.value;
  allProducts.innerText += pros.length;
  productUI(pros.slice(start, end));
  paginationUI(pagesCount);
});

next.addEventListener("click", () => {
  products.innerHTML = "";
  pagination.innerHTML = "";
  nextPage += 1;
  start += +num.value;
  end = nextPage * +num.value;
  if (start < pros.length) {
    if (end > pros.lemgth) {
      end = pros.length;
    }
  } else {
    start = 0;
    end = +num.value;
    nextPage = 1;
  }
  productUI(pros.slice(start, end));
  paginationUI(pagesCount);
});

num.addEventListener("change", () => {
  products.innerHTML = "";
  pagination.innerHTML = "";
  filterCount.innerText = "";
  allProducts.innerText = "";

  filterCount.innerText += num.value;
  allProducts.innerText += pros.length;

  start = 0;
  end = +num.value;
  pagesCount = Math.ceil(pros.length / +num.value);
  nextPage = 1;

  productUI(pros.slice(start, end));
  paginationUI(pagesCount);
});
