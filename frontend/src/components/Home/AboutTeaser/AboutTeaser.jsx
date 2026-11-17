import { useEffect, useRef, useState } from "react";
import "./AboutTeaser.css";
import portrait from "../../../assets/about/portrait.jpg";
import LangLink from "../../../i18n/LangLink";
import { useT } from "../../../i18n/LanguageContext";
import { useFitTitle } from "../../../hooks/useFitTitle";

function AboutTeaser() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const t = useT();
  const [titleStart, titleAccent, titleEnd] = t("home.aboutTeaser.title");
  // Длинные слова («наблюдательный») не должны вылезать за край
  const titleRef = useFitTitle(`${titleStart} ${titleAccent} ${titleEnd}`);

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
      className={`about-teaser ${visible ? "is-visible" : ""}`}
    >
      <div className="about-teaser-inner">
        <div className="about-teaser-image">
          <img
            src={portrait}
            alt={t("home.aboutTeaser.alt")}
            decoding="async" /* Ускоряем рендеринг текста */
          />
        </div>

        <div className="about-teaser-content">
          <p className="about-teaser-kicker">{t("home.aboutTeaser.kicker")}</p>

          <h2 ref={titleRef} className="about-teaser-title">
            {titleStart}{" "}
            <span className="about-teaser-title-and">{titleAccent}</span>{" "}
            {titleEnd}
          </h2>

          <p className="about-teaser-text">{t("home.aboutTeaser.text1")}</p>

          <p className="about-teaser-text">{t("home.aboutTeaser.text2")}</p>

          <LangLink to="/about" className="btn-ghost about-teaser-cta">
            {t("home.aboutTeaser.cta")}
          </LangLink>
        </div>
      </div>
    </section>
  );
}

export default AboutTeaser;
