import { MoviesBox } from "./MoviesBox";
import { MovieToWatch } from "./MovieToWatch";

export function Main({ movies }) {
  return (
    <main className="main row">
      <MoviesBox movies={movies} />
      <MovieToWatch />
    </main>
  );
}
