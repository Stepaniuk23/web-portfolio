// ============================================================
// Языки сайта.
// Английский — основной, без префикса в адресе: /about
// Остальные языки — с префиксом: /cs/about, /uk/about, /ru/about
// ============================================================

export const SITE_URL = "https://www.denysstepaniuk.com";

export const DEFAULT_LANG = "en";

// Порядок здесь = порядок в переключателе EN · CS · UK · RU
export const LANGUAGES = ["en", "cs", "uk", "ru"];

export const LANGUAGE_META = {
  en: { code: "EN", name: "English", ogLocale: "en_US" },
  cs: { code: "CS", name: "Čeština", ogLocale: "cs_CZ" },
  uk: { code: "UK", name: "Українська", ogLocale: "uk_UA" },
  ru: { code: "RU", name: "Русский", ogLocale: "ru_RU" },
};

// Страницы, у которых нет языковых версий (приватные галереи клиентов)
const UNTRANSLATED_PREFIXES = ["/gallery/"];

/** "/cs/weddings/abc" -> { lang: "cs", path: "/weddings/abc" } */
export function splitLangFromPath(pathname) {
  const match = pathname.match(/^\/([a-z]{2})(?=\/|$)(.*)$/);
  if (match && LANGUAGES.includes(match[1]) && match[1] !== DEFAULT_LANG) {
    return { lang: match[1], path: match[2] || "/" };
  }
  return { lang: DEFAULT_LANG, path: pathname || "/" };
}

/** ("/about", "cs") -> "/cs/about";  ("/", "cs") -> "/cs";  ("/about", "en") -> "/about" */
export function localizePath(path, lang) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === DEFAULT_LANG) return clean;
  return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
}

/** Подставляет значения в шаблон: fill("{title} in {location}", {title, location}) */
export function fill(template, values) {
  return String(template).replace(/\{(\w+)\}/g, (match, key) =>
    values[key] !== undefined ? values[key] : match,
  );
}

/** Есть ли у страницы версии на других языках */
export function isTranslatable(path) {
  return !UNTRANSLATED_PREFIXES.some((prefix) => path.startsWith(prefix));
}
