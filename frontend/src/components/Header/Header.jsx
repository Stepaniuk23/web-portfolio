import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LangLink from "../../i18n/LangLink";
import { useLanguage, useLocalizePath, useT } from "../../i18n/LanguageContext";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { FaInstagram, FaFacebookF, FaPinterestP } from "react-icons/fa6";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const navigate = useNavigate();
  const { path } = useLanguage();
  const localize = useLocalizePath();
  const t = useT();

  const handleHomeNavigation = (event) => {
    event.preventDefault();
    setMenuOpen(false);

    if (path === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigate(localize("/"));
    window.scrollTo(0, 0);
  };

  const renderLogoNameBlock = () => (
    <div className="logo-name-block">
      <span className="logo-name-main">Denys Stepaniuk</span>
      {/* Логотип всегда на английском — это часть бренда */}
      <span className="logo-name-tagline">
        Wedding & Editorial Photographer
      </span>
    </div>
  );

  useEffect(() => {
    let previousScrollY = window.scrollY;
    let animationFrameId = null;

    const handleScroll = () => {
      if (animationFrameId !== null) return;

      animationFrameId = window.requestAnimationFrame(() => {
        animationFrameId = null;

        // Lightbox scroll lock resets scrollY to 0; ignore it so the header state is preserved.
        if (document.body.style.position === "fixed") return;

        const currentScrollY = window.scrollY;

        if (currentScrollY <= 0) {
          setHidden(false);
        } else if (!menuOpen && currentScrollY !== previousScrollY) {
          setHidden(currentScrollY > previousScrollY);
        }

        previousScrollY = currentScrollY;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) setHidden(false);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  return (
    <header className={`header ${hidden && !menuOpen ? "is-hidden" : ""}`}>
      {/* DESKTOP HEADER — VOGUE STYLE */}
      <div className="desktop-header">
        <div className="desktop-logo-block">
          <LangLink to="/" onClick={handleHomeNavigation}>
            {renderLogoNameBlock()}
          </LangLink>
        </div>
        <nav className="nav-desktop">
          <LangLink to="/" onClick={handleHomeNavigation}>
            {t("nav.home").toUpperCase()}
          </LangLink>
          <LangLink to="/weddings">{t("nav.weddings").toUpperCase()}</LangLink>
          <LangLink to="/editorials">
            {t("nav.editorials").toUpperCase()}
          </LangLink>
          <LangLink to="/about">{t("nav.about").toUpperCase()}</LangLink>
          <LangLink to="/contact">{t("nav.contact").toUpperCase()}</LangLink>
          <LanguageSwitcher variant="desktop" />
        </nav>
      </div>

      {/* MOBILE HEADER */}
      <div className="header-container">
        <LangLink to="/" className="logo" onClick={handleHomeNavigation}>
          {renderLogoNameBlock()}
        </LangLink>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={
            menuOpen ? t("header.menuCloseAria") : t("header.menuOpenAria")
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? t("header.close") : t("header.menu")}
        </button>

        <aside
          id="mobile-navigation"
          className={`mobile-menu ${menuOpen ? "open" : ""}`}
        >
          <LangLink to="/" onClick={handleHomeNavigation}>
            {t("nav.home").toUpperCase()}
          </LangLink>
          <LangLink to="/weddings" onClick={() => setMenuOpen(false)}>
            {t("nav.weddings").toUpperCase()}
          </LangLink>
          <LangLink to="/editorials" onClick={() => setMenuOpen(false)}>
            {t("nav.editorials").toUpperCase()}
          </LangLink>
          <LangLink to="/about" onClick={() => setMenuOpen(false)}>
            {t("nav.about").toUpperCase()}
          </LangLink>
          <LangLink to="/contact" onClick={() => setMenuOpen(false)}>
            {t("nav.contact").toUpperCase()}
          </LangLink>

          <LanguageSwitcher
            variant="mobile"
            onNavigate={() => setMenuOpen(false)}
          />

          <div className="socials">
            <a
              href="https://instagram.com/denysstepanyuk"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/share/1DWX2SJA6d/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://pin.it/3CWS3OsV1"
              target="_blank"
              rel="noreferrer"
              aria-label="Pinterest"
            >
              <FaPinterestP />
            </a>
          </div>
        </aside>
      </div>
    </header>
  );
}

export default Header;
