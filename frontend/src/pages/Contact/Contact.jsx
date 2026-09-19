import "./Contact.css";
import contactPhoto from "../../assets/contact.jpg";
import { useState } from "react";
import { apiUrl } from "../../config";

function Contact() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    setIsSubmitting(true);
    setStatus("");

    try {
      const response = await fetch(apiUrl("/api/contact/"), {
        method: "POST",
        body: formData,
      });

      const result = await response.json().catch(() => null);

      if (response.ok) {
        setStatus(
          "Thank you for your message. I will get back to you shortly.",
        );
        form.reset();
      } else {
        setStatus(
          result?.detail || "Something went wrong. Please try again later.",
        );
      }
    } catch {
      setStatus("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-page">
      <div className="contact-wrapper">
        <figure className="contact-photo">
          <img src={contactPhoto} alt="A quiet portrait from the studio" />
        </figure>

        <section className="contact-container" aria-labelledby="contact-title">
          <h1 id="contact-title" className="contact-title">
            Contact Me
          </h1>
          <p className="contact-subtitle">
            I would love to hear from you. Feel free to reach out for bookings
            or any questions.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder="Your name"
              autoComplete="name"
              minLength="2"
              maxLength="120"
              required
            />

            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              maxLength="254"
              required
            />

            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Tell me a little about your plans"
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
              {isSubmitting ? "Sending..." : "Send Message"}
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
