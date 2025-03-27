import React from "react";
import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";
import { MemoryRouter } from "react-router-dom";

describe("Componente NotFound", () => {
  test("renderiza o título '404'", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    // Utilizando getByRole para encontrar o heading
    const heading = screen.getByRole("heading", { name: /404/i });
    expect(heading).toBeInTheDocument();
  });

  test("renderiza a mensagem de not found", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    const message = screen.getByText(
      /Oops! A página que você está procurando não existe\./i
    );
    expect(message).toBeInTheDocument();
  });

  test("renderiza o link para voltar para a página inicial", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    const link = screen.getByRole("link", {
      name: /Voltar para a Página Inicial/i,
    });
    expect(link).toBeInTheDocument();
    // Verifica se o atributo href do link é "/"
    expect(link.getAttribute("href")).toBe("/");
  });
});
