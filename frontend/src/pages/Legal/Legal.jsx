import Seo from "../../i18n/Seo";
import LangLink from "../../i18n/LangLink";
import { useT } from "../../i18n/LanguageContext";
import { OPEN_SETTINGS_EVENT } from "../../consent";
import "./Legal.css";

// Тексты политик хранятся в словарях: src/i18n/locales/*.json -> legal.privacy / legal.cookies
const POLICY_PATHS = { privacy: "/privacy-policy", cookies: "/cookie-policy" };

function Legal({ type }) {
  const t = useT();
  const policy = t(`legal.${type}`);

  return (
    <main className="legal-page">
      <Seo
        title={`${policy.title} | Denys Stepaniuk`}
        description={policy.description}
        path={POLICY_PATHS[type]}
      />
      <article className="legal-article">
        <header>
          <h1 className="legal-title">{policy.title}</h1>
        </header>
        {policy.sections.map((s) => (
          <section key={s.heading} className="legal-section">
            <h2>{s.heading}</h2>
            <p>{s.body}</p>
            {s.action && (
              <button
                type="button"
                className="btn-ghost legal-btn"
                onClick={() =>
                  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))
                }
              >
                {t("legal.settingsButton")}
              </button>
            )}
          </section>
        ))}
        <p className="legal-meta">
          {t("legal.metaBefore")}{" "}
          <LangLink to="/contact">{t("legal.metaLink")}</LangLink>.
        </p>
      </article>
    </main>
  );
}

export default Legal;
