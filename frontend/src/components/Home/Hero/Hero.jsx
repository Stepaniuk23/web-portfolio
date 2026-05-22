import "./Hero.css";
import heroImage from "../../../assets/hero.jpg";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <img
          src={heroImage}
          alt="Editorial wedding photography by Denys Stepaniuk"
          fetchpriority="high"
          className="hero-photo"
        />
      </div>

      <div className="hero-right">
        <span className="hero-label">Editorial Wedding Photography</span>

        <h1 className="hero-title">
          <span className="hero-title-line">Timeless</span>
          <span className="hero-title-line">Wedding</span>
          <span className="hero-title-line">Stories</span>
        </h1>

        <div className="hero-divider"></div>

        <p className="hero-subtitle">Modern. Emotional. Fashion‑inspired.</p>
      </div>
    </section>
  );
}

export default Hero;
