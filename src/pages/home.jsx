import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/movieCard";
import searchImg from "../assets/Search.svg";
import filterImg from "../assets/filter.svg";
import leftArrowImg from "../assets/left-arrow.svg";
import rightArrowImg from "../assets/right-arrow.svg";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  // Na montagem, carrega as 10 páginas da API e os gêneros
  useEffect(() => {
    if (!searchQuery.trim()) {
      getMovies();
    }
    getGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Efeito de debounce para a pesquisa
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearchMovies(searchQuery);
      } else {
        getMovies();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // Para a listagem padrão, chamamos as 10 páginas da API e combinamos os resultados
  const getMovies = async () => {
    setIsLoading(true);
    try {
      const pagesToFetch = 10;
      const requests = Array.from({ length: pagesToFetch }, (_, index) =>
        axios({
          method: "get",
          url: "https://api.themoviedb.org/3/discover/movie",
          params: {
            api_key: "b687cf37dd513bd5630631d04190332a",
            language: "pt-BR",
            page: index + 1,
          },
        })
      );
      const responses = await Promise.all(requests);
      // Combina todos os filmes retornados (não exclui nenhum)
      const allMovies = responses.reduce(
        (acc, res) => acc.concat(res.data.results),
        []
      );
      setMovies(allMovies);
      console.log("Filmes carregados:", allMovies);
      setCurrentPage(1);
    } catch (err) {
      console.log("Erro ao buscar filmes:", err);
    }
    setIsLoading(false);
  };

  // Para pesquisas, vamos buscar apenas a página 1
  const handleSearchMovies = async (query) => {
    if (!query.trim()) {
      getMovies();
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: "https://api.themoviedb.org/3/search/movie",
        params: {
          api_key: "b687cf37dd513bd5630631d04190332a",
          language: "pt-BR",
          query: query,
          page: 1,
        },
      });
      setMovies(response.data.results);
      console.log("Resultados da pesquisa:", response.data.results);
      setCurrentPage(1);
    } catch (err) {
      console.log("Erro ao buscar filmes:", err);
    }
    setIsLoading(false);
  };

  const getGenres = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "https://api.themoviedb.org/3/genre/movie/list",
        params: {
          api_key: "b687cf37dd513bd5630631d04190332a",
          language: "pt-BR",
        },
      });
      setGenres(response.data.genres);
      console.log("Gêneros carregados:", response.data.genres);
    } catch (err) {
      console.log("Erro ao buscar gêneros:", err);
    }
  };

  const handleMapGenres = (movieGenreIds) => {
    return movieGenreIds
      .map((id) => {
        const genre = genres.find((g) => g.id === id);
        return genre ? genre.name : null;
      })
      .filter(Boolean)
      .join(", ");
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Paginação local: divide os filmes do array completo em páginas de 10 itens
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Cálculo para exibição dos botões: janela móvel com no máximo 5 botões
  const maxButtonCount = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxButtonCount / 2));
  let endPage = startPage + maxButtonCount - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxButtonCount + 1);
  }
  const pageButtons = [];
  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(i);
  }

  return (
    <main className="bg-[#121113]/90 min-h-screen py-6 text-white border-b border-[#49474E]">
      {/* Barra de busca */}
      <section className="flex items-center justify-center container mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="relative bg-[#1A191B] rounded-sm w-[488px]">
            <input
              type="text"
              placeholder="Pesquise por filmes"
              value={searchQuery}
              onChange={handleInputChange}
              className="text-white placeholder-gray-400 p-4 w-full border-2 border-[#49474E]"
            />
            <button
              className="absolute top-4 right-4"
              onClick={() => handleSearchMovies(searchQuery)}
            >
              <img src={searchImg} alt="Ícone de busca" />
            </button>
          </div>
          <button className="cursor-pointer rounded-sm p-5 bg-[#B744F714] hover:bg-[#8E4EC6]">
            <img src={filterImg} alt="Ícone de filtro" />
          </button>
        </div>
      </section>

      {/* Lista de filmes e paginação */}
      <section className="container mx-auto my-6 bg-[#ebeaf814] p-4 rounded-lg">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-purple-500"></div>
          </div>
        ) : (
          <>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {currentMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onMapGenres={handleMapGenres}
                />
              ))}
            </ul>
            {/* Controles de paginação com janela móvel (máximo de 5 botões) */}
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                  }
                }}
                disabled={currentPage === 1}
                className="px-6 py-3 flex items-center justify-center border border-[#49474E] bg-[#8E4EC6] text-white transition-colors duration-300 hover:bg-[#8E4EC6] disabled:opacity-50 disabled:bg-[#1A191B] disabled:cursor-auto cursor-pointer"
              >
                <img
                  src={leftArrowImg}
                  alt="Botão a esquerda para passar ou voltar a página"
                />
              </button>
              {pageButtons.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-6 py-3 flex items-center justify-center border border-[#49474E] transition-colors duration-300 cursor-pointer ${
                    page === currentPage
                      ? "bg-[#1A191B] text-white"
                      : "bg-[#8E4EC6] text-white hover:bg-[#8E4EC6]"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => {
                  if (currentPage < totalPages) {
                    setCurrentPage(currentPage + 1);
                  }
                }}
                disabled={currentPage === totalPages}
                className="px-6 py-3 flex items-center justify-center border border-[#49474E] bg-[#8E4EC6] text-white transition-colors duration-300 hover:bg-[#8E4EC6] disabled:opacity-50 disabled:bg-[#1A191B] disabled:cursor-auto cursor-pointer"
              >
                <img
                  src={rightArrowImg}
                  alt="Botão a direta para passar ou voltar a página"
                />
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default Home;
