import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"; // Позволяет брать id из адресной строки
import { storiesData } from "../../data/storiesData";
import FullStory from "../../components/FullStory/FullStory"; // Наш "Мозг"
import "./WeddingDetail.css";

function WeddingDetail() {
  // 1. Получаем ID из URL (например: /weddings/viktor-natalia-odessa)
  const { id } = useParams();

  // 2. Ищем данные именно для этой свадьбы в нашем файле данных
  const story = storiesData.find((item) => item.id === id);
  const isCinematic = story?.templateType === "cinematic";
  const isModernMinimal = story?.templateType === "modern-minimal";
  const introColumns = story?.content?.introColumns ?? [];

  // Создаем Ref для галереи
  const fullStoryRef = useRef(null);

  const heroRef = useRef(null);
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
      { threshold: 0.15 },
    );

    targets.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [id]);

  // 3. Если вдруг такой свадьбы нет (ошибка в ссылке), показываем заглушку
  if (!story) {
    return <div className="story-not-found">Story not found</div>;
  }

  const titleLines = story.title.split(" ").filter(Boolean);

  return (
    <div className={`story-article template-${story.templateType}`}>
      {/* --- БЛОК 1: HERO --- */}
      {isCinematic ? (
        <section
          ref={heroRef}
          className={`hero-cinematic story-section-reveal ${visibleSections.hero ? "is-visible" : ""}`}
        >
          <div className="hero-cinematic-media" aria-hidden="true">
            <img
              src={story.images.hero}
              alt={`${story.title} wedding photography in ${story.location}`}
            />
          </div>
          <div className="hero-cinematic-content">
            <span className="hero-cinematic-label">
              Cinematic Wedding Story
            </span>
            <h1 className="hero-cinematic-title">
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
            <span className="hero-split-label">Intimate Wedding Story</span>
            <h1 className="hero-split-title">
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
              alt={`${story.title} wedding photography in ${story.location}`}
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
                Editorial Wedding Story
              </span>
              <h1 className="hero-magazine-title">
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
                alt={`${story.title} wedding photography in ${story.location}`}
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
            <img src={story.images.gridWide} alt="The Scene" />
          </div>
          <div className="grid-item item-portrait">
            <img src={story.images.gridPortrait} alt="The Portrait" />
          </div>
          {introColumns.length ? (
            <div className="grid-item item-copy" aria-label="Editorial notes">
              <div className="grid-copy-columns">
                {introColumns.map((paragraph, index) => (
                  <p key={`grid-copy-${index}`}>{paragraph}</p>
                ))}
              </div>
            </div>
          ) : null}
          <div className="grid-item item-accent">
            <img src={story.images.gridSquare} alt="The Detail" />
          </div>
        </div>
      </section>

      {/* --- БЛОК 4: THE HIGHLIGHT MOMENT --- */}
      <section
        ref={momentRef}
        className={`story-moment story-section-reveal ${visibleSections.moment ? "is-visible" : ""}`}
      >
        <div className="moment-image-wrap">
          <img src={story.images.momentWide} alt={story.content.momentTitle} />
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
          <img src={story.images.finale} alt="Wedding Finale" />
        </div>
      </section>

      {/* --- БЛОК 6: FULL STORY --- */}
      <FullStory
        ref={fullStoryRef}
        images={story.images.fullGallery}
        isVisible={visibleSections.fullStory}
        label="Atmosphere"
        title="The Full Story"
      />
    </div>
  );
}

export default WeddingDetail;
