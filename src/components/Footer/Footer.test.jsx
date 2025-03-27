import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component", () => {
  test("Renderiza o ano atual e o texto 'Cubos Movie'", () => {
    render(<Footer />);

    // Obtem o ano corrente
    const currentYear = new Date().getFullYear().toString();

    // Verifica se o ano atual está sendo exibido
    expect(screen.getByText(currentYear)).toBeInTheDocument();

    // Verifica se o texto "Cubos Movies" está presente
    expect(screen.getByText(/Cubos Movies/i)).toBeInTheDocument();
  });
});
