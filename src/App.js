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
import { useMovies } from "./CustomHooks/useMovies";
import { useLocalStorageState } from "./CustomHooks/useLocalStorageState";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const KEY = "e5bda4f1";

export default function App() {
  const [query, setQuery] = useState("");

  const [selectedId, setSelectedId] = useState(null);

  const { isLoading, ifError, movies } = useMovies(query, handleCloseMovie);

  const [watched, setWatched] = useLocalStorageState([], "watchedList");

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
