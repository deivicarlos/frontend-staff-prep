import { useEffect, useState } from "react";

export const useDebounce = (txt: string, msDelay = 200) => {
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounced(txt);
    }, msDelay);

    return () => {
      clearTimeout(timerId);
    };
  }, [txt]);

  return debounced;
};
