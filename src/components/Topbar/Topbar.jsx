import { Link } from "react-router-dom";
import logoImg from "../../assets/logo-cubos.svg";
import sunImg from "../../assets/sun.svg";
import moonImg from "../../assets/moon.svg";

const Topbar = ({ theme, toggleTheme }) => {
  return (
    <header
      className="bg-background border-b border-border backdrop-blur-[2px] py-4 px-2"
      style={{
        backgroundColor: "rgba(var(--background), 0.5)",
        borderColor: "rgb(var(--border))",
      }}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-foreground">
          <img src={logoImg} alt="Logo da cubos movie" className="h-8" />
        </Link>

        <button
          onClick={toggleTheme}
          className="bg-primary text-background rounded-sm p-2 hover:opacity-90 transition-opacity cursor-pointer"
          style={{
            backgroundColor: "rgb(var(--primary))",
            color: "rgb(var(--background))",
          }}
        >
          <img
            src={theme === "dark" ? sunImg : moonImg}
            alt={theme === "dark" ? "icone de sol" : "icone de lua"}
            className="w-6 h-6"
          />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
