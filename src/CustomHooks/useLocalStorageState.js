import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return JSON.parse(storedValue) || initialState;
  });

  useEffect(
    function () {
      localStorage.setItem("watchedList", JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
