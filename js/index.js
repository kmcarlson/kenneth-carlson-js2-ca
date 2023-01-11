
const url = "http://localhost:1337/articles";

const resultsContainer = document.getElementById("results");


async function getApi() {
  // let val = document.getElementById("filter").value;

  const response = await fetch(url);

  const resualts = await response.json();

  const info = resualts;

  resultsContainer.innerHTML = "";

  for (let i = 0; i < info.length; i++) {
    // if (val != "" && parseFloat(info[i].price) >= parseFloat(val)) {
    //   continue;
    // }



    resultsContainer.innerHTML += `
    <div class="product">
        <div class="id"> ${info[i].id} </div>
        <div class="title"> ${info[i].title} </div>
        <div class="author"> ${info[i].author} </div>
        <button data-id="${info[i].id}" data-title="${info[i].title}" data-author="${info[i].author}"> ADD </button>
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
        const product = { id: id, title: title, author:author  };
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



// window.onload = function () {
//   fetchApi();
//   const wishes = JSON.parse(localStorage.getItem("wish"));
//   const wishlist = document.getElementById("wishlist");
//   if (wishes.length > 0) {
//     wishlist.innerHTML = "";
//     console.log(wishes)
//     wishes.forEach((wish) => {
//       const item = document.createElement("li");
//       item.innerHTML = wish;
//       wishlist.appendChild(item);
//     });
//   }
//   console.log(wishes);
// };

// function fetchApi() {
//   fetch("http://localhost:1337/articles")
//     .then((response) => response.json())
//     .then((data) => {
//       let listitem = document.getElementById("item-list");
//       listitem.innerHTML = "";
//       data.forEach((item) => {
//         let itemHTML = `
         
//             <span>${item.title}</span>
//             <br>
//             <span>${item.summary}</span>
//             <br>
//             <span>${item.author}</span>
//             <br>
//             <button onclick="toggleFavourite('${item.id}')">Add to wishlist</button>
//             <br>
         
//         `;
//         listitem.innerHTML += itemHTML;
//       });
//     });
// }

// function toggleFavourite(id) {
//   let wish = JSON.parse(localStorage.getItem("wish")) || [];
//   let index = wish.indexOf(id);

//   if (index === -1) {
//     wish.push(id);
//   } else {
//     wish.splice(index, 1);
//   }
//   localStorage.setItem("wish", JSON.stringify(wish));
// }
