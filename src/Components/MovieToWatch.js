import { useState } from "react";
import { tempWatchedData } from "../App";
import { WatchedMovie } from "./WatchedMovie";
import { ToggleButton } from "./ToggleButton";
import { WatchedSummary } from "./WatchedSummary";

export function MovieToWatch() {
  const [isOpen2, setIsOpen2] = useState(true);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <div className="box ">
      <ToggleButton isOpen={isOpen2} setIsOpen={setIsOpen2} />

      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />

          <ul className="list">
            {watched.map((movie) => (
              <WatchedMovie movie={movie} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
