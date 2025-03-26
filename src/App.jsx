import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/movieDetail";
import Topbar from "./components/topbar";
import Footer from "./components/footer";
import NotFound from "./pages/notFound";

const App = () => {
  return (
    <Router>
      <div className="">
        <div className="bg-[url('./assets/background.png')] bg-cover bg-no-repeat bg-top h-[564px]">
          <Topbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<About />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
