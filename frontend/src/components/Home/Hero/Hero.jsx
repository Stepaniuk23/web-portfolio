import "./Hero.css";
import heroImage from "../../../assets/hero.jpg";
import { useT } from "../../../i18n/LanguageContext";

function Hero() {
  const t = useT();

  return (
    <section className="hero">
      <div className="hero-left">
        <img
          src={heroImage}
          alt={t("home.hero.alt")}
          fetchpriority="high"
          className="hero-photo"
        />
      </div>

      <div className="hero-right">
        <span className="hero-label">{t("home.hero.label")}</span>

        <h1 className="hero-title">
          {t("home.hero.titleLines").map((line) => (
            <span key={line} className="hero-title-line">
              {line}
            </span>
          ))}
        </h1>

        <div className="hero-divider"></div>

        <p className="hero-subtitle">{t("home.hero.subtitle")}</p>
      </div>
    </section>
  );
}

export default Hero;
