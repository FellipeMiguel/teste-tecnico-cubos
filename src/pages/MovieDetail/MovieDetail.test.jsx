import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import MovieDetail from "./MovieDetail";
import axios from "axios";

// Mock do axios para simular as chamadas à API
jest.mock("axios");

describe("Componente MovieDetail", () => {
  // Dados fictícios para simular os detalhes do filme
  const mockMovie = {
    id: 1,
    title: "Filme de Teste",
    original_title: "Original Filme de Teste",
    overview: "Essa é uma sinopse de teste do filme.",
    vote_average: 7.5,
    vote_count: 150,
    popularity: 10.123,
    release_date: "2020-05-15", // Deverá ser formatada para "15/05/2020"
    runtime: 120,
    backdrop_path: "/backdropTest.jpg",
    poster_path: "/posterTest.jpg",
    status: "Released",
    revenue: 50000000,
    budget: 10000000,
    tagline: "Tagline de Teste",
    genres: [
      { id: 1, name: "Ação" },
      { id: 2, name: "Drama" },
    ],
  };

  // Dados fictícios para simular o trailer
  const mockTrailer = {
    results: [{ type: "Trailer", site: "YouTube", key: "abc123" }],
  };

  // Teste 1: Verificar se o spinner aparece enquanto os dados estão em loading
  test("renderiza o spinner enquanto carrega os dados", () => {
    // Simula que as chamadas do axios nunca resolvem (mantendo o estado de loading)
    axios.get.mockReturnValue(new Promise(() => {}));

    const { container } = render(
      <MemoryRouter initialEntries={["/movie/1"]}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Verifica se existe um elemento com a classe "animate-spin"
    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });

  // Teste 2: Verificar se os detalhes do filme e o trailer são exibidos corretamente
  test("exibe os detalhes do filme e o trailer quando a busca é bem-sucedida", async () => {
    // Configura o mock do axios para retornar os detalhes do filme e trailer conforme a URL chamada
    axios.get.mockImplementation((url) => {
      if (url.includes("/videos")) {
        return Promise.resolve({ data: mockTrailer });
      }
      return Promise.resolve({ data: mockMovie });
    });

    render(
      <MemoryRouter initialEntries={["/movie/1"]}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Aguarda até que o título do filme seja renderizado
    await waitFor(() =>
      expect(screen.getByText("Filme de Teste")).toBeInTheDocument()
    );
    // Verifica se o título original é renderizado (usa matcher flexível, pois o texto pode estar quebrado)
    expect(
      screen.getByText((content) => content.includes("Original Filme de Teste"))
    ).toBeInTheDocument();
    // Verifica se a tagline é exibida
    expect(screen.getByText("Tagline de Teste")).toBeInTheDocument();
    // Verifica se a data de lançamento formatada (15/05/2020) é exibida
    expect(screen.getByText("15/05/2020")).toBeInTheDocument();

    // Verifica se o trailer é renderizado (através do iframe com title "Trailer")
    const iframeTrailer = screen.getByTitle("Trailer");
    expect(iframeTrailer).toBeInTheDocument();
    expect(iframeTrailer).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/abc123"
    );
  });

  // Teste 3: Verificar se a mensagem "Filme não encontrado." é exibida quando não há dados
  test("exibe mensagem 'Filme não encontrado.' quando os dados do filme são nulos", async () => {
    // Simula que a API retorna null para os detalhes do filme
    axios.get.mockResolvedValueOnce({ data: null });

    render(
      <MemoryRouter initialEntries={["/movie/1"]}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText("Filme não encontrado.")).toBeInTheDocument()
    );
  });
});
