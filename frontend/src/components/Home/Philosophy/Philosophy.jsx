import { useEffect, useRef, useState } from "react";
import "./Philosophy.css";
import philosophyBg from "../../../assets/philosophy/philosophy-bg.jpg";
import { useT } from "../../../i18n/LanguageContext";

function Philosophy() {
  const ref = useRef(null);
  const imageRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [offset, setOffset] = useState(0);
  const t = useT();
  const [titleStart, titleAnd, titleEnd] = t("home.philosophy.title");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 },
    );
    observer.observe(el);

    const handleScroll = () => {
      if (!ref.current || !imageRef.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const progress = (rect.top + rect.height / 2) / windowHeight - 0.5;
        const maxProgress = 0.5 + rect.height / (2 * windowHeight);
        const normalized = Math.max(-1, Math.min(1, progress / maxProgress));

        const imageHeight = imageRef.current.getBoundingClientRect().height;
        const maxTravel = Math.max((imageHeight - rect.height) / 2, 0);
        const parallaxStrength = 0.05;

        // Ограничиваем смещение реальным запасом по высоте, чтобы края фото
        // совпадали с краями секции в крайних точках параллакса.
        setOffset(normalized * maxTravel * parallaxStrength);
      }
    };

    handleScroll(); // Инициализируем offset сразу, чтобы не было чёрной полосы при первом показе
    window.addEventListener("scroll", handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section ref={ref} className={`philosophy ${visible ? "is-visible" : ""}`}>
      {/* Контейнер для фото */}
      <div className="philosophy-bg-wrap">
        <img
          ref={imageRef}
          src={philosophyBg}
          className="philosophy-parallax-img"
          alt={t("home.philosophy.alt")}
          style={{
            transform: `translateX(var(--philosophy-mobile-shift-x, 0px)) translateY(calc(${offset}px + 150px)) scale(var(--philosophy-parallax-scale, 1))`,
          }}
        />
      </div>

      <div className="philosophy-inner">
        <p className="philosophy-kicker">{t("home.philosophy.kicker")}</p>
        <h2 className="philosophy-title">
          {titleStart} <span className="italic-word">{titleAnd}</span>{" "}
          {titleEnd}
        </h2>
        <div className="philosophy-divider" aria-hidden="true" />
        <p className="philosophy-text">{t("home.philosophy.text1")}</p>
        <p className="philosophy-text">{t("home.philosophy.text2")}</p>
      </div>
    </section>
  );
}

export default Philosophy;
