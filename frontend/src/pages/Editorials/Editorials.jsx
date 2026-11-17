import React, { useEffect, useRef, useState } from "react";
import Seo from "../../i18n/Seo";
import LangLink from "../../i18n/LangLink";
import { useLanguage, useT } from "../../i18n/LanguageContext";
import { fill } from "../../i18n/languages";
import { localizeStory } from "../../i18n/localizeStory";
import "../Weddings/Weddings.css";
import { editorialsData } from "../../data/editorialsData";

function Editorials() {
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
        title={t("seo.editorials.title")}
        description={t("seo.editorials.description")}
        path="/editorials"
      />
      <header
        ref={headerRef}
        className={`weddings-header ${headerVisible ? "is-visible" : ""}`}
      >
        <div className="weddings-container">
          <h1>{t("editorials.title")}</h1>
          <p className="subtitle">{t("editorials.subtitle")}</p>
        </div>
      </header>

      <section
        ref={gridRef}
        className={`stories-grid ${gridVisible ? "is-visible" : ""}`}
      >
        {editorialsData.map((baseStory, index) => {
          const story = localizeStory(baseStory, lang, "editorials");
          return (
          <div
            key={story.id}
            className="story-card"
            style={{ "--story-delay": `${index * 140}ms` }}
          >
            <LangLink to={`/editorials/${story.id}`}>
              <div className="story-image-wrap">
                <img
                  src={story.images.cover}
                  alt={fill(t("editorials.coverAlt"), story)}
                />
                <div className="story-overlay">
                  <span>{t("editorials.viewStory")}</span>
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

export default Editorials;
