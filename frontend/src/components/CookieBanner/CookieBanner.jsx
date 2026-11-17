import { useEffect, useRef, useState } from "react";
import LangLink from "../../i18n/LangLink";
import { useT } from "../../i18n/LanguageContext";
import {
  OPEN_SETTINGS_EVENT,
  getConsent,
  setConsent,
} from "../../consent";
import "./CookieBanner.css";

function CookieBanner() {
  const [visible, setVisible] = useState(() => getConsent() === null);
  const headingRef = useRef(null);
  const t = useT();

  useEffect(() => {
    const reopen = () => setVisible(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, []);

  // Move focus only on re-open; on first load avoid stealing focus from the page
  const reopened = useRef(false);
  useEffect(() => {
    if (visible && reopened.current) headingRef.current?.focus();
    reopened.current = true;
  }, [visible]);

  if (!visible) return null;

  const choose = (value) => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <section
      className="cookie-banner"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-text"
    >
      <div className="cookie-banner-copy">
        <h2
          id="cookie-banner-title"
          className="cookie-banner-title"
          ref={headingRef}
          tabIndex={-1}
        >
          {t("cookie.title")}
        </h2>
        <p id="cookie-banner-text" className="cookie-banner-text">
          {t("cookie.text")}{" "}
          <LangLink to="/privacy-policy">{t("footer.privacy")}</LangLink>{" "}
          {t("cookie.and")}{" "}
          <LangLink to="/cookie-policy">{t("footer.cookies")}</LangLink>.
        </p>
      </div>
      <div className="cookie-banner-actions">
        <button
          type="button"
          className="btn-ghost cookie-banner-btn"
          onClick={() => choose("denied")}
        >
          {t("cookie.decline")}
        </button>
        <button
          type="button"
          className="btn-ghost cookie-banner-btn cookie-banner-btn-primary"
          onClick={() => choose("granted")}
        >
          {t("cookie.accept")}
        </button>
      </div>
    </section>
  );
}

export default CookieBanner;
