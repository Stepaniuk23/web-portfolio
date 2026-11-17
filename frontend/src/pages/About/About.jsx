import React, { useEffect, useRef, useState } from "react";
import Seo from "../../i18n/Seo";
import { useT } from "../../i18n/LanguageContext";
import { useFitTitle } from "../../hooks/useFitTitle";
import "./About.css";

// Фото
import hallstattHero from "../../assets/about/hallstatt-hero.jpg";
import portraitMain from "../../assets/about/denys-cousteau.jpg";
import mountainSmall from "../../assets/about/mountain-detail.jpg";

import review1 from "../../assets/reviews/review1.jpg";
import review2 from "../../assets/reviews/review2.jpg";
import review3 from "../../assets/reviews/review3.jpg";
import review4 from "../../assets/reviews/review4.jpg";
import review5 from "../../assets/reviews/review5.jpg";
import review6 from "../../assets/reviews/review6.jpg";
import review7 from "../../assets/reviews/review7.jpg";

function About() {
  const introRef = useRef(null);
  const statementRef = useRef(null);
  const explorationRef = useRef(null);
  const kindWordsRef = useRef(null);
  const t = useT();
  // «Storyteller» на узком телефоне не должен вылезать за край блока
  const introTitleRef = useFitTitle(t("about.introTitle"));
  // «За пределами свадебной фотографии»: длинные слова не должны вылезать за колонку
  const beyondTitleRef = useFitTitle(t("about.beyondTitle"));
  const reviews = t("about.reviews");

  const [heroVisible, setHeroVisible] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);
  const [statementVisible, setStatementVisible] = useState(false);
  const [explorationVisible, setExplorationVisible] = useState(false);
  const [kindWordsVisible, setKindWordsVisible] = useState(false);

  useEffect(() => {
    setHeroVisible(true);
  }, []);

  useEffect(() => {
    const targets = [
      introRef.current,
      statementRef.current,
      explorationRef.current,
      kindWordsRef.current,
    ].filter(Boolean);

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (entry.target === introRef.current) setIntroVisible(true);
          if (entry.target === statementRef.current) setStatementVisible(true);
          if (entry.target === explorationRef.current)
            setExplorationVisible(true);
          if (entry.target === kindWordsRef.current) setKindWordsVisible(true);

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.05 },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page">
      <Seo
        title={t("seo.about.title")}
        description={t("seo.about.description")}
        path="/about"
      />

      {/* 1. Hero: Атмосфера и спокойствие */}
      <section className="about-hero-full">
        <div className="hero-bg-wrap">
          <img
            src={hallstattHero}
            alt={t("about.heroAlt")}
            className={`about-hero-photo${heroVisible ? " is-visible" : ""}`}
          />
        </div>
        <div className={`hero-text-overlay${heroVisible ? " is-visible" : ""}`}>
          <div className="hero-intro-text">
            <h1>
              <span className="intro-first-part">{t("about.h1First")}</span>
              <span className="intro-second-part">{t("about.h1Second")}</span>
            </h1>
          </div>
        </div>
      </section>
      {/* 2. Intro: Личность и Первый Текст */}
      <section
        ref={introRef}
        className={`about-intro-split ${introVisible ? "is-visible" : ""}`}
      >
        <div className="about-container">
          <div className="split-grid">
            <div className="split-image">
              <img src={portraitMain} alt={t("about.portraitAlt")} />
            </div>
            <div className="split-content">
              <h2 ref={introTitleRef}>{t("about.introTitle")}</h2>
              {t("about.intro").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* 3. Statement: Центральная цитата */}
      <section
        ref={statementRef}
        className={`about-statement ${statementVisible ? "is-visible" : ""}`}
      >
        <div className="about-container-narrow">
          <blockquote>{t("about.quote")}</blockquote>
        </div>
      </section>
      {/* 4. Journey: Горы и страсть */}
      <section
        ref={explorationRef}
        className={`about-exploration ${explorationVisible ? "is-visible" : ""}`}
      >
        <div className="about-container">
          <div className="exploration-layout">
            <div className="exploration-text">
              <h3 ref={beyondTitleRef}>{t("about.beyondTitle")}</h3>
              {t("about.beyond").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <span className="travel-note">{t("about.travelNote")}</span>
            </div>
            <div className="exploration-image">
              <img src={mountainSmall} alt={t("about.mountainAlt")} />
            </div>
          </div>
        </div>
      </section>

      <section
        ref={kindWordsRef}
        className={`kind-words-scrapbook ${kindWordsVisible ? "is-visible" : ""}`}
      >
        <div className="scrapbook-container">
          <h2 className="scrapbook-title">{t("about.kindWordsTitle")}</h2>
          <p className="scrapbook-subtitle">{t("about.kindWordsSubtitle")}</p>

          <div className="scrapbook-canvas">
            {/* Item 1 */}
            <div className="scrapbook-item item-1">
              <img src={review1} alt={t("about.reviewAlt")} />
              <div className="note-wrap note-item-1">
                <svg className="arrow-hand arrow-item-1" viewBox="0 0 50 50">
                  <path
                    d="M1,1 C10,15 30,15 45,45 M45,45 L35,42 M45,45 L42,35"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="handwritten">{reviews[0]}</span>
              </div>
            </div>

            {/* Item 2 */}
            <div className="scrapbook-item item-2">
              <img src={review2} alt={t("about.reviewAlt")} />
              <div className="note-wrap note-item-2">
                <svg className="arrow-hand arrow-item-2" viewBox="0 0 50 50">
                  <path
                    d="M1,1 C10,15 30,15 45,45 M45,45 L35,42 M45,45 L42,35"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="handwritten">{reviews[1]}</span>
              </div>
            </div>

            {/* Item 3 */}
            <div className="scrapbook-item item-3">
              <img src={review3} alt={t("about.reviewAlt")} />
              <div className="note-wrap note-item-3">
                <svg className="arrow-hand arrow-item-3" viewBox="0 0 50 50">
                  <path
                    d="M1,1 C10,15 30,15 45,45 M45,45 L35,42 M45,45 L42,35"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="handwritten">{reviews[2]}</span>
              </div>
            </div>

            {/* Item 4 */}
            <div className="scrapbook-item item-4">
              <img src={review4} alt={t("about.reviewAlt")} />
              <div className="note-wrap note-item-4">
                <svg className="arrow-hand arrow-item-4" viewBox="0 0 50 50">
                  <path
                    d="M1,1 C10,15 30,15 45,45 M45,45 L35,42 M45,45 L42,35"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="handwritten">{reviews[3]}</span>
              </div>
            </div>

            {/* Item 5 */}
            <div className="scrapbook-item item-5">
              <img src={review5} alt={t("about.reviewAlt")} />
              <div className="note-wrap note-item-5">
                <svg className="arrow-hand arrow-item-5" viewBox="0 0 50 50">
                  <path
                    d="M1,1 C10,15 30,15 45,45 M45,45 L35,42 M45,45 L42,35"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="handwritten">{reviews[4]}</span>
              </div>
            </div>

            {/* Item 6 */}
            <div className="scrapbook-item item-6">
              <img src={review6} alt={t("about.reviewAlt")} />
              <div className="note-wrap note-item-6">
                <svg className="arrow-hand arrow-item-6" viewBox="0 0 50 50">
                  <path
                    d="M39,4 C39,17 39,29 33,37 C25,43 15,44 6,44 M6,44 L12,39 M6,44 L12,48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="handwritten">{reviews[5]}</span>
              </div>
            </div>

            {/* Item 7 */}
            <div className="scrapbook-item item-7">
              <img src={review7} alt={t("about.reviewAlt")} />
              <div className="note-wrap note-item-7">
                <svg className="arrow-hand arrow-item-7" viewBox="0 0 50 50">
                  <path
                    d="M1,1 C10,15 30,15 45,45 M45,45 L35,42 M45,45 L42,35"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="handwritten">{reviews[6]}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
