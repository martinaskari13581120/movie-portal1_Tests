import React from "react";

function MovieCard({ movie, onClick }) {
  return (
    <div onClick={() => onClick(movie.id)}>
      {movie.title}
    </div>
  );
}

export default React.memo(MovieCard);