import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Topbar from "./components/topbar";

const App = () => {
  return (
    <Router>
      <div className="bg-[url('./assets/background.png')] bg-cover bg-no-repeat bg-top  h-[564px]">
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
