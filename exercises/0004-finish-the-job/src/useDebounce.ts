import { useEffect, useState } from "react";

const TIMEOUT_DELAY_MS = 500;

const useDebounce = (str: string) => {
  const [debounced, setDebounced] = useState<string>(str);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setDebounced(str);
    }, TIMEOUT_DELAY_MS);

    return () => {
      clearTimeout(timeId);
    };
  }, [str]);

  return debounced;
};

export default useDebounce;
