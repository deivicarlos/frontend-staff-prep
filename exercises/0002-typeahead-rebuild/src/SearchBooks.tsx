import { useEffect, useState } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { searchBooks } from "./api/http";

type Book = {
  title: string;
  author_name: string[];
};

type BookItemProps = {
  book: Book;
};
const BookItem = ({ book }: BookItemProps) => {
  const { title, author_name } = book;
  return (
    <div className="book-item">
      <div>Title: {title}</div>
      <div>Author: {author_name?.toString().replace(",", " ")}</div>
    </div>
  );
};

type BookListProps = {
  books: Book[];
};
const BookList = ({ books }: BookListProps) => {
  return (
    <div className="book-list">
      {books.map((book, index) => (
        <BookItem key={`${index}-${book.title}`} book={book} />
      ))}
    </div>
  );
};

const SearchBooks = () => {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        const result = await searchBooks(debounced, signal);

        setBooks(result?.docs);
      } catch (e) {
        controller.abort();
      }
    };

    fetchData();
  }, [debounced]);

  console.log({ books });
  return (
    <div className="books-container">
      <input
        type="text"
        placeholder="Search books"
        aria-label="Search books"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <BookList books={books} />
    </div>
  );
};

export default SearchBooks;
