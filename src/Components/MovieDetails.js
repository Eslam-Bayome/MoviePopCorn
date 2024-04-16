import { useEffect, useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { IsLoading } from "./IsLoading";
import StarRating from "./StarRating";
import { KEY } from "../App";

export function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRate, setUserRate] = useState(0);

  const {
    Title,
    Year,
    Poster,
    Runtime,
    imdbRating,
    Plot,
    Released,
    Actors,
    Director,
    Genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      Title,
      Year,
      Poster,
      imdbRating: Number(imdbRating),
      Runtime: parseInt(Runtime),
      userRating: userRate,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        console.log(data);
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieDetails();
  }, [selectedId]);

  if (isLoading) return <IsLoading />;

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        {movie.dictionary}
        <img src={Poster} alt={`Poster Of ${Title}`} />
        <div className="details-overview">
          <h2>{Title}</h2>
          <p>
            {Released}&bull; {Runtime}
          </p>
          <p>{Genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDB Rating
          </p>
        </div>
      </header>

      <section>
        {watched.some((movie) => movie.imdbID === selectedId) ? (
          <div className="rating">
            <p>
              You Rated This Movie With{" "}
              {watched.find((movie) => movie.imdbID === selectedId)?.userRating}{" "}
              <span>⭐</span>
            </p>
          </div>
        ) : (
          <>
            <div className="rating">
              <StarRating
                textColor="white"
                maxRating={10}
                onSetRating={setUserRate}
              />
              {userRate > 0 && (
                <button className="btn-add" onClick={handleAdd}>
                  + Add To List
                </button>
              )}
            </div>
          </>
        )}
        <p>{Plot}</p>
        <p>Actors :{Actors}</p>
        <p>Directed by {Director}</p>
      </section>
    </div>
  );
}
