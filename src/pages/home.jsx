import { useEffect, useState } from "react";
import searchImg from "../assets/Search.svg";
import filterImg from "../assets/filter.svg";
import axios from "axios";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getMovies();
    getGenres();
  }, []);

  const getMovies = () => {
    axios({
      method: "get",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        api_key: "b687cf37dd513bd5630631d04190332a",
        language: "pt-BR",
      },
    })
      .then((response) => {
        setMovies(response.data.results);
        console.log("Filmes: ", response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getGenres = () => {
    axios({
      method: "get",
      url: "https://api.themoviedb.org/3/genre/movie/list",
      params: {
        api_key: "b687cf37dd513bd5630631d04190332a",
        language: "pt-BR",
      },
    })
      .then((response) => {
        setGenres(response.data.genres);
        console.log(response.data.genres);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const mapGenres = (movieGenreIds) => {
    return movieGenreIds
      .map((id) => {
        const genre = genres.find((g) => g.id === id);
        return genre ? genre.name : null;
      })
      .filter(Boolean)
      .join(", ");
  };

  return (
    <main className="bg-[#121113]/90 min-h-screen pt-2 text-white">
      <section className="flex items-center justify-center container mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="relative bg-[#1A191B] rounded-sm w-[488px]">
            <input
              type="text"
              placeholder="Pesquise por filmes"
              className=" text-[#49474E] placeholder-gray-400 p-4 w-full border-2"
            />
            <button className="absolute top-4 right-4">
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
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <li key={movie.id} className="">
                <p className="text-lg font-bold mb-2">{movie.title}</p>
                <p className="text-sm text-[#B4B4B4]">
                  {mapGenres(movie.genre_ids) || "Não disponível"}
                </p>
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt=""
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">Carregando filmes...</p>
        )}
      </section>
    </main>
  );
};

export default Home;
