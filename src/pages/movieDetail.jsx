import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ApprovalPercent from "../components/approvalPercent";
import MovieDetailInfo from "../components/movieDetailInfo";
import Trailer from "../components/trailer";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState("");
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

  // Busca o trailer para exibição
  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos`,
          {
            params: {
              api_key: "b687cf37dd513bd5630631d04190332a",
              language: "pt-BR",
            },
          }
        );
        const trailers = response.data.results.filter(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailers.length > 0) {
          setVideoKey(trailers[0].key);
        }
      } catch (error) {
        console.log("Erro ao buscar trailer:", error);
      }
    };

    fetchTrailer();
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

  const votePercent = Math.round(movie.vote_average * 10);
  const degree = (votePercent * 360) / 100;
  const lucro = movie.revenue - movie.budget;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };

  const statusMap = {
    Released: "Lançado",
    "Post Production": "Em Pós-Produção",
    "In Production": "Em Produção",
    Planned: "Planejado",
  };

  const languageMap = {
    en: "Inglês",
    pt: "Português",
    fr: "Francês",
    es: "Espanhol",
    it: "Italiano",
    de: "Alemão",
    ja: "Japonês",
    ko: "Coreano",
    ru: "Russo",
    zh: "Chinês",
    ar: "Árabe",
    hi: "Hindi",
    bn: "Bengali",
    pa: "Punjabi",
    vi: "Vietnamita",
    th: "Tailandês",
    tr: "Turco",
    pl: "Polonês",
    nl: "Holandês",
    ro: "Romeno",
    sv: "Sueco",
    no: "Norueguês",
    da: "Dinamarquês",
    fi: "Finlandês",
    cs: "Tcheco",
    hu: "Húngaro",
    el: "Grego",
    he: "Hebraico",
    id: "Indonésio",
    ms: "Malaio",
  };

  return (
    <main className="bg-[#121113]/90 min-h-[85vh] md:py-6 py-4 text-white border-b border-[#49474E]">
      <section
        className="w-full container mx-auto bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="container mx-auto md:p-8 p-4 bg-[#121113]/90">
          <div className="flex gap-8 flex-col lg:flex-row">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="max-h-[542px] max-w-96 rounded"
            />
            <div className="w-full">
              <div className="flex justify-between flex-col xl:flex-row">
                <div className="flex flex-col md:gap-5 md:mb-0 mb-2">
                  <div>
                    <h1 className="text-3xl font-bold">{movie.title}</h1>
                    <h2 className="text-base text-[#a1a1aa]">
                      Título origial: {movie.original_title}
                    </h2>
                  </div>
                  {movie.tagline && (
                    <h3 className="text-base text-[#f4f4f5]">
                      {movie.tagline}
                    </h3>
                  )}
                </div>
                <div className="flex gap-4 items-center">
                  <div className="p-4 bg-[#262626]/70 rounded-sm">
                    <h4 className="text-zinc-400 font-bold">Popularidade</h4>{" "}
                    <p>{movie.popularity.toFixed(3)}</p>
                  </div>
                  <div className="p-4 bg-[#262626]/70 rounded-sm">
                    <h4 className="text-zinc-400 font-bold">Votos</h4>
                    <p>{movie.vote_count}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative h-24 w-24 rounded-full">
                      <ApprovalPercent
                        votePercent={votePercent}
                        degree={degree}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <MovieDetailInfo
                movie={movie}
                lucro={lucro}
                formatDate={formatDate}
                statusMap={statusMap}
                languageMap={languageMap}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto">
        {videoKey && <Trailer videoKey={videoKey} />}
      </section>
    </main>
  );
};

export default MovieDetail;
