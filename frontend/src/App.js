import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { initAnalytics, revokeAnalytics, trackPageView } from "./analytics";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Portfolio from "./pages/Portfolio/Portfolio";
import Contact from "./pages/Contact/Contact";
import Editorials from "./pages/Editorials/Editorials";
import EditorialDetail from "./pages/Editorials/EditorialDetail";

import Weddings from "./pages/Weddings/Weddings";
import WeddingDetail from "./pages/Weddings/WeddingDetail";
import Portraits from "./pages/Portraits/Portraits";
import Stories from "./pages/Stories/Stories";

import ClientGallery from "./pages/ClientGallery/ClientGallery";
import NotFound from "./pages/NotFound/NotFound";
import Legal from "./pages/Legal/Legal";
import CookieBanner from "./components/CookieBanner/CookieBanner";
import { onConsentChange } from "./consent";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function Analytics() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    initAnalytics();
    return onConsentChange((value) => {
      if (value === "granted") initAnalytics();
      else revokeAnalytics();
    });
  }, []);

  useEffect(() => {
    trackPageView(pathname + search);
  }, [pathname, search]);

  return null;
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Analytics />
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/editorials" element={<Editorials />} />

          <Route path="/weddings" element={<Weddings />} />
          <Route path="/editorials/:id" element={<EditorialDetail />} />
          <Route path="/portraits" element={<Portraits />} />
          <Route path="/stories" element={<Stories />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/gallery/:slug" element={<ClientGallery />} />

          <Route path="/weddings/:id" element={<WeddingDetail />} />
          <Route path="/privacy-policy" element={<Legal type="privacy" />} />
          <Route path="/cookie-policy" element={<Legal type="cookies" />} />

          {/* Все остальные адреса — страница 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
        <CookieBanner />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
