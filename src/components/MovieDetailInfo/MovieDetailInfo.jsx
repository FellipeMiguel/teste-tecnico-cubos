import React from "react";

const MovieDetailInfo = ({
  movie,
  lucro,
  formatDate,
  statusMap,
  languageMap,
}) => {
  return (
    <div className="flex justify-between mt-4 flex-col xl:flex-row">
      <div className="xl:w-1/2 flex flex-col gap-4">
        <div className="p-4 bg-[#262626]/70 rounded-sm">
          <h4 className="text-zinc-400 text-base">SINOPSE</h4>
          <p className="text-zinc-100 text-base font-bold mt-2">
            {movie.overview}
          </p>
        </div>
        <div className="p-4 bg-[#262626]/70 rounded-sm">
          <h4 className="text-zinc-400 text-sm font-bold">GÊNEROS</h4>
          {movie.genres && (
            <div className="flex gap-2 flex-wrap">
              {movie.genres.map((genre) => (
                <div
                  key={genre.id}
                  className="p-2 bg-[#B744F714] rounded-sm md:text-base text-sm"
                >
                  <p>{genre.name.toUpperCase()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="md:w-48 w-37 p-4 bg-neutral-800/70 rounded text-xs md:text-base">
            <h4 className="text-zinc-400 font-bold">Data de lançamento</h4>
            <p>{formatDate(movie.release_date)}</p>
          </div>
          <div className="md:w-48 w-37 p-4 bg-neutral-800/70 rounded text-xs md:text-base">
            <p>Duração</p>
            <p>{movie.runtime} minutos</p>
          </div>
          <div className="md:w-48 w-37 p-4 bg-neutral-800/70 rounded text-xs md:text-base">
            <h4 className="text-zinc-400 font-bold">Situação</h4>
            <p>{statusMap[movie.status] || movie.status}</p>
          </div>
          <div className="md:w-48 w-37 p-4 bg-neutral-800/70 rounded text-xs md:text-base">
            <h4 className="text-zinc-400 font-bold">Idioma original</h4>
            <p>
              {languageMap[movie.original_language] || movie.original_language}
            </p>
          </div>
        </div>

        <div className="flex lg:flex-wrap gap-2">
          <div className="p-1 bg-neutral-800 bg-opacity-75 rounded">
            <h4 className="text-zinc-400 font-bold text-xs md:text-base">
              Orçamento
            </h4>
            <p className="text-xs mt-2">
              {movie.budget.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
          <div className="p-1 bg-neutral-800 bg-opacity-75 rounded">
            <h4 className="text-zinc-400 font-bold text-xs md:text-base">
              Receita
            </h4>
            <p className="text-xs mt-2">
              {movie.revenue.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
          <div className="p-1 bg-neutral-800 bg-opacity-75 rounded">
            <h4 className="text-zinc-400 font-bold text-xs md:text-base">
              Lucro
            </h4>
            <p className="text-xs mt-2">
              {lucro.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailInfo;
