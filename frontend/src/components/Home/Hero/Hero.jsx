import "./Hero.css";
import heroImage from "../../../assets/hero.jpg";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <img src={heroImage} alt="Wedding" className="hero-photo" />
      </div>

      <div className="hero-right">
        <span className="hero-label">Editorial Wedding Photography</span>

        <h1 className="hero-title">
          Timeless
          <br />
          Wedding
          <br />
          Stories
        </h1>

        <div className="hero-divider"></div>

        <p className="hero-subtitle">Modern. Emotional. Fashion‑inspired.</p>

        <a href="#gallery" className="btn-ghost hero-button">
          View Stories
        </a>
      </div>
    </section>
  );
}

export default Hero;
