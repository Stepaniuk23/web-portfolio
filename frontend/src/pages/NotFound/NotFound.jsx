import Seo from "../../i18n/Seo";
import LangLink from "../../i18n/LangLink";
import { useT } from "../../i18n/LanguageContext";
import "./NotFound.css";

// Страница для несуществующих адресов.
// noindex говорит Google не добавлять такие адреса в поиск.
function NotFound() {
  const t = useT();

  return (
    <main className="not-found-page">
      <Seo title={t("seo.notFound.title")} noindex />
      <h1 className="not-found-title">{t("notFound.title")}</h1>
      <p className="not-found-text">{t("notFound.text")}</p>
      <LangLink to="/" className="btn-ghost not-found-btn">
        {t("notFound.back")}
      </LangLink>
    </main>
  );
}

export default NotFound;
