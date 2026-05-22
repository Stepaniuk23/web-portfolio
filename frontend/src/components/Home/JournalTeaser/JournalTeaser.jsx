import { useEffect, useRef, useState } from "react";
import "./JournalTeaser.css";

import story1 from "../../../assets/journal/story1.jpg";
import story2 from "../../../assets/journal/story2.jpg";
import story3 from "../../../assets/journal/story3.jpg";

const STORIES = [
  {
    id: 1,
    image: story1,
    category: "Weddings", // Оставляем
    title: "Modern Seoul Spirits in the Heart of the City",
    location: "Kyiv, Ukraine", // Сократили до классического "Czechia"
    slug: "weddings/Modern-Seoul-Spirits",
  },
  {
    id: 2,
    image: story2,
    category: "Editorials", // Переименовали
    title: "A Prague Interlude: The Art of Presence",
    location: "Prague, Czechia", // Твой статус Destination фотографа
    slug: "editorials/A-Prague-Interlude",
  },
  {
    id: 3,
    image: story3,
    category: "Editorials", // Переименовали (для Love Story или Портрета)
    title: "The Unveiled Persona: Fluidity & Fire",
    location: "Ukraine",
    slug: "editorials/The-Unveiled-Persona",
  },
];

function JournalTeaser() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

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
      { threshold: 0.1 },
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
          <p className="journal-kicker">Featured Work</p>
          <h2 className="journal-main-title">Latest Stories</h2>
        </header>

        <div className="journal-grid">
          {STORIES.map((story) => (
            <a
              href={`/${story.slug}`} // Теперь ссылка ведет сразу в нужный раздел
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
            </a>
          ))}
        </div>

        <div className="journal-footer">
          <a href="/Stories" className="btn-ghost">
            View All Stories
          </a>
        </div>
      </div>
    </section>
  );
}

export default JournalTeaser;
