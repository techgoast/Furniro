let articles = document.getElementById("articles");
let next = document.getElementById("next");
let pagination = document.getElementById("pagination");
let search = document.getElementById("search");

let arts = [];
let start = 0;
let end = 3;
let pagesCount = 0;
let nextPage = 1;
let searchTitle = "";
let filtered = [];

function aticlesUI(data) {
  data.forEach((article) => {
    let art = `
      <article>
        <div class="image">
          <img src="${article.image}" alt="blog1" />
        </div>
        <div class="info">
          <span class="author">
            <i class="fa-solid fa-user-tie"></i>${article.author}
          </span>
          <span class="date">
            <i class="fa-solid fa-calendar"></i>${article.date}
          </span>
          <span class="category">
            <i class="fa-solid fa-tag"></i>${article.category}
          </span>
        </div>
        <h2>${article.title}</h2>`;
    let hiddenIndex = data.indexOf(article);
    let hiiddenPs = `<div class="hide" id="hidden${hiddenIndex}">`;
    for (let j = 0; j < article.body.length; j++) {
      if (j === 0) {
        art += `<p>${article.body[j]}</p>`;
      } else {
        hiiddenPs += `<p>${article.body[j]}</p>`;
      }
    }
    hiiddenPs += `</div>`;
    art += `
        ${hiiddenPs}
        <button onclick="document.getElementById('hidden${hiddenIndex}').classList.toggle('hide');this.classList.toggle('hide');this.nextElementSibling.classList.toggle('hide')">Read More</button>
        <button class="hide"onclick="document.getElementById('hidden${hiddenIndex}').classList.toggle('hide');this.classList.toggle('hide');this.previousElementSibling.classList.toggle('hide')">Read Less</button>
      </article>
    `;
    articles.innerHTML += art;
  });
}

function paginationUI(count) {
  for (let i = 0; i < count; i++) {
    pagination.innerHTML += `<div class="${
      nextPage === i + 1 ? "active child" : "child"
    }">${i + 1}</div>`;
  }
}

window.addEventListener("load", () => {
  setTimeout(async () => {
    let res = await fetch("./assets/apis/blog.json");
    let data = await res.json();
    arts = [...data.articles];
    pagesCount = Math.ceil(arts.length / 3);
    aticlesUI(arts.slice(start, end));
    paginationUI(pagesCount);
  },0)
});

next.addEventListener("click", () => {
  articles.innerHTML = "";
  pagination.innerHTML = "";
  nextPage += 1;
  start += 3;
  end = nextPage * 3;
  if (filtered.length > 0) {
    if (start < filtered.length) {
      if (end > filtered.lemgth) {
        end = filtered.length;
      }
    } else {
      start = 0;
      end = 3;
      nextPage = 1;
    }
    aticlesUI(filtered.slice(start, end));
  } else {
    if (start < arts.length) {
      if (end > arts.lemgth) {
        end = arts.length;
      }
    } else {
      start = 0;
      end = 3;
      nextPage = 1;
    }
    aticlesUI(arts.slice(start, end));
  }
  paginationUI(pagesCount);
  articles.scrollIntoView({behavior:"smooth"})
});

search.addEventListener("change", (e) => {
  searchTitle = e.target.value;
  filtered = arts.filter((article) => {
    return article.title.match(searchTitle);
  });
  articles.innerHTML = "";
  pagination.innerHTML = "";
  pagesCount = Math.ceil(filtered.length / 3);
  if (filtered.length === 0) {
    articles.innerHTML = "No Article Meet Your Search";
  }
  aticlesUI(filtered);
  paginationUI(pagesCount);
});
