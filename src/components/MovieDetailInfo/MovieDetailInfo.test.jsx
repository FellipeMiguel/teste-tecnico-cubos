import React from "react";
import { render, screen } from "@testing-library/react";
import MovieDetailInfo from "./MovieDetailInfo";

describe("MovieDetailInfo Component", () => {
  const mockMovie = {
    overview: "Essa é uma sinopse teste do filme.",
    release_date: "2025-03-27",
    runtime: 120,
    status: "Released",
    original_language: "en",
    budget: 10000000,
    revenue: 50000000,
    genres: [
      { id: 1, name: "Action" },
      { id: 2, name: "Comedy" },
    ],
  };

  // Calcula o lucro
  const mockLucro = mockMovie.revenue - mockMovie.budget;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };

  const statusMap = {
    Released: "Lançado",
    "Post Production": "Em Pós-Produção",
    "In Production": "Em Produção",
    Planned: "Planejado",
  };

  const languageMap = {
    en: "Inglês",
    pt: "Português",
    fr: "Francês",
  };

  test("renderiza overview e gêneros corretamente", () => {
    render(
      <MovieDetailInfo
        movie={mockMovie}
        lucro={mockLucro}
        formatDate={formatDate}
        statusMap={statusMap}
        languageMap={languageMap}
      />
    );

    // Verifica se o overview é exibido
    expect(
      screen.getByText("Essa é uma sinopse teste do filme.")
    ).toBeInTheDocument();

    // Como os gêneros são convertidos para uppercase
    expect(screen.getByText("ACTION")).toBeInTheDocument();
    expect(screen.getByText("COMEDY")).toBeInTheDocument();
  });

  test("renderiza os campos de detalhes corretamente", () => {
    render(
      <MovieDetailInfo
        movie={mockMovie}
        lucro={mockLucro}
        formatDate={formatDate}
        statusMap={statusMap}
        languageMap={languageMap}
      />
    );

    // A data de lançamento formatada
    expect(screen.getByText("27/03/2025")).toBeInTheDocument();

    // Verifica a duração
    expect(screen.getByText("120 minutos")).toBeInTheDocument();

    // Verifica o status exibido
    expect(screen.getByText("Lançado")).toBeInTheDocument();

    // Verifica o idioma
    expect(screen.getByText("Inglês")).toBeInTheDocument();
  });

  test("renderiza os detalhes financeiros corretamente", () => {
    render(
      <MovieDetailInfo
        movie={mockMovie}
        lucro={mockLucro}
        formatDate={formatDate}
        statusMap={statusMap}
        languageMap={languageMap}
      />
    );

    expect(
      screen.getByText((content) => content.includes("10.000.000"))
    ).toBeInTheDocument();

    expect(
      screen.getByText((content) => content.includes("50.000.000"))
    ).toBeInTheDocument();

    expect(
      screen.getByText((content) => content.includes("40.000.000"))
    ).toBeInTheDocument();
  });
});
