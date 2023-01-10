window.onload = function () {
  fetchApi();
  const wishes = JSON.parse(localStorage.getItem("wish"));
  const wishlist = document.getElementById("wishlist");
  if (wishes.length > 0) {
    wishlist.innerHTML = "";
    console.log(wishes)
    wishes.forEach((wish) => {
      const item = document.createElement("li");
      item.innerHTML = wish;
      wishlist.appendChild(item);
    });
  }
  console.log(wishes);
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
            <button onclick="toggleFavourite('${item.id}')">Add to wishlist</button>
            <br>
         
        `;
        listitem.innerHTML += itemHTML;
      });
    });
}

function toggleFavourite(id) {
  let wish = JSON.parse(localStorage.getItem("wish")) || [];
  let index = wish.indexOf(id);

  if (index === -1) {
    wish.push(id);
  } else {
    wish.splice(index, 1);
  }
  localStorage.setItem("wish", JSON.stringify(wish));
}
