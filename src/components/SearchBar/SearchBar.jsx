import React from "react";
import searchImg from "../../assets/Search.svg";
import filterImg from "../../assets/filter.svg";

const SearchBar = ({
  searchQuery,
  handleInputChange,
  handleSearchMovies,
  toggleFilters,
}) => {
  return (
    <section className="flex items-center justify-center container mx-auto px-4">
      <div className="flex items-center gap-2.5 w-full max-w-md">
        <div
          className="relative bg-[#1A191B] rounded-sm w-full"
          style={{
            backgroundColor: "rgba(var(--background), 0.9)",
            borderColor: "rgb(var(--border))",
          }}
        >
          <input
            type="text"
            style={{
              color: "rgb(var(--foreground))",
              caretColor: "rgb(var(--primary))",
            }}
            placeholder="Pesquise por filmes"
            value={searchQuery}
            onChange={handleInputChange}
            className="text-white placeholder-gray-400 p-4  w-full border-2 border-[#49474E] rounded-sm"
          />
          <button
            className="absolute top-4 right-4"
            onClick={() => handleSearchMovies(searchQuery)}
            aria-label="Buscar"
          >
            <img src={searchImg} alt="Ícone de busca" />
          </button>
        </div>
        <button
          onClick={toggleFilters}
          style={{
            borderColor: "rgb(var(--border))",
          }}
          className="p-5 bg-[#B744F714] rounded-sm border transition-colors hover:bg-[#8E4EC6] cursor-pointer"
        >
          <img src={filterImg} alt="Filtros" />
        </button>
      </div>
    </section>
  );
};

export default SearchBar;
