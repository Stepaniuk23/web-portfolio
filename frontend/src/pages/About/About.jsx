import React, { useEffect, useRef, useState } from "react";
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
      { threshold: 0.2 },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page">
      {/* 1. Hero: Атмосфера и спокойствие */}
      <section className="about-hero-full">
        <div className="hero-bg-wrap">
          <img
            src={hallstattHero}
            alt="Hallstatt"
            className={`about-hero-photo${heroVisible ? " is-visible" : ""}`}
          />
        </div>
        <div className={`hero-text-overlay${heroVisible ? " is-visible" : ""}`}>
          <div className="hero-intro-text">
            <p>
              <span className="intro-first-part">I'm Denys Stepaniuk,</span>
              <span className="intro-second-part">
                and for over 8 years, I've had the honor of documenting more
                than 248 wedding stories across Europe, framing the quiet,
                honest moments that define our lives.
              </span>
            </p>
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
              <img src={portraitMain} alt="Portrait of Denys" />
            </div>
            <div className="split-content">
              <h2>A Storyteller based in Prague</h2>
              <p>
                When I’m not documenting weddings, you’ll most likely find me in
                the mountains. This love for wild, quiet places is where my
                search for honest light begins. It is why you see peaks and
                clouds on these pages—they are my greatest teachers of patience
                and perspective.
              </p>
              <p>
                My work is a search for honesty. I believe that the most
                powerful imagery comes from a place of quiet observation rather
                than forced poses. Based in Prague, I travel across Europe to
                document stories that are as raw as they are refined.
              </p>
              <p>
                Whether it's the grandeur of a historic museum or a quiet
                morning in the mountains, I am constantly looking for the light
                that reveals the soul of the moment.
              </p>
              <p>
                At the end of the day, my goal is simple: to create images that
                don’t just show what your wedding looked like, but remind you
                how it felt. I avoid passing trends to focus on what’s real. I
                want you to look at your photos twenty years from now and see
                your true selves, captured in the most beautiful light possible.
              </p>
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
          <blockquote>
            "I find the beauty in the unseen, the quiet, and the timeless."
          </blockquote>
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
              <h3>Beyond the Camera</h3>
              <p>
                Exploring the wild landscapes of the Alps or the Dolomites is
                where I truly recharge. It's the same patience required for a
                long hike that I bring to my photography—waiting for the perfect
                light, respecting the environment, and staying present in every
                second.
              </p>
              <p>
                For me, the mountains are the ultimate teachers. They show you
                that you cannot rush greatness and that the most beautiful
                moments often require the most effort to reach. This discipline
                allows me to remain calm and focused amidst the beautiful chaos
                of a wedding day.
              </p>
              <p>
                Whether I’m navigating a rocky ridge or the historic streets of
                a European city, my curiosity remains the same. I am constantly
                seeking new perspectives and untold stories. It’s not just about
                the destination; it’s about the soul of the journey.
              </p>
              <p>
                Ultimately, this passion for discovery is what keeps my work
                fresh and honest. I am always ready to pack my bags and travel
                wherever your story takes us, bringing a piece of that mountain
                stillness with me.
              </p>
              <span className="travel-note">Available Worldwide</span>
            </div>
            <div className="exploration-image">
              <img src={mountainSmall} alt="Mountain exploration" />
            </div>
          </div>
        </div>
      </section>

      <section
        ref={kindWordsRef}
        className={`kind-words-scrapbook ${kindWordsVisible ? "is-visible" : ""}`}
      >
        <div className="scrapbook-container">
          <h2 className="scrapbook-title">Kind Words</h2>
          <p className="scrapbook-subtitle">Real moments, real emotions.</p>

          <div className="scrapbook-canvas">
            {/* Item 1 */}
            <div className="scrapbook-item item-1">
              <img src={review1} alt="Review" />
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
                <span className="handwritten">
                  "Exceeding expectations is always the goal. A beautiful note
                  from Ekaterina about our timing and the soul behind every
                  shot. So grateful for couples like this"
                </span>
              </div>
            </div>

            {/* Item 2 */}
            <div className="scrapbook-item item-2">
              <img src={review2} alt="Review" />
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
                <span className="handwritten">
                  "When a family story becomes addictive. Ruslana and her family
                  watched it on loop several times before even hitting the
                  download button. Truly touched by these words"
                </span>
              </div>
            </div>

            {/* Item 3 */}
            <div className="scrapbook-item item-3">
              <img src={review3} alt="Review" />
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
                <span className="handwritten">
                  "A moment of transformation for Ruslana. 'I don't even
                  recognize myself' is the ultimate compliment for a boudoir
                  story. Truly a chic and honest set"
                </span>
              </div>
            </div>

            {/* Item 4 */}
            <div className="scrapbook-item item-4">
              <img src={review4} alt="Review" />
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
                <span className="handwritten">
                  "Editorial magic with Victoria. Her reaction — 'No one has
                  ever seen me like this before' — is the ultimate goal when we
                  create a high-end, magazine-style story together"
                </span>
              </div>
            </div>

            {/* Item 5 */}
            <div className="scrapbook-item item-5">
              <img src={review5} alt="Review" />
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
                <span className="handwritten">
                  "It's all about the 'eye for the frame'. Anna’s wedding was a
                  joy to document, and I’m honored she felt the soul of her
                  important day reflected in these shots. Looking forward to our
                  next chapters together"
                </span>
              </div>
            </div>

            {/* Item 6 */}
            <div className="scrapbook-item item-6">
              <img src={review6} alt="Review" />
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
                <span className="handwritten">
                  "Happy tears from Margarita. It’s all about catching that one
                  fleeting moment — like the roses she mentioned. Seeing her
                  reaction makes every second of the 'hunt' for the perfect shot
                  worth it"
                </span>
              </div>
            </div>

            {/* Item 7 */}
            <div className="scrapbook-item item-7">
              <img src={review7} alt="Review" />
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
                <span className="handwritten">
                  "The ultimate compliment is a returning client. After her
                  wedding, Margarita came back for an editorial session. Her
                  reaction — 'I have no words' — says it all. It’s a joy to see
                  her energy again"
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
