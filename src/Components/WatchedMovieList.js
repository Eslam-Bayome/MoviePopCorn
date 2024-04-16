import { WatchedMovie } from "./WatchedMovie";

export function WatchedMovieList({ watched, onDeleteMovie }) {
  return (
    <>
      <ul className="list">
        {watched.map((movie, idx) => (
          <WatchedMovie onDeleteMovie={onDeleteMovie} movie={movie} key={idx} />
        ))}
      </ul>
    </>
  );
}
