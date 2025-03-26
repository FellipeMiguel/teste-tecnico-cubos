import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/searchBar";
import MovieList from "../components/movieList";
import Filter from "../components/filter";
import setaEsquerda from "../assets/left-arrow.svg";
import setaDireita from "../assets/right-arrow.svg";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  const [maxButtonCount, setMaxButtonCount] = useState(5);

  const [showFilters, setShowFilters] = useState(false);
  const [filterGenre, setFilterGenre] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Hook para atualizar maxButtonCount conforme o tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setMaxButtonCount(2);
      } else if (width < 768) {
        setMaxButtonCount(3);
      } else {
        setMaxButtonCount(5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Carrega filmes sem filtros – combina os resultados de 10 páginas da API
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

  // Busca filmes conforme o termo digitado
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

  // Busca gêneros
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

  // Mapeia os IDs dos gêneros para os nomes
  const handleMapGenres = (movieGenreIds) => {
    if (!movieGenreIds || !Array.isArray(movieGenreIds)) return "";
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

  // Aplica os filtros selecionados
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
      // Requisição para obter os resultados e o total de páginas
      const firstResponse = await axios({
        method: "get",
        url: "https://api.themoviedb.org/3/discover/movie",
        params: params,
      });
      let filteredMovies = firstResponse.data.results;
      const totalFilteredPages = firstResponse.data.total_pages;
      const pagesToFetch = totalFilteredPages > 10 ? 10 : totalFilteredPages;

      if (pagesToFetch > 1) {
        const requests = Array.from({ length: pagesToFetch - 1 }, (_, index) =>
          axios({
            method: "get",
            url: "https://api.themoviedb.org/3/discover/movie",
            params: { ...params, page: index + 2 },
          })
        );
        const responses = await Promise.all(requests);
        responses.forEach((res) => {
          filteredMovies = filteredMovies.concat(res.data.results);
        });
      }
      setMovies(filteredMovies);
      console.log("Filtros aplicados:", filteredMovies);
      setCurrentPage(1);
    } catch (err) {
      console.log("Erro ao aplicar filtros:", err);
    }
    setIsLoading(false);
  };

  // Função para remover filtros
  const handleClearFilters = () => {
    setFilterGenre("");
    setFilterYear("");
    setSortBy("");
    setShowFilters(false);
    getMovies();
  };

  // Divide o array completo de filmes em páginas de 10 itens
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Cálculo para os botões de paginação
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
      <SearchBar
        searchQuery={searchQuery}
        handleInputChange={handleInputChange}
        handleSearchMovies={handleSearchMovies}
        toggleFilters={toggleFilters}
      />

      {showFilters && (
        <Filter
          filterGenre={filterGenre}
          setFilterGenre={setFilterGenre}
          filterYear={filterYear}
          setFilterYear={setFilterYear}
          sortBy={sortBy}
          setSortBy={setSortBy}
          handleClearFilters={handleClearFilters}
          handleApplyFilters={handleApplyFilters}
          genres={genres}
        />
      )}

      <section className="container mx-auto my-6 px-4 bg-[#ebeaf814] p-4 rounded-lg">
        <MovieList
          movies={currentMovies}
          isLoading={isLoading}
          handleMapGenres={handleMapGenres}
        />
      </section>

      <div className="flex justify-center mt-6 space-x-2 px-4">
        <button
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
          disabled={currentPage === 1}
          className="px-6 py-3 flex items-center justify-center border border-[#49474E] bg-[#8E4EC6] text-white transition-colors duration-300 hover:bg-[#8E4EC6] disabled:opacity-50 disabled:bg-[#1A191B] disabled:cursor-auto cursor-pointer rounded-sm"
        >
          <img src={setaEsquerda} alt="Botão a esquerda" />
        </button>
        {pageButtons.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-6 py-3 flex items-center justify-center border border-[#49474E] transition-colors duration-300 cursor-pointer rounded-sm ${
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
          className="px-6 py-3 flex items-center justify-center border border-[#49474E] bg-[#8E4EC6] text-white transition-colors duration-300 hover:bg-[#8E4EC6] disabled:opacity-50 disabled:bg-[#1A191B] disabled:cursor-auto cursor-pointer rounded-sm"
        >
          <img src={setaDireita} alt="Botão a direita" />
        </button>
      </div>
    </main>
  );
};

export default Home;
