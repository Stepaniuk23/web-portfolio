import { useEffect, useRef, useState } from "react";
import "./AboutTeaser.css";

import portrait from "../../../assets/about/portrait.jpg"; // твоё ЧБ фото

function AboutTeaser() {
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
    <section
      ref={ref}
      className={`about-teaser ${visible ? "is-visible" : ""}`}
    >
      <div className="about-teaser-inner">
        <div className="about-teaser-image">
          <img src={portrait} alt="Denys Stepaniuk portrait" />
        </div>

        <div className="about-teaser-content">
          <p className="about-teaser-kicker">ABOUT DENYS</p>

          <h2 className="about-teaser-title">
            calmly observant, quietly elegant, honest, deeply human.
          </h2>

          <p className="about-teaser-text">
            A wedding photographer based in Prague, crafting honest and timeless
            imagery shaped by light, emotion, and the beauty of real moments.
          </p>

          <p className="about-teaser-text">
            My work is calm, observant, and intentional — focused on capturing
            the quiet authenticity within every celebration.
          </p>

          <a href="/about" className="btn-ghost about-teaser-cta">
            Read More
          </a>
        </div>
      </div>
    </section>
  );
}

export default AboutTeaser;
