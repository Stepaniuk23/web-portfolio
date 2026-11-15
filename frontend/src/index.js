import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./reset.css";
import "./variables.css";

// SEO: статические <title>, description и canonical из HTML нужны только
// для Google и превью в соцсетях. Когда запускается React, каждая страница
// задаёт свои теги через <Helmet>, поэтому убираем статические, чтобы не было дублей.
document
  .querySelectorAll(
    'head > title, head > meta[name="description"], head > link[rel="canonical"]',
  )
  .forEach((el) => el.remove());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
