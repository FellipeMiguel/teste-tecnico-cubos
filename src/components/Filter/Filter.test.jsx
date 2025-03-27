import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "./Filter";

// Definindo dados de teste para os gêneros
const genres = [
  { id: 1, name: "Ação" },
  { id: 2, name: "Comédia" },
];

// Define um objeto com as props padrão e mocks de funções
const defaultProps = {
  filterGenre: "",
  setFilterGenre: jest.fn(),
  filterYear: "",
  setFilterYear: jest.fn(),
  sortBy: "",
  setSortBy: jest.fn(),
  handleClearFilters: jest.fn(),
  handleApplyFilters: jest.fn(),
  genres,
};

describe("Filter Component", () => {
  beforeEach(() => {
    // Reseta os mocks antes de cada teste
    jest.clearAllMocks();
  });

  test("chama setFilterGenre ao alterar o select de gênero", () => {
    render(<Filter {...defaultProps} />);
    const genreSelect = screen.getByLabelText(/Gênero/i);
    fireEvent.change(genreSelect, { target: { value: "1" } });
    expect(defaultProps.setFilterGenre).toHaveBeenCalledWith("1");
  });

  test("chama setFilterYear ao alterar o input de ano", () => {
    render(<Filter {...defaultProps} />);
    const yearInput = screen.getByLabelText(/Ano de Lançamento/i);
    fireEvent.change(yearInput, { target: { value: "2023" } });
    expect(defaultProps.setFilterYear).toHaveBeenCalledWith("2023");
  });

  test("chama setSortBy ao alterar o select de ordenação", () => {
    render(<Filter {...defaultProps} />);
    const sortSelect = screen.getByLabelText(/Ordenar por/i);
    fireEvent.change(sortSelect, { target: { value: "popularity.asc" } });
    expect(defaultProps.setSortBy).toHaveBeenCalledWith("popularity.asc");
  });

  test("chama handleClearFilters ao clicar no botão 'Remover Filtros'", () => {
    render(<Filter {...defaultProps} />);
    const clearButton = screen.getByText(/Remover Filtros/i);
    fireEvent.click(clearButton);
    expect(defaultProps.handleClearFilters).toHaveBeenCalled();
  });

  test("chama handleApplyFilters ao clicar no botão 'Aplicar Filtros'", () => {
    render(<Filter {...defaultProps} />);
    const applyButton = screen.getByText(/Aplicar Filtros/i);
    fireEvent.click(applyButton);
    expect(defaultProps.handleApplyFilters).toHaveBeenCalled();
  });
});
