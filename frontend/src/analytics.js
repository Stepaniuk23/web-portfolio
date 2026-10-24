const GA_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;
const CLARITY_ID = process.env.REACT_APP_CLARITY_PROJECT_ID;

const isEnabled = process.env.NODE_ENV === "production";
let initialized = false;

function loadScript(src) {
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function initGA() {
  if (!GA_ID) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  // Page views are sent manually on each route change
  window.gtag("config", GA_ID, { send_page_view: false });
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
}

function initClarity() {
  if (!CLARITY_ID) return;
  window.clarity =
    window.clarity ||
    function () {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };
  loadScript(`https://www.clarity.ms/tag/${CLARITY_ID}`);
}

// Defer loading until the browser is idle so it doesn't affect performance
export function initAnalytics() {
  if (!isEnabled || initialized) return;
  initialized = true;
  const start = () => {
    initGA();
    initClarity();
  };
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(start, { timeout: 4000 });
  } else {
    window.setTimeout(start, 2000);
  }
}

export function trackPageView(path) {
  if (!isEnabled || !GA_ID || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
