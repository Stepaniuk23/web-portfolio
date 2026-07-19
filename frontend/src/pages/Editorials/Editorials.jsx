import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../Weddings/Weddings.css";
import { editorialsData } from "../../data/editorialsData";

function Editorials() {
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
          <h1>Selected Editorials</h1>
          <p className="subtitle">Portrait stories across Europe and beyond</p>
        </div>
      </header>

      <section
        ref={gridRef}
        className={`stories-grid ${gridVisible ? "is-visible" : ""}`}
      >
        {editorialsData.map((story, index) => (
          <div
            key={story.id}
            className="story-card"
            style={{ "--story-delay": `${index * 140}ms` }}
          >
            <Link to={`/editorials/${story.id}`}>
              <div className="story-image-wrap">
                <img
                  src={story.images.cover}
                  alt={`${story.title} editorial photography in ${story.location}`}
                />
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

export default Editorials;
