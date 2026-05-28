import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Weddings.css";
import { odessaWeddingImages } from "../../data/weddingAssets";

// Массив данных твоих историй. Когда появятся новые, просто добавляй объект в этот список.
const stories = [
  {
    id: "viktor-natalia-odessa", // Этот ID будет в URL (например, /weddings/viktor-natalia-odessa)
    title: "Viktor & Natalia",
    location: "Odessa, Ukraine",
    coverImage: odessaWeddingImages.cover,
    year: "2023",
  },
  // Место для остальных 5 свадеб:
  // { id: "story-2", title: "...", location: "...", coverImage: "..." },
];

function Weddings() {
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (entry.target === headerRef.current) {
            setHeaderVisible(true);
            observer.unobserve(entry.target);
          }

          if (entry.target === gridRef.current) {
            setGridVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (gridRef.current) observer.observe(gridRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="weddings-page">
      <header
        ref={headerRef}
        className={`weddings-header ${headerVisible ? "is-visible" : ""}`}
      >
        <div className="weddings-container">
          <h1>Selected Stories</h1>
          <p className="subtitle">Documenting love across Europe and beyond</p>
        </div>
      </header>

      <section
        ref={gridRef}
        className={`stories-grid ${gridVisible ? "is-visible" : ""}`}
      >
        {stories.map((story, index) => (
          <div
            key={story.id}
            className="story-card"
            style={{ "--story-delay": `${index * 140}ms` }}
          >
            {/* Ссылка ведет на страницу конкретной истории */}
            <Link to={`/weddings/${story.id}`}>
              <div className="story-image-wrap">
                <img src={story.coverImage} alt={story.title} />
                <div className="story-overlay">
                  <span>View Story</span>
                </div>
              </div>
              <div className="story-info">
                <span className="story-location">{story.location}</span>
                <h3 className="story-title">{story.title}</h3>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Weddings;
