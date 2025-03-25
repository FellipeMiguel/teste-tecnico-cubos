import React from "react";

const Filter = ({
  filterGenre,
  setFilterGenre,
  filterYear,
  setFilterYear,
  sortBy,
  setSortBy,
  handleClearFilters,
  handleApplyFilters,
  genres,
}) => {
  return (
    <section className="container mx-auto px-4 bg-[#1A191B] p-4 rounded-lg mt-4">
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
            <option value="popularity.asc">Popularidade Crescente</option>
            <option value="popularity.desc">Popularidade Decrescente</option>
            <option value="vote_average.asc">Nota Crescente</option>
            <option value="vote_average.desc">Nota Decrescente</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <button
          className="bg-[#B744F714] text-white px-4 py-2 rounded-sm hover:bg-[#8E4EC6] transition cursor-pointer"
          onClick={handleClearFilters}
        >
          Remover Filtros
        </button>
        <button
          className="bg-[#B744F714] text-white px-4 py-2 rounded-sm hover:bg-[#8E4EC6] transition cursor-pointer"
          onClick={handleApplyFilters}
        >
          Aplicar Filtros
        </button>
      </div>
    </section>
  );
};

export default Filter;
