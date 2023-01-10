window.onload = function () {
  fetchApi();
};

function fetchApi() {
  fetch("http://localhost:1337/articles")
    .then((response) => response.json())
    .then((data) => {
      let listitem = document.getElementById("item-list");
      listitem.innerHTML = "";
      data.forEach((item) => {
        let itemHTML = `
         
            <span>${item.title}</span>
            <br>
            <span>${item.summary}</span>
            <br>
            <span>${item.author}</span>
            <br>
            <button onclick="toggleFavourite('${item.id}')">Favourite</button>
            <br>
         
        `;
        listitem.innerHTML += itemHTML;
      });
    });
}


