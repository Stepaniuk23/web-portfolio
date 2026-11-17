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
import { LanguageProvider } from "./i18n/LanguageContext";
import { DEFAULT_LANG, LANGUAGES } from "./i18n/languages";
import Legal from "./pages/Legal/Legal";
import CookieBanner from "./components/CookieBanner/CookieBanner";
import { onConsentChange } from "./consent";
import { takeSavedScroll, targetScrollY } from "./i18n/scrollMemory";

function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    const savedPlace = state?.keepScrollY ? takeSavedScroll() : null;

    if (savedPlace === null) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return undefined;
    }

    // Смена языка: остаёмся у того же блока страницы.
    // Пока новая версия догружается (фото, шрифты, данные), блоки могут
    // сдвигаться — поэтому до 2.5 секунды поправляем положение, пока оно
    // не перестанет меняться.
    let frameId = null;
    let stopped = false;
    let stableFrames = 0;
    const startedAt = performance.now();

    // На сайте включена плавная прокрутка (index.css). Здесь она не нужна:
    // страница должна сразу встать на место, без «доезжания».
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    const stop = () => {
      if (stopped) return;
      stopped = true;
      root.style.scrollBehavior = previousScrollBehavior;
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };

    const restore = () => {
      if (stopped) return;
      const targetY = targetScrollY(savedPlace);
      if (Math.abs(window.scrollY - targetY) < 2) {
        stableFrames += 1;
      } else {
        stableFrames = 0;
        window.scrollTo({ top: targetY, left: 0, behavior: "auto" });
      }
      const elapsed = performance.now() - startedAt;
      if ((stableFrames > 30 && elapsed > 600) || elapsed > 2500) {
        stop();
        return;
      }
      frameId = window.requestAnimationFrame(restore);
    };

    // Если посетитель сам начал прокручивать — не мешаем ему
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);

    restore();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

        <LanguageProvider>
          <ScrollToTop />
          <Analytics />
          <Header />

          <Routes>
            {/*
              Одинаковый набор страниц для каждого языка:
              английский — без префикса (/about), остальные — /cs/about, /uk/about, /ru/about
            */}
            {LANGUAGES.map((lang) => (
              <Route
                key={lang}
                path={lang === DEFAULT_LANG ? "/" : `/${lang}`}
              >
                <Route index element={<Home />} />

                <Route path="about" element={<About />} />
                <Route path="portfolio" element={<Portfolio />} />
                <Route path="editorials" element={<Editorials />} />

                <Route path="weddings" element={<Weddings />} />
                <Route path="editorials/:id" element={<EditorialDetail />} />
                <Route path="portraits" element={<Portraits />} />
                <Route path="stories" element={<Stories />} />

                <Route path="contact" element={<Contact />} />

                <Route path="weddings/:id" element={<WeddingDetail />} />
                <Route
                  path="privacy-policy"
                  element={<Legal type="privacy" />}
                />
                <Route path="cookie-policy" element={<Legal type="cookies" />} />

                {/* Все остальные адреса — страница 404 */}
                <Route path="*" element={<NotFound />} />
              </Route>
            ))}

            {/* Приватные галереи клиентов — только на английском */}
            <Route path="/gallery/:slug" element={<ClientGallery />} />
          </Routes>

          <Footer />
          <CookieBanner />
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
