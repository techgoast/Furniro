let articles = document.getElementById("articles");
let posts = document.getElementById("posts");
let next = document.getElementById("next");
let pagination = document.getElementById("pagination");
let search = document.getElementById("search");
let woodCount = document.getElementById("wood-count");
let handmadeCount = document.getElementById("handmade-count");
let craftsCount = document.getElementById("crafts-count");
let designCount = document.getElementById("design-count");
let interiorCount = document.getElementById("interior-count");

let arts = [];
let start = 0;
let end = 3;
let pagesCount = 0;
let nextPage = 1;
let searchTitle = "";
let filtered = [];
let categorized = [];
let recenntPosts = [];

function aticlesUI(data) {
  data.forEach((article) => {
    let art = `
      <article>
        <div class="image">
          <img src="${article.image}" alt="image of article id ${article.id}" />
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

function PostsUI(postsArr) {
  postsArr.forEach(post => {
    posts.innerHTML += `
      <a href="./blog.html?id=${post.id}" class="post">
        <div class="image">
          <img
            src="${post.asideImage}"
            alt="aside-post${post.id}"
          />
        </div>
        <div class="text">
          <h3>${post.title}</h3>
          <span>${post.date}</span>
        </div>
      </a>`
  })
}

window.addEventListener("load", () => {
  let params = new URLSearchParams(location.search);
  let targetCategory = params.get("category") && params.get("category").toLocaleLowerCase();
  let targetId = params.get("id") && +params.get("id");
  setTimeout(async () => {
    let res = await fetch("./assets/apis/blog.json");
    let data = await res.json();
    arts = [...data.articles];
    categorized = Object.groupBy(arts, ({category}) => category);
    recenntPosts = arts.filter(post => post.recent);

    craftsCount.innerText = categorized.crafts.length;
    handmadeCount.innerText = categorized.handmade.length;
    designCount.innerText = categorized.design.length;
    interiorCount.innerText = categorized.interior.length;
    woodCount.innerText = categorized.wood.length;

    arts = targetId ? arts.filter(art => art.id === targetId) : arts;

    pagesCount = targetCategory ? Math.ceil(categorized[targetCategory].length / 3) : Math.ceil(arts.length / 3);
    targetCategory ? aticlesUI(categorized[targetCategory]) : aticlesUI(arts.slice(start, end));
    PostsUI(recenntPosts)
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
