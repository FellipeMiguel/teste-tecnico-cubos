import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";

describe("Página Home - Renderização Básica", () => {
  test("deve renderizar os elementos principais sem dados", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Verifica elementos estáticos
    expect(
      screen.getByPlaceholderText("Pesquise por filmes")
    ).toBeInTheDocument();
    expect(screen.getByAltText("Filtros")).toBeInTheDocument();
    expect(screen.getByAltText("Botão a direita")).toBeInTheDocument();
    expect(screen.getByAltText("Botão a esquerda")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveClass("min-h-screen");
  });
});
