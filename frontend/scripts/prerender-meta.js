/*
 * SEO: после сборки создаёт отдельный HTML-файл для каждой страницы
 * на каждом языке (EN, CS, UK, RU) с правильными:
 *   <html lang>, <title>, description, canonical, hreflang и Open Graph.
 * И генерирует sitemap.xml со всеми языковыми версиями.
 *
 * Зачем: соцсети и мессенджеры (Facebook, WhatsApp, Telegram) НЕ запускают
 * JavaScript, а Google сразу видит правильные теги и связи между языками.
 *
 * Запускается автоматически после сборки: "npm run build".
 * Тексты берутся из src/i18n/locales/*.json и src/i18n/content/*.json,
 * новые истории подхватываются сами из src/data/storiesData.js и editorialsData.js.
 */
const fs = require("fs");
const path = require("path");

const SITE = "https://www.denysstepaniuk.com";
const ROOT = path.join(__dirname, "..");
const BUILD = path.join(ROOT, "build");

// Должно совпадать с src/i18n/languages.js
const DEFAULT_LANG = "en";
const LANGUAGES = ["en", "cs", "uk", "ru"];
const OG_LOCALE = { en: "en_US", cs: "cs_CZ", uk: "uk_UA", ru: "ru_RU" };

const readJson = (rel) =>
  JSON.parse(fs.readFileSync(path.join(ROOT, "src", rel), "utf8"));

const locales = Object.fromEntries(
  LANGUAGES.map((lang) => [lang, readJson(`i18n/locales/${lang}.json`)]),
);
const content = Object.fromEntries(
  LANGUAGES.filter((l) => l !== DEFAULT_LANG).map((lang) => [
    lang,
    readJson(`i18n/content/${lang}.json`),
  ]),
);

// "/about" + "cs" -> "/cs/about";  "/" + "cs" -> "/cs"
function localizePath(route, lang) {
  if (lang === DEFAULT_LANG) return route;
  return route === "/" ? `/${lang}` : `/${lang}${route}`;
}

function fill(template, values) {
  return String(template).replace(/\{(\w+)\}/g, (m, key) =>
    values[key] !== undefined ? values[key] : m,
  );
}

const get = (obj, key) => key.split(".").reduce((node, k) => node?.[k], obj);

// --- Истории: id, title, location из английских данных ---
function readStories(file) {
  const src = fs.readFileSync(path.join(ROOT, "src/data", file), "utf8");
  const re =
    /id:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?location:\s*"([^"]+)"/g;
  const out = [];
  let m;
  while ((m = re.exec(src))) out.push({ id: m[1], title: m[2], location: m[3] });
  return out;
}

function localizedStory(story, lang, collection) {
  const tr = content[lang]?.[collection]?.[story.id];
  return {
    title: tr?.title ?? story.title,
    location: tr?.location ?? story.location,
  };
}

// --- Список страниц: route + функция, которая даёт title/description на языке ---
const pages = [
  { route: "/", seo: (t) => t.seo.home, sitemap: true },
  { route: "/about", seo: (t) => t.seo.about, sitemap: true },
  { route: "/portfolio", seo: (t) => t.seo.portfolio, sitemap: true },
  { route: "/contact", seo: (t) => t.seo.contact, sitemap: true },
  { route: "/weddings", seo: (t) => t.seo.weddings, sitemap: true },
  { route: "/editorials", seo: (t) => t.seo.editorials, sitemap: true },
  {
    route: "/privacy-policy",
    seo: (t) => ({
      title: `${t.legal.privacy.title} | Denys Stepaniuk`,
      description: t.legal.privacy.description,
    }),
  },
  {
    route: "/cookie-policy",
    seo: (t) => ({
      title: `${t.legal.cookies.title} | Denys Stepaniuk`,
      description: t.legal.cookies.description,
    }),
  },
];

for (const [file, collection, base, seoKey] of [
  ["storiesData.js", "stories", "/weddings", "seo.weddingStory"],
  ["editorialsData.js", "editorials", "/editorials", "seo.editorialStory"],
]) {
  for (const story of readStories(file)) {
    pages.push({
      route: `${base}/${story.id}`,
      sitemap: true,
      seo: (t, lang) => {
        const values =
          lang === DEFAULT_LANG ? story : localizedStory(story, lang, collection);
        return {
          title: fill(get(t, `${seoKey}.title`), values),
          description: fill(get(t, `${seoKey}.description`), values),
        };
      },
    });
  }
}

// --- Подстановка тегов в шаблон build/index.html ---
const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function setMeta(html, attr, key, value) {
  const re = new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/?>`);
  const tag = `<meta ${attr}="${key}" content="${esc(value)}"/>`;
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", `${tag}</head>`);
}

function alternateLinks(route) {
  const links = LANGUAGES.map(
    (code) =>
      `<link rel="alternate" hreflang="${code}" href="${SITE}${localizePath(route, code)}"/>`,
  );
  links.push(
    `<link rel="alternate" hreflang="x-default" href="${SITE}${localizePath(route, DEFAULT_LANG)}"/>`,
  );
  return links.join("");
}

function render(template, page, lang) {
  const { title, description } = page.seo(locales[lang], lang);
  const url = SITE + localizePath(page.route, lang);
  let html = template.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  html = setMeta(html, "name", "description", description);
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:locale", OG_LOCALE[lang]);
  html = setMeta(html, "name", "twitter:title", title);
  html = setMeta(html, "name", "twitter:description", description);
  html = html.replace(
    "</head>",
    `<link rel="canonical" href="${url}"/>${alternateLinks(page.route)}</head>`,
  );
  return html;
}

const templatePath = path.join(BUILD, "index.html");
const template = fs.readFileSync(templatePath, "utf8");
let count = 0;

for (const lang of LANGUAGES) {
  for (const page of pages) {
    // Английская главная = build/index.html. Этот файл Vercel также отдаёт
    // для 404 и приватных галерей, поэтому canonical в нём НЕ ставим —
    // его добавит React на самой главной странице.
    if (lang === DEFAULT_LANG && page.route === "/") {
      const { description } = page.seo(locales.en, "en");
      fs.writeFileSync(templatePath, setMeta(template, "name", "description", description));
      count += 1;
      continue;
    }
    // /cs/weddings/abc -> build/cs/weddings/abc.html (Vercel cleanUrls отдаёт его по адресу /cs/weddings/abc)
    const localized = localizePath(page.route, lang);
    const file = path.join(BUILD, `${localized.slice(1)}.html`);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, render(template, page, lang));
    count += 1;
  }
}

// --- sitemap.xml со всеми языками ---
const today = new Date().toISOString().slice(0, 10);
const urls = [];
for (const page of pages.filter((p) => p.sitemap)) {
  for (const lang of LANGUAGES) {
    const alternates = LANGUAGES.map(
      (code) =>
        `    <xhtml:link rel="alternate" hreflang="${code}" href="${SITE}${localizePath(page.route, code)}"/>`,
    ).join("\n");
    urls.push(
      `  <url>\n    <loc>${SITE}${localizePath(page.route, lang)}</loc>\n    <lastmod>${today}</lastmod>\n${alternates}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${page.route}"/>\n  </url>`,
    );
  }
}
fs.writeFileSync(
  path.join(BUILD, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`,
);

console.log(
  `SEO: generated ${count} pages in ${LANGUAGES.length} languages and sitemap.xml with ${urls.length} URLs.`,
);
