// ============================================================
// Переводы историй (свадьбы и editorial).
// Источник структуры и фото — src/data/storiesData.js и editorialsData.js.
// Здесь хранятся только переведённые тексты, привязанные к id истории.
// Если для какой-то истории перевода нет — показывается английский текст.
// ============================================================

import cs from "./content/cs.json";
import uk from "./content/uk.json";
import ru from "./content/ru.json";

const CONTENT = { cs, uk, ru };

/**
 * @param {object} story  — объект из storiesData / editorialsData
 * @param {string} lang   — "en" | "cs" | "uk" | "ru"
 * @param {"stories"|"editorials"} collection
 */
export function localizeStory(story, lang, collection) {
  if (!story) return story;
  const translation = CONTENT[lang]?.[collection]?.[story.id];
  if (!translation) return story;

  return {
    ...story,
    title: translation.title ?? story.title,
    location: translation.location ?? story.location,
    content: { ...story.content, ...translation.content },
  };
}
