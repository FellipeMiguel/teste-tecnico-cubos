import { useEffect, useState } from "react";
import axios from "axios";
import searchImg from "../assets/Search.svg";
import filterImg from "../assets/filter.svg";
import MovieCard from "../components/movieCard";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getMovies();
    getGenres();
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
    await axios({
      method: "get",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        api_key: "b687cf37dd513bd5630631d04190332a",
        language: "pt-BR",
      },
    })
      .then((response) => {
        setMovies(response.data.results);
        console.log("Filmes carregados:", response.data.results);
      })
      .catch((err) => {
        console.log("Erro ao buscar filmes:", err);
      });
  };

  const getGenres = async () => {
    await axios({
      method: "get",
      url: "https://api.themoviedb.org/3/genre/movie/list",
      params: {
        api_key: "b687cf37dd513bd5630631d04190332a",
        language: "pt-BR",
      },
    })
      .then((response) => {
        setGenres(response.data.genres);
        console.log("Gêneros carregados:", response.data.genres);
      })
      .catch((err) => {
        console.log("Erro ao buscar gêneros:", err);
      });
  };

  const handleSearchMovies = async (query) => {
    if (!query.trim()) {
      getMovies();
      return;
    }

    await axios({
      method: "get",
      url: "https://api.themoviedb.org/3/search/movie",
      params: {
        api_key: "b687cf37dd513bd5630631d04190332a",
        language: "pt-BR",
        query: query,
      },
    })
      .then((response) => {
        setMovies(response.data.results);
        console.log("Resultados da pesquisa:", response.data.results);
      })
      .catch((err) => {
        console.log("Erro ao buscar filmes:", err);
      });
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

  return (
    <main className="bg-[#121113]/90 min-h-screen pt-6 text-white border-b-1 border-[#49474E]">
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

      <section className="container mx-auto my-6 bg-[#ebeaf814] p-4 rounded-lg">
        {movies.length > 0 ? (
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onMapGenres={handleMapGenres}
              />
            ))}
          </ul>
        ) : (
          <div className="flex justify-center items-center">
            <div className="w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-purple-500"></div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
