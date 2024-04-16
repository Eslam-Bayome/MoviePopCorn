import { useEffect, useState } from "react";
import { Navbar } from "./Components/Navbar";
import { Main } from "./Components/Main";
import { MoviesBox } from "./Components/MoviesBox";
import { MovieToWatch } from "./Components/MovieToWatch";
import { Box } from "./Components/Box";
import { WatchedSummary } from "./Components/WatchedSummary";
import { WatchedMovieList } from "./Components/WatchedMovieList";
import { MovieList } from "./Components/MovieList";
import { ErrorMessage } from "./Components/ErrorMessage";
import { IsLoading } from "./Components/IsLoading";
import { MovieDetails } from "./Components/MovieDetails";
// import "bootstrap/dist/css/bootstrap.min.css";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

export const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
export const KEY = "e5bda4f1";
export default function App() {
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ifError, setIfError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  // useEffect(() => {
  //   setQuery("asd");
  //   console.log("1");
  // }, [query]);
  function handleSelectedId(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }
  function handleAddToWatchd(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
  useEffect(() => {
    async function fetchMovies() {
      try {
        setIfError("");
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );

        // if (!res.ok) throw new Error("You Lost Internet Conection");
        const data = await res.json();
        //! handle error if the name of the movie not found
        if (data.Response === "False") throw new Error("☠☠ movie not found");
        setMovies(data.Search);
        // console.log(data.Search);
      } catch (error) {
        setIfError(error.message);
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
  }, [query]);
  return (
    <>
      <Navbar movies={movies} query={query} setQuery={setQuery} />
      <Main>
        <Box>
          {ifError && <ErrorMessage message={ifError} />}
          {isLoading && <IsLoading />}
          {!isLoading && !ifError && (
            <MovieList movies={movies} onSelected={handleSelectedId} />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              watched={watched}
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddToWatchd}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteMovie={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
