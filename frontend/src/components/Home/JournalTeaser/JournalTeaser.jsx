import { useEffect, useRef, useState } from "react";
import "./JournalTeaser.css";

import story1 from "../../../assets/journal/story1.jpg";
import story2 from "../../../assets/journal/story2.jpg";
import story3 from "../../../assets/journal/story3.jpg";
import LangLink from "../../../i18n/LangLink";
import { useT } from "../../../i18n/LanguageContext";

const STORIES = [
  {
    id: 1,
    image: story1,
    category: "Weddings", // Оставляем
    title: "Modern Seoul Spirits in the Heart of the City",
    location: "Kyiv, Ukraine", // Сократили до классического "Czechia"
    slug: "weddings/maksim-simona-kyiv",
  },
  {
    id: 2,
    image: story2,
    category: "Editorials", // Переименовали
    title: "A Prague Interlude: The Art of Presence",
    location: "Prague, Czechia", // Твой статус Destination фотографа
    slug: "editorials/meiirbek-nariman-daria-prague",
  },
  {
    id: 3,
    image: story3,
    category: "Editorials", // Переименовали (для Love Story или Портрета)
    title: "The Unveiled Persona: Fluidity & Fire",
    location: "Dnipro, Ukraine",
    slug: "editorials/anna-vladi-dnipro-sunset",
  },
];

function JournalTeaser() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const t = useT();
  // Тексты карточек берутся из словаря по порядку (картинки и ссылки — из STORIES)
  const items = t("home.journal.items");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`journal-teaser ${visible ? "is-visible" : ""}`}
    >
      <div className="journal-container">
        <header className="journal-header">
          {/* Уходим от слова Journal, если страницы не будет */}
          <p className="journal-kicker">{t("home.journal.kicker")}</p>
          <h2 className="journal-main-title">{t("home.journal.title")}</h2>
        </header>

        <div className="journal-grid">
          {STORIES.map((baseStory, index) => {
            const story = { ...baseStory, ...items[index] };
            return (
            <LangLink
              to={`/${story.slug}`} // Ссылка ведет сразу в нужный раздел на текущем языке
              key={story.id}
              className="journal-card"
            >
              <div className="journal-card-image">
                <img src={story.image} alt={story.title} decoding="async" />
              </div>
              <div className="journal-card-content">
                <span className="journal-card-category">{story.category}</span>
                <h3 className="journal-card-title">{story.title}</h3>
                <p className="journal-card-location">{story.location}</p>
              </div>
            </LangLink>
            );
          })}
        </div>

        <div className="journal-footer">
          <LangLink to="/editorials" className="btn-ghost">
            {t("home.journal.cta")}
          </LangLink>
        </div>
      </div>
    </section>
  );
}

export default JournalTeaser;
