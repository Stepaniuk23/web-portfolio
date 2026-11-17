import React, { useEffect, useRef, useState } from "react";
import Seo from "../../i18n/Seo";
import LangLink from "../../i18n/LangLink";
import { useLanguage, useT } from "../../i18n/LanguageContext";
import { fill } from "../../i18n/languages";
import { localizeStory } from "../../i18n/localizeStory";
import "./Weddings.css";
// 1. ИМПОРТИРУЕМ НАШ ЕДИНЫЙ ИСТОЧНИК ПРАВДЫ:
import { storiesData } from "../../data/storiesData";

function Weddings() {
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);
  const { lang } = useLanguage();
  const t = useT();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (entry.target === headerRef.current) {
            setHeaderVisible(true);
            observer.unobserve(entry.target);
          }

          if (entry.target === gridRef.current) {
            setGridVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 },
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (gridRef.current) observer.observe(gridRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="weddings-page">
      <Seo
        title={t("seo.weddings.title")}
        description={t("seo.weddings.description")}
        path="/weddings"
      />
      <header
        ref={headerRef}
        className={`weddings-header ${headerVisible ? "is-visible" : ""}`}
      >
        <div className="weddings-container">
          <h1>{t("weddings.title")}</h1>
          <p className="subtitle">{t("weddings.subtitle")}</p>
        </div>
      </header>

      <section
        ref={gridRef}
        className={`stories-grid ${gridVisible ? "is-visible" : ""}`}
      >
        {/* 2. ТЕПЕРЬ ОБХОДИМ ЦИКЛОМ storiesData ВМЕСТО СТАРОГО МАССИВА */}
        {storiesData.map((baseStory, index) => {
          const story = localizeStory(baseStory, lang, "stories");
          return (
          <div
            key={story.id}
            className="story-card"
            style={{ "--story-delay": `${index * 140}ms` }}
          >
            <LangLink to={`/weddings/${story.id}`}>
              <div className="story-image-wrap">
                {/* 3. КАРТИНКУ БЕРЕМ ИЗ СВОЙСТВА images.cover */}
                <img
                  src={story.images.cover}
                  alt={fill(t("weddings.coverAlt"), story)}
                  loading="lazy"
                />
                <div className="story-overlay">
                  <span>{t("weddings.viewStory")}</span>
                </div>
              </div>
              <div className="story-info">
                <span className="story-location">{story.location}</span>
                <h3 className="story-title">{story.title}</h3>
              </div>
            </LangLink>
          </div>
          );
        })}
      </section>
    </div>
  );
}

export default Weddings;
