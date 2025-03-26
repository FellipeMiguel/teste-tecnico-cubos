import React from "react";
import searchImg from "../assets/Search.svg";
import filterImg from "../assets/filter.svg";

const SearchBar = ({
  searchQuery,
  handleInputChange,
  handleSearchMovies,
  toggleFilters,
}) => {
  return (
    <section className="flex items-center justify-center container mx-auto px-4">
      <div className="flex items-center gap-2.5 w-full max-w-md">
        <div className="relative bg-[#1A191B] rounded-sm w-full">
          <input
            type="text"
            placeholder="Pesquise por filmes"
            value={searchQuery}
            onChange={handleInputChange}
            className="text-white placeholder-gray-400 p-4  w-full border-2 border-[#49474E] rounded-sm"
          />
          <button
            className="absolute top-4 right-4"
            onClick={() => handleSearchMovies(searchQuery)}
          >
            <img src={searchImg} alt="Ícone de busca" />
          </button>
        </div>
        <button
          className="cursor-pointer rounded-sm p-5 bg-[#B744F714]/60 hover:bg-[#8E4EC6]"
          onClick={toggleFilters}
        >
          <img src={filterImg} alt="Ícone de filtro" />
        </button>
      </div>
    </section>
  );
};

export default SearchBar;
