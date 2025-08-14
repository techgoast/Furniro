let products = document.getElementById("products");
let showMore = document.getElementById("show-more");
let showLess = document.getElementById("show-less");
let nextP = document.getElementById("nextP");
let showIns = document.getElementById("showIns");
let gallery = document.getElementById("gallery");
let dots = document.getElementById("dots");

let pros = [];
let galleryData = [];
let showImg = 0;

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

function showInsUI(img) {
  showIns.innerHTML = `<img src="${img}" alt="${img}" />`;
}

function inspirationUI(data) {
  galleryData.forEach((img) => {
    gallery.innerHTML += `<img src="${img}" alt="${img}" />`;
  });
}

function dotsUI(data) {
  for (let i = 0; i < data.length; i++) {
    dots.innerHTML += `<div class=${i === showImg ? "active" : ""}></div>`;
  }
}

window.addEventListener("load", async () => {
  let res = await fetch("/assets/apis/home.json");
  let data = await res.json();
  pros = [...data.ourProducts];
  galleryData = [...data.slider];
  productUI(pros.slice(0, 4));
  showInsUI(galleryData[showImg]);
  inspirationUI(galleryData);
  dotsUI(galleryData);
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

nextP.addEventListener("click", () => {
  showIns.innerHTML = "";
  dots.innerHTML = "";
  if (showImg < galleryData.length - 1) {
    showImg += 1;
  } else {
    showImg = 0;
  }
  showInsUI(galleryData[showImg]);
  dotsUI(galleryData);
});
