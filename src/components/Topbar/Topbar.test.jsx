import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Topbar from "./Topbar";

test("Topbar renderiza o logo e chama toggleTheme ao clicar no botão", () => {
  const toggleThemeMock = jest.fn();

  render(
    <MemoryRouter>
      <Topbar theme="dark" toggleTheme={toggleThemeMock} />
    </MemoryRouter>
  );

  // Verifica se o logo está na tela
  const logo = screen.getByAltText("Logo da cubos movie");
  expect(logo).toBeInTheDocument();

  // Verifica se o ícone exibido tem alt "Sun icon" pois o tema é "dark"
  const sunIcon = screen.getByAltText("icone de sol");
  expect(sunIcon).toBeInTheDocument();

  // Clica no botão e confirma que a função foi chamada
  const button = screen.getByRole("button");
  fireEvent.click(button);
  expect(toggleThemeMock).toHaveBeenCalledTimes(1);
});

test("Exibe imagem de lua quando o tema é light", () => {
  const toggleThemeMock = jest.fn();

  render(
    <MemoryRouter>
      <Topbar theme="light" toggleTheme={toggleThemeMock} />
    </MemoryRouter>
  );

  // Verifica se o ícone exibido tem alt "Moon icon", pois o tema é "light"
  const moonIcon = screen.getByAltText("icone de lua");
  expect(moonIcon).toBeInTheDocument();
});
