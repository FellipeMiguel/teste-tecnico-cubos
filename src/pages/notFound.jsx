// notFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="bg-[#121113]/90 min-h-[80vh] py-6 border-b border-[#49474E]">
      <div className="flex flex-col items-center justify-center text-white container mx-auto bg-[#ebeaf814] py-10 rounded-lg">
        <h1 className="text-5xl font-bold">404</h1>
        <p className="text-lg mt-4">
          Oops! A página que você está procurando não existe.
        </p>
        <Link
          to="/"
          className="mt-6 px-6 py-3 text-white bg-[#B744F714] rounded shadow-md hover:bg-[#8E4EC6]/80 transition-colors duration-300"
        >
          Voltar para a Página Inicial
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
