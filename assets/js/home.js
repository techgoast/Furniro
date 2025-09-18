let products=document.getElementById("products");let showMore=document.getElementById("show-more");let showLess=document.getElementById("show-less");let nextP=document.getElementById("nextP");let showIns=document.getElementById("showIns");let gallery=document.getElementById("gallery");let dots=document.getElementById("dots");let pros=[];let galleryData=[];let showImg=0;function productUI(data){data.forEach((element,i)=>{products.innerHTML+=`
      <a
        href="./single-product.html?productName=${element.title}&productId=${element.id}"
        class="product"
        ${element.discount ? `data-before=""` : ""}
        ${element.discount ? `dicount="${element.discount}"` : ""}
        id="link-${i}"
      >
        <div class="image">
          <img loading="lazy" src="${element.image}" alt="${element.title} img" />
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
    `})}
function showInsUI(img){showIns.innerHTML=`<img loading="lazy" src="${img}" alt="${img}" />`}
function inspirationUI(data){galleryData.forEach((img)=>{gallery.innerHTML+=`<img loading="lazy" src="${img.first}" alt="${img.first}" />`})}
function dotsUI(data){for(let i=0;i<data.length;i++){dots.innerHTML+=`<div class=${i === showImg ? "active" : ""}></div>`}}
window.addEventListener("load",()=>{setTimeout(async()=>{let res=await fetch("./assets/apis/home.json");let data=await res.json();pros=[...data.ourProducts];galleryData=[...data.slider];productUI(pros.slice(0,4));showInsUI(galleryData[showImg].second);inspirationUI(galleryData);dotsUI(galleryData)},0)});showMore.addEventListener("click",(e)=>{products.innerHTML="";productUI(pros);e.target.parentElement.classList.toggle("hide");showLess.parentElement.classList.toggle("hide")});showLess.addEventListener("click",(e)=>{products.innerHTML="";productUI(pros.slice(0,4));e.target.parentElement.classList.toggle("hide");showMore.parentElement.classList.toggle("hide");products.scrollIntoView({behavior:"smooth"})});nextP.addEventListener("click",()=>{showIns.innerHTML="";dots.innerHTML="";if(showImg<galleryData.length-1){showImg+=1}else{showImg=0}
showInsUI(galleryData[showImg].second);dotsUI(galleryData)})