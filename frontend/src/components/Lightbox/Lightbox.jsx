import { useCallback, useEffect } from "react";
import "./Lightbox.css";

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (index === null || index === undefined || !images[index]) return null;

  const current = images[index];

  return (
    <div className="lightbox" onClick={onClose}>
      <button
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close"
        title="Close"
      >
        &times;
      </button>

      <button
        className="lightbox-arrow left"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous photo"
        title="Previous photo"
      >
        &#10094;
      </button>

      <img
        className="lightbox-img"
        src={current.src}
        alt={current.alt || ""}
        onClick={(e) => e.stopPropagation()}
      />

      <button
        className="lightbox-arrow right"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next photo"
        title="Next photo"
      >
        &#10095;
      </button>
    </div>
  );
}

export default Lightbox;
