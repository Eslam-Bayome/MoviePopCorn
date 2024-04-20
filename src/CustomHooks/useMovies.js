import { useEffect, useState } from "react";

export const KEY = "e5bda4f1";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ifError, setIfError] = useState("");

  useEffect(() => {
    // callback?.(); we cant use it becouse we cant add callback to the dependency array so we cant relay on it

    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIfError("");
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          {
            signal: controller.signal,
          }
        );

        // if (!res.ok) throw new Error("You Lost Internet Conection");
        const data = await res.json();
        //! handle error if the name of the movie not found
        if (data.Response === "False") throw new Error("☠☠ movie not found");

        setMovies(data.Search);
        setIfError("");
      } catch (error) {
        if (error.name !== "AbortError") {
          setIfError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 2) {
      setMovies([]);
      setIfError("");
      return;
    }

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, ifError };
}
