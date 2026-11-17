/**
 * Место на странице при смене языка.
 *
 * Тексты на разных языках разной длины, поэтому просто запомнить
 * число пикселей мало: на другом языке это будет уже другое место.
 * Запоминаем блок (заголовок, абзац, фото), который был вверху экрана,
 * и после смены языка возвращаемся к тому же блоку.
 * Страница на всех языках устроена одинаково, поэтому блок находится
 * по его порядковому номеру.
 */
const ANCHOR_SELECTOR = "h1, h2, h3, h4, p, li, img, video, blockquote, button";

let saved = null;

function anchorCandidates() {
  return [...document.querySelectorAll(ANCHOR_SELECTOR)].filter(
    (el) => !el.closest("header, .mobile-menu, .cookie-banner")
  );
}

export function rememberScrollForLanguageSwitch() {
  const elements = anchorCandidates();
  // Первый блок, который целиком начинается на экране;
  // если такого нет (например, на экране одно большое фото) — первый видимый
  const visible = (el) => el.getBoundingClientRect().height > 0;
  let index = elements.findIndex(
    (el) => visible(el) && el.getBoundingClientRect().top >= 0
  );
  if (index < 0) {
    index = elements.findIndex(
      (el) => visible(el) && el.getBoundingClientRect().bottom > 0
    );
  }

  saved = {
    y: window.scrollY,
    index,
    offset: index >= 0 ? elements[index].getBoundingClientRect().top : 0,
  };
}

/** Отдаёт сохранённое место один раз и сразу его забывает */
export function takeSavedScroll() {
  const value = saved;
  saved = null;
  return value;
}

/** Куда прокрутить новую версию страницы, чтобы показать тот же блок */
export function targetScrollY(savedPlace) {
  // Был в самом верху — остаёмся в самом верху
  if (savedPlace.y === 0) return 0;

  const el = savedPlace.index >= 0 ? anchorCandidates()[savedPlace.index] : null;
  if (!el) return savedPlace.y;

  return Math.max(
    0,
    Math.round(el.getBoundingClientRect().top + window.scrollY - savedPlace.offset)
  );
}
