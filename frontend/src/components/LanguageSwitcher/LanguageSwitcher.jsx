import { Link } from "react-router-dom";
import { useLanguage, useT } from "../../i18n/LanguageContext";
import {
  LANGUAGES,
  LANGUAGE_META,
  isTranslatable,
  localizePath,
} from "../../i18n/languages";
import { rememberScrollForLanguageSwitch } from "../../i18n/scrollMemory";
import "./LanguageSwitcher.css";

/**
 * Переключатель языка: EN · CS · UK · RU
 * Открывает ту же страницу на выбранном языке.
 * variant="desktop" — в шапке, variant="mobile" — в мобильном меню.
 */
function LanguageSwitcher({ variant = "desktop", onNavigate }) {
  const { lang, path } = useLanguage();
  const t = useT();
  // У приватных галерей нет переводов — ведём на главную выбранного языка
  const samePage = isTranslatable(path);
  const targetPath = samePage ? path : "/";

  return (
    <nav
      className={`lang-switcher lang-switcher--${variant}`}
      aria-label={t("header.languageAria")}
    >
      {LANGUAGES.map((code, index) => (
        <span key={code} className="lang-switcher-item">
          {index > 0 && (
            <span className="lang-switcher-dot" aria-hidden="true">
              ·
            </span>
          )}
          <Link
            to={localizePath(targetPath, code)}
            className={`lang-switcher-link${code === lang ? " is-active" : ""}`}
            hrefLang={code}
            lang={code}
            aria-current={code === lang ? "true" : undefined}
            title={LANGUAGE_META[code].name}
            // Запоминаем, где был посетитель, чтобы после смены языка
            // страница осталась на том же месте (см. ScrollToTop в App.js)
            state={samePage ? { keepScrollY: true } : undefined}
            onClick={(event) => {
              if (samePage) rememberScrollForLanguageSwitch();
              onNavigate?.(event);
            }}
          >
            {LANGUAGE_META[code].code}
          </Link>
        </span>
      ))}
    </nav>
  );
}

export default LanguageSwitcher;
