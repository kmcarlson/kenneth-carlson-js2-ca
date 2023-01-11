window.onload = () => {
  renderFavs();
  setBtnEvents();
};

const favoritesContainer = document.getElementById("favorites");

function renderFavs() {
  favoritesContainer.innerHTML = "";
  const favList = getExistingFavs();


  
    favList.forEach((product) => {
      favoritesContainer.innerHTML += `
        <div class="product">
           <div class="title"> ${product.title} </div>
            <div class="price"> ${product.price} </div>
        </div>
        `;
    })
  ;
}

function getExistingFavs() {
  const favs = localStorage.getItem("favourites");



  if (favs === null || favs == "[]") {
    favoritesContainer.innerHTML += "<h3>There are no items in the favorites</h3>"
    return [];
  } else {

    return JSON.parse(favs);
  }
}

function saveFavs(favs) {
  localStorage.setItem("favourites", JSON.stringify(favs));
}

function clearFavs() {
  localStorage.removeItem("favourites")
  renderFavs()
}

function setBtnEvents(){
  document.getElementById("btnClear").onclick = clearFavs;
}
