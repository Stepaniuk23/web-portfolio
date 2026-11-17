import { useEffect, useRef, useState } from "react";
import LangLink from "../../../i18n/LangLink";
import { useT } from "../../../i18n/LanguageContext";
import { fill } from "../../../i18n/languages";
import "./Studio.css";

// Импортируй свои вертикальные фото
import studio1 from "../../../assets/studio/studio1.jpg";
import studio2 from "../../../assets/studio/studio2.jpg";
import studio3 from "../../../assets/studio/studio3.jpg";
import studio4 from "../../../assets/studio/studio4.jpg";

const STUDIO_IMAGES = [studio1, studio2, studio3, studio4];

function Studio() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const t = useT();
  const [subtitleStart, subtitleAnd, subtitleEnd] = t("home.studio.subtitle");

  // Fade-in при появлении блока
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

  // Автоплей fade-слайдера
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % STUDIO_IMAGES.length);
    }, 5000); // смена каждые 5 секунд

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className={`studio ${visible ? "is-visible" : ""}`}>
      <div className="studio-inner">
        <p className="studio-title">{t("home.studio.kicker")}</p>

        <h2 className="studio-subtitle">
          {subtitleStart}{" "}
          <span className="studio-subtitle-and">{subtitleAnd}</span>{" "}
          {subtitleEnd}
        </h2>

        <div className="studio-slider">
          {STUDIO_IMAGES.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={fill(t("home.studio.slideAlt"), { n: i + 1 })}
              className={`studio-slide ${i === index ? "active" : ""}`}
            />
          ))}
        </div>

        <p className="studio-text">
          {t("home.studio.text")}
        </p>

        <LangLink to="/weddings" className="btn-ghost studio-cta">
          {t("home.studio.cta")}
        </LangLink>
      </div>
    </section>
  );
}

export default Studio;
