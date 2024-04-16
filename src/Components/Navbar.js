import { SearchInput } from "./SearchInput";

export function Navbar({ movies, query, setQuery }) {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>popCornMovies</h1>
      </div>
      <SearchInput query={query} setQuery={setQuery} />
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
    </nav>
  );
}
