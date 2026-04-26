import "./Hero.css";

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-overlay">
        <div className="hero-text">
          <h1 className="hero-name">Capturing moments that live forever</h1>
          <a href="#contact" className="hero-button">
            Book now
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
