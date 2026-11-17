import React, { useEffect, useRef, useState } from "react";
import "./FinalCTA.css";
// Импортируй твое качественное фото (например, ту же девушку в ванной, но статику)
import ctaBg from "../../../assets/cta/cta-bg.jpg";
import LangLink from "../../../i18n/LangLink";
import { useT } from "../../../i18n/LanguageContext";

function FinalCTA() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [offset, setOffset] = useState(0);
  const t = useT();
  const [titleStart, titleAccent, titleEnd] = t("home.finalCta.title");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 1. Появление контента (is-visible)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.05 },
    );

    // 2. Логика параллакса
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const progress = (rect.top + rect.height / 2) / windowHeight - 0.5;
        setOffset(progress * 90);
      }
    };

    observer.observe(el);
    handleScroll(); // Инициализируем сразу, чтобы не было пустого пространства
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section ref={ref} className={`final-cta ${visible ? "is-visible" : ""}`}>
      {/* Контейнер для фото с параллаксом */}
      <div className="cta-bg-wrap">
        <img
          src={ctaBg}
          className="cta-parallax-img"
          alt={t("home.finalCta.alt")}
          style={{
            transform: `translateY(calc(${offset}px * var(--cta-parallax-speed, 1))) scale(var(--cta-parallax-scale, 1))`,
          }}
        />
      </div>

      {/* Оверлей-затемнение */}
      <div className="cta-overlay" />

      <div className="final-cta-container">
        <span className="cta-kicker">{t("home.finalCta.kicker")}</span>
        <h2 className="cta-title">
          {titleStart} <span className="italic-word">{titleAccent}</span>{" "}
          {titleEnd}
        </h2>

        {/* Стандартная кнопка (Editorial Button) */}
        <LangLink to="/contact" className="btn-ghost btn-standard">
          {t("home.finalCta.cta")}
        </LangLink>
      </div>
    </section>
  );
}

export default FinalCTA;
