import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "./NotFound.css";

// Страница для несуществующих адресов.
// noindex говорит Google не добавлять такие адреса в поиск.
function NotFound() {
  return (
    <main className="not-found-page">
      <Helmet>
        <title>Page not found | Denys Stepaniuk</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <h1 className="not-found-title">Page not found</h1>
      <p className="not-found-text">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-ghost not-found-btn">
        Back to home
      </Link>
    </main>
  );
}

export default NotFound;
