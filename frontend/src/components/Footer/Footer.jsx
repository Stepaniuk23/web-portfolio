import React from "react";
import "./Footer.css";
// Импортируем нужные иконки
import { FaInstagram, FaFacebookF, FaPinterestP } from "react-icons/fa6";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-top">
          {/* Левая часть: Брендинг */}
          <div className="footer-brand">
            <span className="footer-logo-name">Denys Stepaniuk</span>
            <span className="footer-logo-sub">
              Wedding & Editorial Photographer
            </span>
          </div>

          {/* Центр: Навигация */}
          <nav className="footer-nav">
            <a href="/">Home</a>
            <a href="/weddings">Weddings</a>
            <a href="/editorials">Editorials</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>

          {/* Правая часть: Соцсети (Иконки) */}
          <div className="footer-social">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Pinterest"
            >
              <FaPinterestP size={18} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <span>© {currentYear} Denys Stepaniuk</span>
            <span className="footer-separator">|</span>
            <span>All rights reserved</span>
          </div>
          <p className="footer-tagline">Timeless imagery for soulful stories</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
