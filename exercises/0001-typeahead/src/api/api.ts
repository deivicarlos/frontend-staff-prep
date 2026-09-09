const BASE_URL = "https://openlibrary.org/search.json?q=";

export const searchOpenLibrary = async (query: string) => {
  const response = await fetch(`${BASE_URL + query}`);

  if (!response.ok) {
    throw new Error("Something happened!");
  }

  console.log({ body: response.body });
  return response.json();
};

export type Doc = {
  author_name: string;
  title: string;
};
