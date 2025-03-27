import React from "react";
import { render, screen } from "@testing-library/react";
import MovieList from "./MovieList";

jest.mock("../MovieCard/MovieCard", () => {
  return function DummyMovieCard({ movie }) {
    return <li data-testid="movie-card">{movie.title}</li>;
  };
});

describe("MovieList Component", () => {
  test("renderiza o spinner quando isLoading é true", () => {
    const { container } = render(
      <MovieList movies={[]} isLoading={true} handleMapGenres={() => {}} />
    );
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  test("renderiza um MovieCard para cada filme quando isLoading é false", () => {
    const movies = [
      {
        id: 1,
        title: "Movie One",
        vote_average: 7.0,
        poster_path: "/poster1.jpg",
      },
      {
        id: 2,
        title: "Movie Two",
        vote_average: 8.0,
        poster_path: "/poster2.jpg",
      },
    ];

    render(
      <MovieList movies={movies} isLoading={false} handleMapGenres={() => ""} />
    );
    // Obtém todos os elementos renderizados pelo nosso mock
    const movieCards = screen.getAllByTestId("movie-card");
    expect(movieCards).toHaveLength(2);
    expect(movieCards[0]).toHaveTextContent("Movie One");
    expect(movieCards[1]).toHaveTextContent("Movie Two");
  });
});
