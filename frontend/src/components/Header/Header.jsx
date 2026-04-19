import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  const scrollLink = (hash) => {
    if (isHome) {
      return hash; // "#about"
    } else {
      return "/" + hash; // "/#about"
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Логотип — всегда на главную */}
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          Denys Stepaniuk
        </Link>

        {/* Навигация */}
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <a href={scrollLink("#home")} onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <a href={scrollLink("#about")} onClick={() => setMenuOpen(false)}>
            About
          </a>
          <a href={scrollLink("#gallery")} onClick={() => setMenuOpen(false)}>
            Gallery
          </a>
          <a href={scrollLink("#contact")} onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </nav>

        {/* Бургер */}
        <div
          className={`burger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
      </div>
    </header>
  );
}

export default Header;
