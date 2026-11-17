import { Link } from "react-router-dom";
import { useLocalizePath } from "./LanguageContext";

/**
 * Обычный <Link>, но ссылка автоматически ведёт на страницу
 * на текущем языке: to="/about" на чешской версии станет "/cs/about".
 */
function LangLink({ to, ...rest }) {
  const localize = useLocalizePath();
  return <Link to={localize(to)} {...rest} />;
}

export default LangLink;
