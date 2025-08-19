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
  data.forEach((element, i) => {
    products.innerHTML += `
      <a
        href="single-product.html"
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
            <span>Rp ${element.currentPrice.toLocaleString()}</span>
            <span>${
              element.previousPrice
                ? `Rp ${element.previousPrice.toLocaleString()}`
                : ""
            }</span>
          </p>
        </div>
        <div class="over-lay" id="over-lay-${i}">
        </div>
      </a>
    `;
  });
  assignHover(data);
}

function showInsUI(img) {
  showIns.innerHTML = `<img src="${img}" alt="${img}" />`;
}

function inspirationUI(data) {
  galleryData.forEach((img) => {
    gallery.innerHTML += `<img src="${img.first}" alt="${img.first}" />`;
  });
}

function dotsUI(data) {
  for (let i = 0; i < data.length; i++) {
    dots.innerHTML += `<div class=${i === showImg ? "active" : ""}></div>`;
  }
}

window.addEventListener("load", () => {
  setTimeout(async () => {
    let res = await fetch("./assets/apis/home.json");
    let data = await res.json();
    pros = [...data.ourProducts];
    galleryData = [...data.slider];
    productUI(pros.slice(0, 4));
    showInsUI(galleryData[showImg].second);
    inspirationUI(galleryData);
    dotsUI(galleryData);
  },0)
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
  showInsUI(galleryData[showImg].second);
  dotsUI(galleryData);
});

function assignHover(data) {
  let overLayList = document.querySelectorAll("#products .over-lay");
  overLayList.forEach(el => {
    el.addEventListener("mouseover", () => {
      el.innerHTML = "";
      el.innerHTML += `
        <button class="btn-light">Product Details</button>
        <div class="options">
          <span><i class="fa-solid fa-square-share-nodes"></i>share</span>
          <span><i class="fa-solid fa-code-compare"></i>compare</span>
          <span><i class="fa-solid fa-heart"></i>like</span>
        </div>
      `
    })
  })
}