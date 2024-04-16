import { Movie } from "./Movie";

export function MovieList({ movies, onSelected }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie, idx) => (
        <Movie movie={movie} key={idx} onSelected={onSelected} />
      ))}
    </ul>
  );
}
