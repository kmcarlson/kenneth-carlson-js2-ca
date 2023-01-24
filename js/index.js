const url = "http://localhost:1337/articles";

const resultsContainer = document.getElementById("results");

async function getApi() {
  let val = document.getElementById("filter").value;

  const response = await fetch(url);

  const resualts = await response.json();

  const info = resualts;

  resultsContainer.innerHTML = "";

  for (let i = 0; i < info.length; i++) {
    if (!info[i].title.toLowerCase().includes(val.toLowerCase())) {
      break;
    }

    resultsContainer.innerHTML += `
    <div class="product">
        <div class="id"> ${info[i].id} </div>
        <div class="title"> ${info[i].title} </div>
        <div class="author"> ${info[i].author} </div>
        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" data-id="${info[i].id}" data-title="${info[i].title}" data-author="${info[i].author}"> ADD </button>
    </div>
    `;
  }
  const favButtons = document.querySelectorAll("button");
  favButtons.forEach((button) => {
    button.addEventListener("click", handleClick);
  });
}

function handleClick() {
  const id = this.dataset.id;
  const title = this.dataset.title;
  const author = this.dataset.author;

  const currentFavs = getExistingFavs();

  const productExists = currentFavs.find(function (fav) {
    return fav.title === title;
  });

  if (productExists === undefined) {
    const product = { id: id, title: title, author: author };
    currentFavs.push(product);
    saveFavs(currentFavs);
  } else {
    const newFavs = currentFavs.filter((fav) => fav.title !== title);
    saveFavs(newFavs);
  }
}

function getExistingFavs() {
  const favs = localStorage.getItem("favourites");

  if (favs === null) {
    return [];
  } else {
    return JSON.parse(favs);
  }
}

function saveFavs(favs) {
  localStorage.setItem("favourites", JSON.stringify(favs));
}

getApi();
