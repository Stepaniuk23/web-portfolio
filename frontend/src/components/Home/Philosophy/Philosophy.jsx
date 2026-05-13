import { useEffect, useRef, useState } from "react";
import "./Philosophy.css";

import philosophyVideoMp4 from "../../../assets/video/philosophy-bg.mp4";

function Philosophy() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

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
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className={`philosophy ${visible ? "is-visible" : ""}`}>
      {/* Видео-фон */}
      <video className="philosophy-video" autoPlay loop muted playsInline>
        <source src={philosophyVideoMp4} type="video/mp4" />
      </video>

      {/* Fallback фото (если видео не загрузится) */}
      <div className="philosophy-fallback" />

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
