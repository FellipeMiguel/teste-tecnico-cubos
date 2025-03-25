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

  // Estados dos filtros
  const [showFilters, setShowFilters] = useState(false);
  const [filterGenre, setFilterGenre] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    if (!searchQuery.trim()) {
      getMovies();
    }
    getGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  // Função para aplicar os filtros (incluindo o sort)
  const handleApplyFilters = async () => {
    setIsLoading(true);
    try {
      const params = {
        api_key: "b687cf37dd513bd5630631d04190332a",
        language: "pt-BR",
        page: 1,
      };
      if (filterGenre) {
        params.with_genres = filterGenre;
      }
      if (filterYear) {
        params.primary_release_year = filterYear;
      }
      if (sortBy) {
        params.sort_by = sortBy;
      }
      const response = await axios({
        method: "get",
        url: "https://api.themoviedb.org/3/discover/movie",
        params: params,
      });
      setMovies(response.data.results);
      console.log("Filtros aplicados:", response.data.results);
      setCurrentPage(1);
    } catch (err) {
      console.log("Erro ao aplicar filtros:", err);
    }
    setIsLoading(false);
  };

  // Paginação local: divide o array completo de filmes em páginas de 10 itens
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Cálculo para a exibição dos botões (janela móvel com no máximo 5 botões)
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
          <button
            className="cursor-pointer rounded-sm p-5 bg-[#B744F714] hover:bg-[#8E4EC6]"
            onClick={toggleFilters}
          >
            <img src={filterImg} alt="Ícone de filtro" />
          </button>
        </div>
      </section>

      {showFilters && (
        <section className="container mx-auto bg-[#1A191B] p-4 rounded-lg mt-4">
          <h2 className="text-lg font-semibold text-white mb-4">Filtros</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-white text-sm block mb-2" htmlFor="genre">
                Gênero
              </label>
              <select
                id="genre"
                value={filterGenre}
                onChange={(e) => setFilterGenre(e.target.value)}
                className="bg-[#121113] text-white border border-[#49474E] rounded-sm p-2 w-full"
              >
                <option value="">Selecione</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="text-white text-sm block mb-2"
                htmlFor="releaseYear"
              >
                Ano de Lançamento
              </label>
              <input
                type="number"
                id="releaseYear"
                placeholder="Ex: 2023"
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="bg-[#121113] text-white border border-[#49474E] rounded-sm p-2 w-full"
              />
            </div>
            <div>
              <label className="text-white text-sm block mb-2" htmlFor="sortBy">
                Ordenar por
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#121113] text-white border border-[#49474E] rounded-sm p-2 w-full"
              >
                <option value="">Selecione</option>
                <option value="popularity.asc">Menos Popular</option>
                <option value="popularity.desc">Mais Popular</option>
                <option value="vote_average.asc">Menor Nota</option>
                <option value="vote_average.desc">Maior Nota</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="bg-[#B744F714] text-white px-4 py-2 rounded-sm hover:bg-[#8E4EC6] transition cursor-pointer"
              onClick={handleApplyFilters}
            >
              Aplicar Filtros
            </button>
          </div>
        </section>
      )}

      <section className="container mx-auto my-6 bg-[#ebeaf814] p-4 rounded-lg">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-purple-500"></div>
          </div>
        ) : (
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {currentMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onMapGenres={handleMapGenres}
              />
            ))}
          </ul>
        )}
      </section>

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
            alt="Botão a direita para passar ou voltar a página"
          />
        </button>
      </div>
    </main>
  );
};

export default Home;
