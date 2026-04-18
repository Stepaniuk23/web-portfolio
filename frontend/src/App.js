import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Hero from "./pages/Hero/Hero";
import About from "./pages/About/About";
import Gallery from "./pages/Gallery/Gallery";
import Contact from "./pages/Contact/Contact";

import ClientGallery from "./pages/ClientGallery/ClientGallery";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />

              <section id="about">
                <About />
              </section>

              <section id="gallery">
                <Gallery />
              </section>

              <section id="contact">
                <Contact />
              </section>

              <Footer />
            </>
          }
        />

        {/* Новый маршрут для клиентской галереи */}
        <Route path="/gallery/:slug" element={<ClientGallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
