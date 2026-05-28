import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Portfolio from "./pages/Portfolio/Portfolio";
import Contact from "./pages/Contact/Contact";

import Weddings from "./pages/Weddings/Weddings";
import WeddingDetail from "./pages/Weddings/WeddingDetail";
import Portraits from "./pages/Portraits/Portraits";
import Stories from "./pages/Stories/Stories";

import ClientGallery from "./pages/ClientGallery/ClientGallery";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
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

          <Route path="/weddings/:id" element={<WeddingDetail />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
