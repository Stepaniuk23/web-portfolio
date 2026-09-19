import { useEffect, useState } from "react";
import "./ClientGalleryHero.css";

function ClientGalleryHero({ title, eventDate, coverPhoto }) {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector(".header");
    if (!header) return undefined;

    const updateHeight = () => setHeaderHeight(header.offsetHeight);
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="client-gallery-hero"
      style={{ height: `calc(100vh - ${headerHeight}px)` }}
    >
      <div className="client-gallery-hero-media">
        <img src={coverPhoto} alt={`${title} cover`} />
      </div>
      <div className="client-gallery-hero-content">
        <h1 className="client-gallery-hero-title">{title}</h1>
        <p className="client-gallery-hero-subtitle">{eventDate}</p>
      </div>
    </section>
  );
}

export default ClientGalleryHero;
