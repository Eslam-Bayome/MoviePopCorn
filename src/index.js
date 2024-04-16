import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import StarRating from "./Components/StarRating";
import "./index.css";
import App from "./App";

// function Test() {
//   const [movieRating, setmovieRating] = useState(0);
//   return (
//     <div>
//       <StarRating
//         color="blue"
//         starColor="purple"
//         maxRating={10}
//         onSetRating={setmovieRating}
//       />
//       <p>this movie was rated {movieRating} stars</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
//    <StarRating
// maxRating={5}
// messages={["one", "two", "three", "four", "good"]}
// />
// <StarRating
// maxRating={10}
// size={40}
// color="black"
// borderColor="green"
// starColor="red"
// defaultRating={4}
// />
// <Test />
