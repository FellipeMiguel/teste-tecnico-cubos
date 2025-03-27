import React from "react";
import MovieCard from "../MovieCard/MovieCard";

const MovieList = ({ movies, isLoading, handleMapGenres }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-purple-500"></div>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onMapGenres={handleMapGenres} />
      ))}
    </ul>
  );
};

export default MovieList;
