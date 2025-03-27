import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MovieCard from "./MovieCard";

const mockMovie = {
  id: 1,
  title: "Test Movie",
  vote_average: 7.5,
  poster_path: "/testPoster.jpg",
  backdrop_path: "/testBackdrop.jpg",
  genre_ids: [1, 2],
};

// Função mock para mapear os gêneros
const mockOnMapGenres = jest.fn(() => "Action, Comedy");

describe("MovieCard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza o título do filme e o poster com alt correto", () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} onMapGenres={mockOnMapGenres} />
      </MemoryRouter>
    );

    // Verifica se o título aparece
    const titleElement = screen.getByText("Test Movie");
    expect(titleElement).toBeInTheDocument();

    // Verifica se a imagem do poster é renderizada com o alt correto
    const imageElement = screen.getByAltText("Test Movie");
    expect(imageElement).toBeInTheDocument();

    // Verifica se a função mock foi chamada com o array de gêneros esperado
    expect(mockOnMapGenres).toHaveBeenCalledWith(mockMovie.genre_ids);
  });

  test("renderiza um Link com o caminho correto para os detalhes do filme", () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} onMapGenres={mockOnMapGenres} />
      </MemoryRouter>
    );

    const linkElement = screen.getByRole("link");
    expect(linkElement.getAttribute("href")).toContain("/movie/1");
  });
});
