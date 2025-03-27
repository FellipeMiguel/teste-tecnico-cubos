import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("Componente SearchBar", () => {
  const handleInputChangeMock = jest.fn();
  const handleSearchMoviesMock = jest.fn();
  const toggleFiltersMock = jest.fn();

  const defaultProps = {
    searchQuery: "",
    handleInputChange: handleInputChangeMock,
    handleSearchMovies: handleSearchMoviesMock,
    toggleFilters: toggleFiltersMock,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza o input de busca com o placeholder correto", () => {
    render(<SearchBar {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText("Pesquise por filmes");
    expect(inputElement).toBeInTheDocument();
  });

  test("chama handleInputChange quando digita no input", () => {
    render(<SearchBar {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText("Pesquise por filmes");
    fireEvent.change(inputElement, { target: { value: "Teste" } });
    expect(handleInputChangeMock).toHaveBeenCalled();
  });

  test("chama handleSearchMovies com o valor atual do input ao clicar no botão de busca", () => {
    // Define uma prop customizada
    const customProps = { ...defaultProps, searchQuery: "Filme" };
    render(<SearchBar {...customProps} />);

    // Busca pelo ícone
    const searchIcon = screen.getByAltText("Ícone de busca");
    // Aciona o clique no botão contendo o ícone
    fireEvent.click(searchIcon.closest("button"));
    expect(handleSearchMoviesMock).toHaveBeenCalledWith("Filme");
  });

  test("chama toggleFilters ao clicar no botão de filtros", () => {
    render(<SearchBar {...defaultProps} />);
    const filterIcon = screen.getByAltText("Filtros");
    fireEvent.click(filterIcon.closest("button"));
    expect(toggleFiltersMock).toHaveBeenCalled();
  });
});
