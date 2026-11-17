import { createContext, useContext, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { DEFAULT_LANG, localizePath, splitLangFromPath } from "./languages";

import en from "./locales/en.json";
import cs from "./locales/cs.json";
import uk from "./locales/uk.json";
import ru from "./locales/ru.json";

const DICTIONARIES = { en, cs, uk, ru };

const LanguageContext = createContext({ lang: DEFAULT_LANG, path: "/" });

/** Достаёт значение по ключу вида "nav.home" из словаря */
function lookup(dict, key) {
  return key.split(".").reduce((node, part) => node?.[part], dict);
}

/**
 * Язык определяется по адресу страницы (/cs/..., /uk/..., /ru/...).
 * Поэтому у каждой языковой версии свой адрес — это важно для Google.
 */
export function LanguageProvider({ children }) {
  const { pathname } = useLocation();
  const value = useMemo(() => splitLangFromPath(pathname), [pathname]);

  // Атрибут lang у <html> — подсказка для Google и экранных дикторов
  useEffect(() => {
    document.documentElement.lang = value.lang;
  }, [value.lang]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

/** Текущий язык и путь страницы без языкового префикса */
export function useLanguage() {
  return useContext(LanguageContext);
}

/**
 * Функция перевода: t("nav.home").
 * Если перевода нет — берётся английский текст, чтобы на сайте не было пустых мест.
 */
export function useT() {
  const { lang } = useLanguage();
  return useMemo(() => {
    const dict = DICTIONARIES[lang] || en;
    return (key) => {
      const value = lookup(dict, key);
      return value === undefined ? lookup(en, key) ?? key : value;
    };
  }, [lang]);
}

/** Превращает "/about" в адрес на текущем языке: "/cs/about" */
export function useLocalizePath() {
  const { lang } = useLanguage();
  return (path) => localizePath(path, lang);
}
