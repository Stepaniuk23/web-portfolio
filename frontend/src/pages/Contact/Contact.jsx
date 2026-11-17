import "./Contact.css";
import contactPhoto from "../../assets/contact.jpg";
import { useState } from "react";
import Seo from "../../i18n/Seo";
import { useLanguage, useT } from "../../i18n/LanguageContext";
import { sendContactForm } from "../../services/contactForm";

function Contact() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useT();
  const { lang } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget;
    setIsSubmitting(true);
    setStatus("");

    // Язык страницы попадает в письмо — сразу видно, на каком языке отвечать клиенту
    const result = await sendContactForm(form, {
      language: lang.toUpperCase(),
    });

    if (result.ok) {
      setStatus(t("contact.success"));
      form.reset();
    } else {
      setStatus(result.network ? t("contact.network") : t("contact.error"));
    }
    setIsSubmitting(false);
  };

  return (
    <main className="contact-page">
      <Seo
        title={t("seo.contact.title")}
        description={t("seo.contact.description")}
        path="/contact"
      />

      <div className="contact-wrapper">
        <figure className="contact-photo">
          <img src={contactPhoto} alt={t("contact.photoAlt")} />
        </figure>

        <section className="contact-container" aria-labelledby="contact-title">
          <h1 id="contact-title" className="contact-title">
            {t("contact.title")}
          </h1>
          <a href="tel:+420721031650" className="contact-phone">
            +420 721 031 650
          </a>
          <p className="contact-subtitle">{t("contact.subtitle")}</p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="contact-name">{t("contact.name")}</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder={t("contact.namePlaceholder")}
              autoComplete="name"
              minLength="2"
              maxLength="120"
              required
            />

            <label htmlFor="contact-email">{t("contact.email")}</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder={t("contact.emailPlaceholder")}
              autoComplete="email"
              maxLength="254"
              required
            />

            <label htmlFor="contact-message">{t("contact.message")}</label>
            <textarea
              id="contact-message"
              name="message"
              placeholder={t("contact.messagePlaceholder")}
              minLength="5"
              maxLength="5000"
              required
            />

            <input
              className="contact-honeypot"
              type="text"
              name="website"
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
            />

            <button
              type="submit"
              className="btn-ghost contact-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? t("contact.sending") : t("contact.send")}
            </button>

            {status && (
              <p className="contact-status" role="status" aria-live="polite">
                {status}
              </p>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}

export default Contact;
