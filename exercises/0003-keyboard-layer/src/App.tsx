import { useEffect, useState } from "react";

function isPalindrome(txt: string) {
  const regex = new RegExp(/[a-z0-9]/);

  let i = 0;
  let j = txt.length - 1;

  while (i < j) {
    const chartAtI = txt[i].toLowerCase();
    const chartAtJ = txt[j].toLowerCase();

    if (!regex.test(chartAtI)) {
      i++;
      continue;
    }

    if (!regex.test(chartAtJ)) {
      j--;
      continue;
    }

    if (chartAtI !== chartAtJ) {
      return false;
    }

    i++;
    j--;
  }

  return true;
}

export default function App() {
  const [query, setQuery] = useState({ a: 1, b: 2 });

  query.a = 100;
  console.log("first pass");

  useEffect(() => {
    query.a = 200;

    setQuery(query);
    console.log("inside effect");
  }, []);

  return (
    <main>
      <h1>Book search</h1>

      <div>{JSON.stringify(query)}</div>
      {/* <Typeahead /> */}
    </main>
  );
}
