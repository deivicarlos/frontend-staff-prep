import { useEffect, useEffectEvent, useState } from "react";

export const useDebounce = (str: string, delay: number = 200) => {
  const [debounced, setDebounced] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => setDebounced(str), delay);

    return () => {
      clearInterval(interval);
    };
  }, [str, delay]);

  console.log({ str });

  return { debounced };
};
