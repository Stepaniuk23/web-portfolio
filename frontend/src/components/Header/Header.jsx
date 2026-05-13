import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { SiThreads } from "react-icons/si";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setShrink(true);
      } else {
        setShrink(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${shrink ? "shrink" : ""}`}>
      {/* DESKTOP HEADER — VOGUE STYLE */}
      <div className="desktop-header">
        <div className="desktop-logo-block">
          <div className="logo-name-block">
            <span className="logo-name-main">Denys Stepaniuk</span>
            <span className="logo-name-tagline">visual storytelling</span>
          </div>
        </div>

        <div className="desktop-separator"></div>

        <nav className="nav-desktop">
          <Link to="/about">ABOUT</Link>
          <Link to="/weddings">WEDDINGS</Link>
          <Link to="/portraits">PORTRAITS</Link>
          <Link to="/stories">STORIES</Link>
          <Link to="/contact">CONTACT</Link>
        </nav>
      </div>

      {/* MOBILE HEADER */}
      <div className="header-container">
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <div className="logo-name-block">
            <span className="logo-name-main">Denys Stepaniuk</span>
            <span className="logo-name-tagline">visual storytelling</span>
          </div>
        </Link>

        <div
          className={`burger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <aside className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <button className="close-btn" onClick={() => setMenuOpen(false)}>
            ×
          </button>

          <Link to="/about" onClick={() => setMenuOpen(false)}>
            ABOUT
          </Link>
          <Link to="/weddings" onClick={() => setMenuOpen(false)}>
            WEDDINGS
          </Link>
          <Link to="/portraits" onClick={() => setMenuOpen(false)}>
            PORTRAITS
          </Link>
          <Link to="/stories" onClick={() => setMenuOpen(false)}>
            STORIES
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            CONTACT
          </Link>

          <div className="socials">
            <FaInstagram />
            <FaFacebookF />
            <SiThreads />
          </div>
        </aside>
      </div>
    </header>
  );
}

export default Header;
