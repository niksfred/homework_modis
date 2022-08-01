export async function fetchFavourites() {
  const res = await fetch("http://localhost:3000/favourites");
  const data = res.json();
  return data;
}

export async function fetchSearchResults(searchInput) {
  const request = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`
  );
  const res = await request.json();
  const { items } = res;
  return items;
}
