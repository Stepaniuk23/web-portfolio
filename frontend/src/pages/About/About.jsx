import "./About.css";
import myPhoto from "../../assets/about.jpg";
import { useEffect, useRef, useState } from "react";
import { useCounter } from "../../hooks/useCounter";

function About() {
  const aboutRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

  // Запускаем счётчики, когда секция появляется на экране
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCount(true);
        }
      },
      { threshold: 0.4 },
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Два счётчика, которые стартуют одновременно
  const years = useCounter(startCount, 8);
  const weddings = useCounter(startCount, 243);

  return (
    <div className="about-container" ref={aboutRef}>
      <div className="about-inner">
        {/* Фото слева */}
        <div className="about-photo">
          <img src={myPhoto} alt="Denys Stepaniuk" />
        </div>

        {/* Текст справа */}
        <div className="about-text">
          <h2 className="about-title">About Me</h2>

          <p>
            With more than eight years of experience in wedding photography, I
            have had the privilege of capturing countless unforgettable moments.
            Living in Prague with my family, I find inspiration in both family
            and art. Photography is not just my profession — it is my passion, a
            way to preserve emotions and tell timeless stories.
          </p>

          <p>
            With <span>{years}</span> years of experience and more than{" "}
            <span>{weddings}</span> weddings photographed, I focus on natural
            emotions, beautiful light and authentic moments.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
