import { Link } from "react-router-dom";
import logoImg from "../assets/logo-cubos.svg";
import sunImg from "../assets/sun.svg";

const Topbar = () => {
  return (
    <header className=" bg-[#121113] backdrop-blur-[2px] py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white">
          <img src={logoImg} alt="" className="" />
        </div>
        <Link to="/" className="bg-[#B744F714] flex">
          <button className="cursor-pointer rounded-sm px-5 py-3">
            <img src={sunImg} alt="" className="" />
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Topbar;
