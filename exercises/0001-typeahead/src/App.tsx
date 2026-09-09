import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { searchOpenLibrary, type Doc } from "./api/api";
import { useDebounce } from "./hooks/useDebounce";

type DocListProps = {
  docs: Doc[];
};

const DocList = ({ docs }: DocListProps) => {
  return (
    <div>
      {docs?.map(({ title, author_name }: Doc) => {
        return (
          <li>
            Title: {title} - Author: {author_name}
          </li>
        );
      })}
    </div>
  );
};

export default function App() {
  const [query, setQuery] = useState("");
  const { debounced } = useDebounce(query);

  const { isPending, data } = useQuery({
    queryKey: ["books"],
    queryFn: () => searchOpenLibrary(debounced),
  });

  return (
    <main>
      <h1>Typeahead</h1>
      <form>
        <input
          aria-label="Search"
          placeholder="Search for books"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      {isPending ? <p>Loading...</p> : <DocList docs={data?.docs} />}
    </main>
  );
}
