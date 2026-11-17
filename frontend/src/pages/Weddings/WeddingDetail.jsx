import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"; // Позволяет брать id из адресной строки
import Seo from "../../i18n/Seo";
import { useLanguage, useT } from "../../i18n/LanguageContext";
import { fill } from "../../i18n/languages";
import { localizeStory } from "../../i18n/localizeStory";
import { storiesData } from "../../data/storiesData";
import { useFitTitle } from "../../hooks/useFitTitle";
import FullStory from "../../components/FullStory/FullStory"; // Наш "Мозг"
import "./WeddingDetail.css";

function WeddingDetail() {
  // 1. Получаем ID из URL (например: /weddings/viktor-natalia-odessa)
  const { id } = useParams();

  // 2. Ищем данные именно для этой свадьбы в нашем файле данных
  const { lang } = useLanguage();
  const t = useT();
  const story = localizeStory(
    storiesData.find((item) => item.id === id),
    lang,
    "stories",
  );
  const isCinematic = story?.templateType === "cinematic";
  const isModernMinimal = story?.templateType === "modern-minimal";
  const introColumns = story?.content?.introColumns ?? [];

  // Создаем Ref для галереи
  const fullStoryRef = useRef(null);

  const heroRef = useRef(null);
  // Подгоняет размер имён в HERO, чтобы длинные имена не обрезались
  const titleRef = useFitTitle(story?.title);
  const introRef = useRef(null);
  const gridRef = useRef(null);
  const momentRef = useRef(null);
  const aftermathRef = useRef(null);
  const finaleRef = useRef(null);

  const [visibleSections, setVisibleSections] = useState({
    hero: false,
    intro: false,
    grid: false,
    moment: false,
    aftermath: false,
    finale: false,
    fullStory: false,
  });

  useEffect(() => {
    const targets = [
      { ref: heroRef, key: "hero" },
      { ref: introRef, key: "intro" },
      { ref: gridRef, key: "grid" },
      { ref: momentRef, key: "moment" },
      { ref: aftermathRef, key: "aftermath" },
      { ref: finaleRef, key: "finale" },
      { ref: fullStoryRef, key: "fullStory" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const target = targets.find(
            ({ ref }) => ref.current === entry.target,
          );
          if (!target) return;

          setVisibleSections((prev) => ({ ...prev, [target.key]: true }));
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.05 },
    );

    targets.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [id]);

  // 3. Если вдруг такой свадьбы нет (ошибка в ссылке), показываем заглушку
  if (!story) {
    return (
      <div className="story-not-found">
        <Seo title={t("story.notFound")} noindex />
        {t("story.notFound")}
      </div>
    );
  }

  const titleLines = story.title.split(" ").filter(Boolean);

  return (
    <div className={`story-article template-${story.templateType}`}>
      <Seo
        title={fill(t("seo.weddingStory.title"), story)}
        description={fill(t("seo.weddingStory.description"), story)}
        path={`/weddings/${story.id}`}
      />
      {/* --- БЛОК 1: HERO --- */}
      {isCinematic ? (
        <section
          ref={heroRef}
          className={`hero-cinematic story-section-reveal ${visibleSections.hero ? "is-visible" : ""}`}
        >
          <div className="hero-cinematic-media" aria-hidden="true">
            <img
              src={story.images.hero}
              alt={fill(t("story.wedding.heroAlt"), story)}
            />
          </div>
          <div className="hero-cinematic-content">
            <span className="hero-cinematic-label">
              {t("story.wedding.labelCinematic")}
            </span>
            <h1 ref={titleRef} className="hero-cinematic-title">
              {titleLines.map((line, index) => (
                <span
                  key={`${line}-${index}`}
                  className="hero-cinematic-title-line"
                  style={{ "--line-delay": `${0.26 + index * 0.1}s` }}
                >
                  {line}
                </span>
              ))}
            </h1>
            <div className="hero-cinematic-divider" aria-hidden="true" />
            <p className="hero-cinematic-location">{story.location}</p>
          </div>
        </section>
      ) : isModernMinimal ? (
        <section
          ref={heroRef}
          className={`hero-split story-section-reveal ${visibleSections.hero ? "is-visible" : ""}`}
        >
          <div className="hero-split-text">
            <span className="hero-split-label">
              {t("story.wedding.labelMinimal")}
            </span>
            <h1 ref={titleRef} className="hero-split-title">
              {titleLines.map((line, index) => (
                <span
                  key={`${line}-${index}`}
                  className="hero-split-title-line"
                  style={{ "--line-delay": `${0.32 + index * 0.12}s` }}
                >
                  {line}
                </span>
              ))}
            </h1>
            <div className="hero-split-divider" aria-hidden="true" />
            <p className="hero-split-subtitle">{story.location}</p>
          </div>

          <div className="hero-split-media" aria-hidden="true">
            <img
              src={story.images.hero}
              alt={fill(t("story.wedding.heroAlt"), story)}
            />
          </div>
        </section>
      ) : (
        <section
          ref={heroRef}
          className={`hero-magazine ${visibleSections.hero ? "is-visible" : ""}`}
        >
          <div className="hero-magazine-container">
            <div className="hero-magazine-text">
              <span className="hero-magazine-label">
                {t("story.wedding.labelClassic")}
              </span>
              <h1 ref={titleRef} className="hero-magazine-title">
                {titleLines.map((line, index) => (
                  <span
                    key={`${line}-${index}`}
                    className="hero-magazine-title-line"
                    style={{ "--line-delay": `${0.32 + index * 0.12}s` }}
                  >
                    {line}
                  </span>
                ))}
              </h1>
              <div className="hero-magazine-divider" aria-hidden="true" />
              <p className="hero-magazine-location">{story.location}</p>
            </div>
            <div className="hero-magazine-image">
              <img
                src={story.images.hero}
                alt={fill(t("story.wedding.heroAlt"), story)}
              />
            </div>
          </div>
        </section>
      )}

      {/* --- БЛОК 2: INTRO --- */}
      <section
        ref={introRef}
        className={`story-intro story-section-reveal ${visibleSections.intro ? "is-visible" : ""}`}
      >
        <div className="about-container-narrow">
          <div className="editorial-text">
            <p className="drop-cap">{story.content.intro}</p>
          </div>
        </div>
      </section>

      {/* --- БЛОК 3: DYNAMIC GRID --- */}
      <section
        ref={gridRef}
        className={`story-grid story-section-reveal ${visibleSections.grid ? "is-visible" : ""}`}
      >
        <div className="story-grid-container">
          <div className="grid-item item-wide">
            <img src={story.images.gridWide} alt={fill(t("story.wedding.sceneAlt"), story)} loading="lazy" />
          </div>
          <div className="grid-item item-portrait">
            <img src={story.images.gridPortrait} alt={fill(t("story.wedding.portraitAlt"), story)} loading="lazy" />
          </div>
          {introColumns.length ? (
            <div className="grid-item item-copy" aria-label={t("story.editorialNotes")}>
              <div className="grid-copy-columns">
                {introColumns.map((paragraph, index) => (
                  <p key={`grid-copy-${index}`}>{paragraph}</p>
                ))}
              </div>
            </div>
          ) : null}
          <div className="grid-item item-accent">
            <img src={story.images.gridSquare} alt={fill(t("story.wedding.detailAlt"), story)} loading="lazy" />
          </div>
        </div>
      </section>

      {/* --- БЛОК 4: THE HIGHLIGHT MOMENT --- */}
      <section
        ref={momentRef}
        className={`story-moment story-section-reveal ${visibleSections.moment ? "is-visible" : ""}`}
      >
        <div className="moment-image-wrap">
          <img src={story.images.momentWide} alt={story.content.momentTitle} loading="lazy" />
        </div>
        <div className="about-container-narrow">
          <div className="moment-story-box">
            <h3>{story.content.momentTitle}</h3>
            <p>{story.content.momentText}</p>
          </div>
        </div>
      </section>

      {/* --- БЛОК 4.5: AFTERMATH (Теперь он идет СЛЕДОМ, а не ВНУТРИ) --- */}
      <section
        ref={aftermathRef}
        className={`story-aftermath story-section-reveal ${visibleSections.aftermath ? "is-visible" : ""}`}
      >
        <div className="about-container-narrow">
          <div className="aftermath-text-box">
            <p>{story.content.aftermath}</p>
          </div>
        </div>
      </section>

      {/* --- БЛОК 5: FINALE --- */}
      <section
        ref={finaleRef}
        className={`story-finale story-section-reveal ${visibleSections.finale ? "is-visible" : ""}`}
      >
        <div className="finale-image-full">
          <img src={story.images.finale} alt={fill(t("story.wedding.finaleAlt"), story)} loading="lazy" />
        </div>
      </section>

      {/* --- БЛОК 6: FULL STORY --- */}
      <FullStory
        ref={fullStoryRef}
        images={story.images.fullGallery}
        isVisible={visibleSections.fullStory}
        label={t("story.fullStoryLabel")}
        title={t("story.fullStoryTitle")}
      />
    </div>
  );
}

export default WeddingDetail;
