import React from "react";
import "./Footer.css";
import { FaInstagram, FaFacebookF, FaPinterestP } from "react-icons/fa6";
import LangLink from "../../i18n/LangLink";
import { useT } from "../../i18n/LanguageContext";

function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useT();

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
            <LangLink to="/">{t("nav.home")}</LangLink>
            <LangLink to="/weddings">{t("nav.weddings")}</LangLink>
            <LangLink to="/editorials">{t("nav.editorials")}</LangLink>
            <LangLink to="/about">{t("nav.about")}</LangLink>
            <LangLink to="/contact">{t("nav.contact")}</LangLink>
          </nav>

          {/* Правая часть: Соцсети (Иконки) */}
          <div className="footer-social">
            <a
              href="https://instagram.com/denysstepanyuk"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://www.facebook.com/share/1DWX2SJA6d/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="https://pin.it/3CWS3OsV1"
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
            <span>{t("footer.rights")}</span>
          </div>
          <p className="footer-tagline">{t("footer.motto")}</p>
          <nav className="footer-legal-links" aria-label={t("footer.legalAria")}>
            <LangLink to="/privacy-policy">{t("footer.privacy")}</LangLink>
            <LangLink to="/cookie-policy">{t("footer.cookies")}</LangLink>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
