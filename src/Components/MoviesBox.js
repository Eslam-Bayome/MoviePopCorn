import { useState } from "react";
import { Movie } from "./Movie";
import { ToggleButton } from "./ToggleButton";

export function MoviesBox({ movies }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <ToggleButton isOpen={isOpen1} setIsOpen={setIsOpen1} />
      {isOpen1 && (
        <ul className="list">
          {movies?.map((movie, idx) => (
            <Movie movie={movie} key={idx} />
          ))}
        </ul>
      )}
    </div>
  );
}
