const STORAGE_KEY = "cookie-consent";
const CHANGE_EVENT = "cookie-consent-change";
export const OPEN_SETTINGS_EVENT = "cookie-consent-open";

export function getConsent() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage unavailable: choice applies for this session only
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: value }));
}

export function onConsentChange(handler) {
  const listener = (e) => handler(e.detail);
  window.addEventListener(CHANGE_EVENT, listener);
  return () => window.removeEventListener(CHANGE_EVENT, listener);
}

// Analytics run only after explicit opt-in
export function analyticsAllowed() {
  return getConsent() === "granted";
}
