// Отправка формы «Контакты» через бесплатный сервис Web3Forms (https://web3forms.com).
// Письмо приходит на почту, указанную при регистрации ключа.
// Ключ публичный по задумке Web3Forms: он только разрешает присылать письма
// на эту почту, прочитать с ним заявки или почту нельзя.
const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "94bbc04d-0e94-44f6-b246-3d6e54c11fea";

// Если сервис не ответил за 20 секунд — показываем ошибку, а не вечное «Sending...»
const TIMEOUT_MS = 20000;

/**
 * Отправляет форму. Возвращает { ok: true } при успехе,
 * { ok: false, network: true } при проблеме с интернетом/таймауте,
 * { ok: false, network: false } если сервис отклонил заявку.
 */
export async function sendContactForm(form, extraFields = {}) {
  const data = new FormData(form);

  // Скрытое поле-ловушка для спам-ботов: человек его не видит и не заполняет
  if (data.get("website")) return { ok: true };
  data.delete("website");

  data.append("access_key", WEB3FORMS_ACCESS_KEY);
  data.append("subject", "New inquiry from denysstepaniuk.com");
  data.append("from_name", "denysstepaniuk.com");
  Object.entries(extraFields).forEach(([key, value]) => data.append(key, value));

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
      signal: controller.signal,
    });
    const result = await response.json().catch(() => null);
    return { ok: response.ok && result?.success === true, network: false };
  } catch {
    return { ok: false, network: true };
  } finally {
    clearTimeout(timer);
  }
}
