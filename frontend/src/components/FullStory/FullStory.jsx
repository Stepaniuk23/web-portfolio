import React, { useCallback, useEffect, useRef, useState } from "react";
import "./FullStory.css";

const FullStory = React.forwardRef(
  (
    { images, title = "The Full Story", label = "Atmosphere", isVisible },
    ref,
  ) => {
    const validImages = (images || []).filter(Boolean);
    const scrollRef = useRef(null);
    const itemRefs = useRef([]);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      itemRefs.current = itemRefs.current.slice(0, validImages.length);
    }, [validImages.length]);

    const updateScrollState = useCallback(() => {
      const scroller = scrollRef.current;
      if (!scroller) return;

      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      const currentScroll = scroller.scrollLeft;
      const paddingLeft =
        parseFloat(window.getComputedStyle(scroller).paddingLeft) || 0;
      const items = itemRefs.current.filter(Boolean);

      let closestIndex = 0;
      let closestDistance = Infinity;

      items.forEach((item, index) => {
        const itemStart = Math.max(item.offsetLeft - paddingLeft, 0);
        const distance = Math.abs(itemStart - currentScroll);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
      setCanScrollLeft(currentScroll > 4);
      setCanScrollRight(currentScroll < maxScroll - 4);
      setProgress(maxScroll > 0 ? currentScroll / maxScroll : 0);
    }, []);

    const scrollToIndex = useCallback((index) => {
      const scroller = scrollRef.current;
      if (!scroller) return;

      const targetItem = itemRefs.current[index];
      if (!targetItem) return;

      const paddingLeft =
        parseFloat(window.getComputedStyle(scroller).paddingLeft) || 0;
      const targetLeft = Math.max(targetItem.offsetLeft - paddingLeft, 0);

      scroller.scrollTo({
        left: targetLeft,
        behavior: "smooth",
      });
    }, []);

    const handleArrowClick = (direction) => {
      const targetIndex = Math.min(
        Math.max(activeIndex + direction, 0),
        validImages.length - 1,
      );
      scrollToIndex(targetIndex);
    };

    useEffect(() => {
      const scroller = scrollRef.current;
      if (!scroller) return undefined;

      const handleScroll = () => updateScrollState();

      updateScrollState();
      scroller.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleScroll);

      return () => {
        scroller.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
      };
    }, [updateScrollState, validImages.length]);

    if (validImages.length === 0) return null;

    return (
      <section
        ref={ref}
        className={`full-story story-section-reveal ${isVisible ? "is-visible" : ""}`}
      >
        <div className="full-story-header">
          <div className="container-wide">
            <span className="full-story-label">{label}</span>
            <h2 className="full-story-title">{title}</h2>
          </div>
        </div>

        <div className="full-story-gallery-shell">
          <button
            type="button"
            className="full-story-arrow full-story-arrow-left"
            onClick={() => handleArrowClick(-1)}
            disabled={!canScrollLeft}
            aria-label="Show previous photos"
          >
            <span aria-hidden="true">&#8592;</span>
          </button>

          <div ref={scrollRef} className="full-story-scroll">
            {validImages.map((img, index) => (
              <div
                key={index}
                className="scroll-item"
                ref={(element) => {
                  itemRefs.current[index] = element;
                }}
              >
                <img src={img} alt={`Frame ${index + 1}`} loading="lazy" />
              </div>
            ))}
          </div>

          <button
            type="button"
            className="full-story-arrow full-story-arrow-right"
            onClick={() => handleArrowClick(1)}
            disabled={!canScrollRight}
            aria-label="Show next photos"
          >
            <span aria-hidden="true">&#8594;</span>
          </button>

          <div className="full-story-meta" aria-hidden="true">
            <span className="full-story-counter">
              {String(activeIndex + 1).padStart(2, "0")}/
              {String(validImages.length).padStart(2, "0")}
            </span>
            <div className="full-story-progress-track">
              <span
                className="full-story-progress-value"
                style={{ transform: `scaleX(${Math.max(progress, 0.02)})` }}
              />
            </div>
          </div>
        </div>
      </section>
    );
  },
);

export default FullStory;
