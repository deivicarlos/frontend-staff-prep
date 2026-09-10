const BASE_URL = "https://openlibrary.org/search.json?q=";

export const searchBooks = async (query: string, signal: AbortSignal) => {
  const response = await fetch(`${BASE_URL + query}`, { signal });

  if (!response.ok) {
    throw new Error("Error fetching books");
  }

  return response.json();
};
