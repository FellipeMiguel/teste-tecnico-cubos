import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import MovieDetail from "./pages/movieDetail";
import Topbar from "./components/topbar";
import Footer from "./components/footer";
import NotFound from "./pages/notFound";

const App = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <Router>
      {/* Background fixo (não muda com tema) */}
      <div className="bg-[url('./assets/background.png')] bg-cover bg-no-repeat bg-top h-[564px]">
        <Topbar theme={theme} toggleTheme={toggleTheme} />

        {/* Conteúdo principal com overlay escuro/claro */}
        <main className="flex-1 bg-background/90 backdrop-blur-[2px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer className="border-t border-border" />
      </div>
    </Router>
  );
};

export default App;
