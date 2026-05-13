import { useEffect, useRef, useState } from "react";
import "./Studio.css";

// Импортируй свои вертикальные фото
import studio1 from "../../../assets/studio/studio1.jpg";
import studio2 from "../../../assets/studio/studio2.jpg";
import studio3 from "../../../assets/studio/studio3.jpg";
import studio4 from "../../../assets/studio/studio4.jpg";

function Studio() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  const images = [studio1, studio2, studio3, studio4];

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
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Автоплей fade-слайдера
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); // смена каждые 5 секунд

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section ref={ref} className={`studio ${visible ? "is-visible" : ""}`}>
      <div className="studio-inner">
        <h2 className="studio-title">THE STUDIO</h2>

        <p className="studio-subtitle">
          Crafting imagery shaped by light, elegance{" "}
          <span className="studio-subtitle-and">and</span> quiet emotion
        </p>

        <div className="studio-slider">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="Studio showcase"
              className={`studio-slide ${i === index ? "active" : ""}`}
            />
          ))}
        </div>

        <p className="studio-text">
          From intimate celebrations in Prague to timeless weddings across
          Europe, my work is guided by light, emotion and the beauty of real
          moments.
        </p>

        <a href="#portfolio" className="btn-ghost studio-cta">
          Browse Portfolio
        </a>
      </div>
    </section>
  );
}

export default Studio;
