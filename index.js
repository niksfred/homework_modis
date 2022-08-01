import { fetchSearchResults, fetchFavourites } from "/api.js";

(function atStart() {
  renderSearchPage();
})();

function getHeaderHTML(page) {
  const nextPage = page === "search" ? "Favourites" : "Search";

  const html = `<button id="navigate" class="navigation-button">${nextPage}</button>
  <div class="search-input-container">
${
  page === "search"
    ? '<input type="text" id="search-input" placeholder="Search for books"></input><button id="search-button">Search</button>'
    : ""
}
  </div>`;

  return html;
}

function renderHeader(page) {
  console.log("renderHeader");
  const header = document.createElement("header");
  header.innerHTML = getHeaderHTML(page);
  document.body.appendChild(header);

  const navigationButton = document.getElementById("navigate");

  navigationButton.addEventListener("click", async () => {
    if (page === "search") {
      await renderFavourites();
    } else {
      renderSearchPage();
    }
  });
}

function renderContentCard(contentContainer, item, isFavourite) {
  console.log("renderContentCard");

  //   const solidHeart = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  //   <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
  // </svg>`;

  const outlineHeart = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
</svg>`;

  const { volumeInfo: bookInfo, id } = item;
  const title = bookInfo.title;
  const authors = bookInfo?.authors?.join(", ");
  const description = bookInfo.description;
  const image = bookInfo.imageLinks.thumbnail;
  const contentCard = document.createElement("div");
  contentCard.classList.add("content-card");
  contentCard.dataset.bookId = id;
  contentCard.innerHTML = `
  <div class="image-wrapper"><img src="${image}" /></div>
  <div class="info-wrapper">
  <h2 class="title">${title}</h2>
  <p class="author">${authors || "No author information"}</p>
  <div class="scrollable-container">
  <p>${description || "No description available"}</p>
  <div class="annotations-header" >
  <p>Add annotation:</p>
  <button class="annotation-action">
  Add annotation
  </button>
  </div>
  <div id="annotations-container"></div>
  </div>
  </div>
  <div class="actions-container"> 
  <button class="favourite-action" data-favourites-id="${id}">
  ${outlineHeart}
  </button>
  </div>
  `;
  contentContainer.appendChild(contentCard);

  const addToFavouriteButton = contentCard.querySelector(".favourite-action");

}

function renderContent(items) {
  console.log("renderContent");
  const contentContainer = document.createElement("div");
  contentContainer.classList.add("content-container");
  document.body.appendChild(contentContainer);
  items.forEach((item) => {
    renderContentCard(contentContainer, item);
  });
}

function renderSearchPage() {
  document.body.innerHTML = "";
  console.log("renderSearchPage");
  renderHeader("search");
  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");

  searchButton.addEventListener("click", async () => {
    console.log("searchButton pressed");
    const items = await fetchSearchResults(searchInput.value);
    renderContent(items);
  });
}

async function renderFavourites() {
  document.body.innerHTML = "";
  console.log("renderFavourites");
  renderHeader("favourites");
  const favouriteBooks = await fetchFavourites();
  renderContent(favouriteBooks);
}

// async function renderFavourites() {
//   document.body.innerHTML = "";
//   const header = document.createElement("header");
//   header.innerHTML = `<button id="navigate" class="navigation-button">Find books</button>`;
//   document.body.appendChild(header);
//   const contentContainer = document.createElement("div");
//   contentContainer.classList.add("content-container");
//   document.body.appendChild(contentContainer);
//   const favouriteBooks = await fetchFavourites();
//   favouriteBooks.forEach((item) => {
//     const { volumeInfo: bookInfo, id } = item;
//     const title = bookInfo.title;
//     const authors = bookInfo?.authors?.join(", ");
//     const description = bookInfo.description;
//     const image = bookInfo.imageLinks.thumbnail;
//     const contentCard = document.createElement("div");
//     contentCard.classList.add("content-card");
//     contentCard.dataset.bookId = id;
//     contentCard.innerHTML = `
//     <div class="image-wrapper"><img src="${image}" /></div>
//     <div class="info-wrapper">
//     <h2 class="title">${title}</h2>
//     <p class="author">${authors || "No author information"}</p>
//     <div class="scrollable-container">
//     <p>${description || "No description available"}</p>
//     <div class="annotations-header" >
//     <p>Add annotation:</p>
//     <button class="annotation-action">
//     <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
//     <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//               </svg>
//               </button>
//               </div>
//               <div id="annotations-container"></div>
//               </div>
//               </div>
//               <div class="actions-container">
//               <button class="favourite-action" data-favourites-id="${id}">
//               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
//               <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//               </svg>
//               </button>
//               </div>
//               `;
//     contentContainer.appendChild(contentCard);
//   });

//   const removeFromFavouritesButtons = document.querySelectorAll(
//     "[data-favourites-id]"
//   );
//   removeFromFavouritesButtons.forEach((button) => {
//     button.addEventListener("click", async () => {
//       const itemId = button.dataset.favouritesId;
//       await fetch(`http://localhost:3000/favourites/${itemId}`, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         method: "DELETE",
//       });
//       document.querySelector(`[data-book-id=${itemId}]`).remove();
//     });
//   });
// }

// function renderMain1() {
//   document.body.innerHTML = "";
//   const header = document.createElement("header");
//   header.innerHTML = `<button id="navigate" class="navigation-button">Favourites</button>
//               <div class="search-input-container">
//               <input type="text" id="search-input" placeholder="Search for books"></input>
//               <button id="search-button">Search</button>
//               </div>`;
//   document.body.appendChild(header);
//   const contentContainer = document.createElement("div");
//   contentContainer.classList.add("content-container");
//   document.body.appendChild(contentContainer);
//   const searchButton = document.getElementById("search-button");
//   const searchInput = document.getElementById("search-input");
//   const navigationButton = document.getElementById("navigate");

//   searchButton.addEventListener("click", async () => {
//     contentContainer.innerHTML = "";
//     const request = await fetch(
//       `https://www.googleapis.com/books/v1/volumes?q=${searchInput.value}`
//     );
//     const res = await request.json();
//     const { items } = res;
//     console.log("before items mapping");
//     items.forEach((item) => {
//       const { volumeInfo: bookInfo, id } = item;
//       const title = bookInfo.title;
//       const authors = bookInfo?.authors?.join(", ");
//       const description = bookInfo.description;
//       const image = bookInfo.imageLinks.thumbnail;
//       const contentCard = document.createElement("div");
//       contentCard.classList.add("content-card");
//       contentCard.innerHTML = `
//         <div class="image-wrapper"><img src="${image}" /></div>
//         <div class="info-wrapper">
//             <h2 class="title">${title}</h2>
//             <p class="author">${authors || "No author information"}</p>
//               <div class="scrollable-container">
//               <p>${description || "No description available"}</p>
//               <div>
//               <div class="annotations-header" >
//               <p>Add annotation:</p>
//               <button class="annotation-action">
//               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
//               <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//               </svg>
//               </button>
//               </div>
//               <div id="annotations-container"></div>
//               </div>
//               </div>
//               </div>
//               <div class="actions-container">
//               <button class="favourite-action" data-favourites-id="${id}">
//               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
//               <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//               </svg>
//               </button>
//               </div>
//         `;
//       contentContainer.appendChild(contentCard);
//     });

//     const addToFavouritesButtons = document.querySelectorAll(
//       "[data-favourites-id]"
//     );

//     addToFavouritesButtons.forEach((button) => {
//       button.addEventListener("click", async () => {
//         const itemId = button.dataset.favouritesId;
//         const bookData = items.find((book) => book.id === itemId);
//         const favourites = await fetchFavourites();
//         if (favourites.some((book) => book.id === itemId)) {
//           console.log("book info deleted from db");
//           await fetch(`http://localhost:3000/favourites/${itemId}`, {
//             headers: {
//               "Content-Type": "application/json",
//             },
//             method: "DELETE",
//           });
//         } else {
//           console.log("book info posted to db");
//           await fetch(`http://localhost:3000/favourites`, {
//             headers: {
//               "Content-Type": "application/json",
//             },
//             method: "POST",
//             body: JSON.stringify(bookData),
//           });
//         }
//       });
//     });
//   });

//   navigationButton.addEventListener("click", async () => {
//     await renderFavourites();
//     const navigationButton = document.getElementById("navigate");
//     navigationButton.addEventListener("click", () => {
//       renderMain();
//     });
//   });
// }
