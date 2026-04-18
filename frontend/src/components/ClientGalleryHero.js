import "../pages/Hero/Hero.css";

function ClientGalleryHero({ title, eventDate, coverPhoto }) {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${coverPhoto})`,
        height: "60vh",
      }}
    >
      <div className="hero-overlay">
        <div className="hero-text">
          <h1 className="hero-name">{title}</h1>
          <p className="hero-subtitle">{eventDate}</p>
        </div>
      </div>
    </section>
  );
}

export default ClientGalleryHero;
