import "./Hero.css";

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-overlay">
        <div className="hero-text">
          <h1 className="hero-name">Denys Stepaniuk</h1>
          <p className="hero-subtitle">Wedding photography</p>

          <a href="#contact" className="hero-button">
            Book now
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
