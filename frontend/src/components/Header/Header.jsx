import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { SiThreads } from "react-icons/si";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shrink, setShrink] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeNavigation = (event) => {
    event.preventDefault();
    setMenuOpen(false);

    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigate("/");
    window.scrollTo(0, 0);
  };

  const renderLogoNameBlock = () => (
    <div className="logo-name-block">
      <span className="logo-name-main">Denys Stepaniuk</span>
      <span className="logo-name-tagline">
        Wedding & Editorial Photographer
      </span>
    </div>
  );

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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  return (
    <header className={`header ${shrink ? "shrink" : ""}`}>
      {/* DESKTOP HEADER — VOGUE STYLE */}
      <div className="desktop-header">
        <div className="desktop-logo-block">
          <Link to="/" onClick={handleHomeNavigation}>
            {renderLogoNameBlock()}
          </Link>
        </div>

        <div className="desktop-separator"></div>

        <nav className="nav-desktop">
          <Link to="/" onClick={handleHomeNavigation}>
            HOME
          </Link>
          <Link to="/weddings">WEDDINGS</Link>
          <Link to="/editorials">EDITORIALS</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/contact">CONTACT</Link>
        </nav>
      </div>

      {/* MOBILE HEADER */}
      <div className="header-container">
        <Link to="/" className="logo" onClick={handleHomeNavigation}>
          {renderLogoNameBlock()}
        </Link>

        <div
          className={`burger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <aside className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <button
            className="close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>

          <Link to="/" onClick={handleHomeNavigation}>
            HOME
          </Link>
          <Link to="/weddings" onClick={() => setMenuOpen(false)}>
            WEDDINGS
          </Link>
          <Link to="/editorials" onClick={() => setMenuOpen(false)}>
            EDITORIALS
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            ABOUT
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            CONTACT
          </Link>

          <div className="socials">
            <FaInstagram aria-label="Instagram" />
            <FaFacebookF aria-label="Facebook" />
            <SiThreads aria-label="Threads" />
          </div>
        </aside>
      </div>
    </header>
  );
}

export default Header;
