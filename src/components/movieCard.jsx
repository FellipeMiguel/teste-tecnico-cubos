import { Link } from "react-router-dom";

const MovieCard = ({ movie, onMapGenres }) => {
  const votePercent = Math.round(movie.vote_average * 10);
  const degree = votePercent * 3.6;

  return (
    <Link to={`/movie/${movie.id}`} className="p-4 group">
      <li
        key={movie.id}
        className="shadow-[0px_1px_5px_0px_rgba(0,0,0,0.20)] relative"
      >
        <div className="relative">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                : `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            }
            alt={movie.title || "Sem título"}
            className="rounded-sm"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,_rgba(0,0,0,0.9)_10%,_rgba(0,0,0,0)_100%)] rounded-sm"></div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="relative h-32 w-32 rounded-full">
              <div
                className="h-full w-full rounded-full"
                style={{
                  background: `conic-gradient(#fbbf24 ${degree}deg, #d1d5db ${degree}deg)`,
                }}
              ></div>

              <div className="absolute inset-2 rounded-full flex items-center justify-center bg-[#121113]">
                <span className="text-white font-bold text-lg">
                  {votePercent}%
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-2">
          <p className="text-lg font-bold mb-2">{movie.title}</p>
          <div className="hidden transition-opacity duration-700 group-hover:block">
            <p className="text-sm text-[#B4B4B4]">
              {onMapGenres(movie.genre_ids) || "Não disponível"}
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default MovieCard;
