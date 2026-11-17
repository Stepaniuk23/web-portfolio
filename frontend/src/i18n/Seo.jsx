import { Helmet } from "react-helmet-async";
import { useLanguage } from "./LanguageContext";
import {
  DEFAULT_LANG,
  LANGUAGES,
  LANGUAGE_META,
  SITE_URL,
  localizePath,
} from "./languages";

/**
 * SEO-теги страницы на текущем языке:
 * title, description, canonical, hreflang (ссылки на другие языки) и Open Graph.
 *
 * path — адрес страницы БЕЗ языкового префикса, например "/about".
 * Если path не передан, canonical и hreflang не выводятся (например, для 404).
 */
function Seo({ title, description, path, noindex = false, children }) {
  const { lang } = useLanguage();
  const url = path ? SITE_URL + localizePath(path, lang) : null;

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {noindex && <meta name="robots" content="noindex, follow" />}

      {url && !noindex && <link rel="canonical" href={url} />}
      {url &&
        !noindex &&
        LANGUAGES.map((code) => (
          <link
            key={code}
            rel="alternate"
            hrefLang={code}
            href={SITE_URL + localizePath(path, code)}
          />
        ))}
      {url && !noindex && (
        <link
          rel="alternate"
          hrefLang="x-default"
          href={SITE_URL + localizePath(path, DEFAULT_LANG)}
        />
      )}

      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:locale" content={LANGUAGE_META[lang].ogLocale} />

      {children}
    </Helmet>
  );
}

export default Seo;
