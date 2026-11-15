/*
 * SEO: генерирует отдельный HTML-файл для каждой страницы сайта
 * с правильными <title>, description, canonical и Open Graph.
 *
 * Зачем: соцсети и мессенджеры (Facebook, WhatsApp, Telegram) НЕ запускают
 * JavaScript, поэтому без этого скрипта любая ссылка показывала бы
 * заголовок главной страницы. Google тоже сразу видит правильные теги.
 *
 * Запускается автоматически после сборки: "npm run build".
 * Новые истории подхватываются сами из src/data/storiesData.js и editorialsData.js.
 */
const fs = require("fs");
const path = require("path");

const SITE = "https://www.denysstepaniuk.com";
const ROOT = path.join(__dirname, "..");
const BUILD = path.join(ROOT, "build");

// --- Статические страницы (тексты совпадают с <Helmet> в компонентах) ---
const pages = [
  {
    route: "/about",
    title: "About Denys Stepaniuk | Wedding Photographer in Prague",
    description:
      "Meet Denys Stepaniuk, a wedding and editorial photographer based in Prague who has documented over 248 wedding stories across Europe.",
  },
  {
    route: "/portfolio",
    title: "Photography Portfolio | Denys Stepaniuk",
    description:
      "A selection of wedding and portrait photography by Denys Stepaniuk, based in Prague.",
  },
  {
    route: "/contact",
    title: "Contact | Denys Stepaniuk Photography",
    description:
      "Get in touch with Denys Stepaniuk to book wedding or editorial photography in Prague and across Europe.",
  },
  {
    route: "/weddings",
    title: "Wedding Stories | Denys Stepaniuk Photography",
    description:
      "Selected wedding stories documenting real couples in Prague, Ukraine and across Europe by Denys Stepaniuk.",
  },
  {
    route: "/editorials",
    title: "Editorial Stories | Denys Stepaniuk Photography",
    description:
      "Selected editorial and portrait stories across Prague, Ukraine and Europe by Denys Stepaniuk.",
  },
];

// --- Истории: берём id, title, location из файлов данных ---
function readStories(file) {
  const src = fs.readFileSync(path.join(ROOT, "src/data", file), "utf8");
  const re =
    /id:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?location:\s*"([^"]+)"/g;
  const out = [];
  let m;
  while ((m = re.exec(src))) out.push({ id: m[1], title: m[2], location: m[3] });
  return out;
}

for (const s of readStories("storiesData.js")) {
  pages.push({
    route: `/weddings/${s.id}`,
    title: `${s.title} | Wedding Story | Denys Stepaniuk`,
    description: `${s.title} wedding photography in ${s.location} by Denys Stepaniuk.`,
  });
}
for (const s of readStories("editorialsData.js")) {
  pages.push({
    route: `/editorials/${s.id}`,
    title: `${s.title} | Editorial Story | Denys Stepaniuk`,
    description: `${s.title} editorial photography in ${s.location} by Denys Stepaniuk.`,
  });
}

// --- Подстановка тегов в шаблон build/index.html ---
const esc = (t) =>
  t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function setMeta(html, attr, key, value) {
  const re = new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/?>`);
  const tag = `<meta ${attr}="${key}" content="${esc(value)}"/>`;
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", `${tag}</head>`);
}

function render(template, page) {
  const url = SITE + page.route;
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${esc(page.title)}</title>`);
  html = setMeta(html, "name", "description", page.description);
  html = setMeta(html, "property", "og:title", page.title);
  html = setMeta(html, "property", "og:description", page.description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "name", "twitter:title", page.title);
  html = setMeta(html, "name", "twitter:description", page.description);
  html = html.replace("</head>", `<link rel="canonical" href="${url}"/></head>`);
  return html;
}

const templatePath = path.join(BUILD, "index.html");
const template = fs.readFileSync(templatePath, "utf8");

// Главная: описание добавляем прямо в index.html, но БЕЗ canonical,
// потому что index.html также отдаётся для 404 и приватных галерей.
fs.writeFileSync(
  templatePath,
  setMeta(
    template,
    "name",
    "description",
    "Denys Stepaniuk is a wedding and editorial photographer based in Prague, Czechia, shooting fine art weddings across Europe.",
  ),
);

for (const page of pages) {
  // /weddings/abc -> build/weddings/abc.html (Vercel cleanUrls отдаёт его по адресу /weddings/abc)
  const file = path.join(BUILD, `${page.route.slice(1)}.html`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, render(template, page));
}

console.log(`SEO: generated ${pages.length} pages with their own meta tags.`);
