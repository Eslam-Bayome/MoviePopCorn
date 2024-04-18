import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(() => {
    let closeMovie = function (e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };
    document.addEventListener("keydown", closeMovie);
    return () => {
      document.removeEventListener("keydown", closeMovie);
    };
  }, [action, key]);
}
