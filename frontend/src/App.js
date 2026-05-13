import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Portfolio from "./pages/Portfolio/Portfolio";
import Contact from "./pages/Contact/Contact";

import Weddings from "./pages/Weddings/Weddings";
import Portraits from "./pages/Portraits/Portraits";
import Stories from "./pages/Stories/Stories";

import ClientGallery from "./pages/ClientGallery/ClientGallery";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />

        <Route path="/weddings" element={<Weddings />} />
        <Route path="/portraits" element={<Portraits />} />
        <Route path="/stories" element={<Stories />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/gallery/:slug" element={<ClientGallery />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
