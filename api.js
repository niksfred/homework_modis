export async function fetchSearchResults(searchInput) {
  const request = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`
  );
  const res = await request.json();
  const { items } = res;
  return items;
}

export async function fetchFavourites() {
  const res = await fetch("http://localhost:3000/favourites");
  const data = res.json();
  return data;
}

export async function addFavourite(book) {
  await fetch(`http://localhost:3000/favourites`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(book),
  });
}

export async function deleteFavourite(id) {
  await fetch(`http://localhost:3000/favourites/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
}

export async function fetchAnnotations(bookId) {
  const res = await fetch(`http://localhost:3000/annotations?bookId=${bookId}`)
  const data = res.json();
  return data;
}

export async function createAnnotation(annotation) {
  await fetch(`http://localhost:3000/annotations`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(annotation),
  });
}

export async function deleteAnnotation(annotationId) {
  await fetch(`http://localhost:3000/annotations/${annotationId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
}

export async function updateAnnotation(annotation) {
  await fetch(`http://localhost:3000/annotations/${annotation.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(annotation),
  });
}