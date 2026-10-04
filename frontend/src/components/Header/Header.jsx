import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaPinterestP } from "react-icons/fa6";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
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
    let previousScrollY = window.scrollY;
    let animationFrameId = null;

    const handleScroll = () => {
      if (animationFrameId !== null) return;

      animationFrameId = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY <= 0) {
          setHidden(false);
        } else if (!menuOpen && currentScrollY !== previousScrollY) {
          setHidden(currentScrollY > previousScrollY);
        }

        previousScrollY = currentScrollY;
        animationFrameId = null;
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
          <Link to="/" onClick={handleHomeNavigation}>
            {renderLogoNameBlock()}
          </Link>
        </div>
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

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        <aside
          id="mobile-navigation"
          className={`mobile-menu ${menuOpen ? "open" : ""}`}
        >
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
