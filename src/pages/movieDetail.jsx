import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: "b687cf37dd513bd5630631d04190332a",
              language: "pt-BR",
            },
          }
        );
        setMovie(response.data);
      } catch (err) {
        console.log("Erro ao buscar detalhes do filme:", err);
      }
      setIsLoading(false);
    };

    fetchMovieDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-purple-500"></div>
      </div>
    );
  }

  if (!movie) {
    return <div className="text-center">Filme não encontrado.</div>;
  }

  return (
    <main className="bg-[#121113]/90 min-h-screen py-6 text-white border-b border-[#49474E]">
      <div className="container mx-auto flex flex-col md:flex-row gap-4">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded"
        />
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="mt-2">{movie.overview}</p>
          <div className="mt-4">
            <p>
              <strong>Data de lançamento:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Duração:</strong> {movie.runtime} minutos
            </p>
            {movie.genres && (
              <p>
                <strong>Gêneros:</strong>{" "}
                {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
            )}
            <p>
              <strong>Avaliação:</strong> {movie.vote_average}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MovieDetail;
