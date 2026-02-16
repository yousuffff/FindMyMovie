import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <p className="text-white">{movie.title}</p>
    </div>
  );
};

export default MovieCard;
