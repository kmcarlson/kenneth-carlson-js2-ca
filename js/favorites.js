window.onload = () => {
  renderFavs();
  setBtnEvents();
};

const favoritesContainer = document.getElementById("favorites");

function renderFavs() {
  favoritesContainer.innerHTML = "";
  const favList = getExistingFavs();

  favList.forEach((info) => {
    favoritesContainer.innerHTML += `
        <div class="product">
          <div class="price"> ${info.id} </div>
           <div class="title"> ${info.title} </div>
            
        </div>
        `;
  });
}

function getExistingFavs() {
  const favs = localStorage.getItem("favourites");

  if (favs === null || favs == "[]") {
    favoritesContainer.innerHTML +=
      "<h3>There are no items in the favorites</h3>";
    return [];
  } else {
    return JSON.parse(favs);
  }
}

function saveFavs(favs) {
  localStorage.setItem("favourites", JSON.stringify(favs));
}

function clearFavs() {
  localStorage.removeItem("favourites");
  renderFavs();
}

function setBtnEvents() {
  document.getElementById("btnClear").onclick = clearFavs;
}
