import { useEffect, useRef, useState } from "react";
import "./Philosophy.css";
import philosophyBg from "../../../assets/philosophy/philosophy-bg.jpg";

function Philosophy() {
  const ref = useRef(null);
  const imageRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
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
          alt="Philosophy Background"
          style={{
            transform: `translateX(var(--philosophy-mobile-shift-x, 0px)) translateY(calc(${offset}px + 150px)) scale(var(--philosophy-parallax-scale, 1))`,
          }}
        />
      </div>

      <div className="philosophy-inner">
        <p className="philosophy-kicker">
          Known for a visual language built on
        </p>
        <h2 className="philosophy-title">
          HONEST <span className="italic-word">and</span> TIMELESS
        </h2>
        <div className="philosophy-divider" aria-hidden="true" />
        <p className="philosophy-text">
          I believe in capturing honest, elegant, and timeless imagery —
          photographs that feel effortless, poetic, and deeply personal.
        </p>
        <p className="philosophy-text">
          Every wedding is a story of connection. My approach is calm,
          observant, and intentional, allowing real moments to unfold naturally.
        </p>
      </div>
    </section>
  );
}

export default Philosophy;
