console.log("Hello world");

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const contentContainer =
  document.getElementsByClassName("content-container")[0];

searchButton.addEventListener("click", async () => {
  contentContainer.innerHTML = "";
  console.log(searchInput.value);
  const request = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchInput.value}`
  );
  const res = await request.json();
  const { items } = res;
  console.log(
    "🚀 ~ file: index.js ~ line 13 ~ searchButton.addEventListener ~ items",
    items
  );
  items.forEach((item) => {
    const { volumeInfo: bookInfo } = item;
    console.log(bookInfo);
    const title = bookInfo.title;
    const authors = bookInfo?.authors?.join(", ");
    const description = bookInfo.description;
    const image = bookInfo.imageLinks.thumbnail;
    const contentCard = document.createElement("div");
    contentCard.classList.add("content-card");
    contentCard.innerHTML = `
        <div class="image-wrapper"><img src="${image}" /></div>
        <div class="info-wrapper">
          <h2 class="title">${title}</h2>
          <p class="author">${authors || "No author information"}</p>
            <div class="description"><p>${
              description || "No description available"
            }</p></div>
        </div>
      `;
    contentContainer.appendChild(contentCard);
  });
});


