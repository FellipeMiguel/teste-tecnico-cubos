import React from "react";
import { render, screen } from "@testing-library/react";
import Trailer from "./Trailer";

describe("Componente Trailer", () => {
  test("não renderiza nada se videoKey não for fornecido", () => {
    // Passa videoKey como nulo e verifica se o componente retorna null
    const { container } = render(<Trailer videoKey={null} />);
    expect(container.firstChild).toBeNull();
  });

  test("renderiza o trailer se videoKey for fornecido", () => {
    const videoKey = "abc123";
    render(<Trailer videoKey={videoKey} />);

    // Verifica se o título "Trailer" está presente
    expect(screen.getByText("Trailer")).toBeInTheDocument();

    // Verifica se o iframe com título "Trailer" foi renderizado
    const iframe = screen.getByTitle("Trailer");
    expect(iframe).toBeInTheDocument();

    // Verifica se o atributo src do iframe contém o link correto
    expect(iframe).toHaveAttribute(
      "src",
      `https://www.youtube.com/embed/${videoKey}`
    );
  });
});
