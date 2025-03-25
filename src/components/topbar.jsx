import { Link } from "react-router-dom";
import logoImg from "../assets/logo-cubos.svg";
import sunImg from "../assets/sun.svg";

const Topbar = () => {
  return (
    <header className=" bg-[#121113] backdrop-blur-[2px] py-4 border-b-1 border-[#49474E]">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white cursor-pointer">
          <img src={logoImg} alt="" className="" />
        </Link>
        <div className="bg-[#B744F714] hover:bg-[#8E4EC6] flex">
          <button className="cursor-pointer rounded-sm px-5 py-3">
            <img src={sunImg} alt="" className="" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
