import "./Footer.css";
import { SiInstagram, SiFacebook, SiThreads } from "react-icons/si";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="footer-brand-name">Denys Stepaniuk</span>
          <span className="footer-brand-tagline">visual storytelling</span>
        </div>

        <div className="footer-right">
          <a className="footer-phone" href="tel:+420721031650">
            +420721031650
          </a>

          <div className="footer-socials">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <SiInstagram className="footer-icon" />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <SiFacebook className="footer-icon" />
            </a>
            <a href="https://www.threads.net" target="_blank" rel="noreferrer">
              <SiThreads className="footer-icon" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-copy">
        © {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
