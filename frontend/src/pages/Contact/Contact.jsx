import "./Contact.css";
import contactPhoto from "../../assets/contact.jpg";
import { SiInstagram, SiFacebook, SiThreads } from "react-icons/si";
import { useState } from "react";
import { apiUrl } from "../../config";

function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // не перезагружаем страницу

    const formData = new FormData(e.target);

    const response = await fetch(apiUrl("/api/contact/"), {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setStatus("Thank you for your message! I will get back to you shortly.");
      e.target.reset();

      // Скрыть сообщение через 4 секунды
      setTimeout(() => {
        setStatus("");
      }, 4000);
    } else {
      setStatus("Something went wrong. Please try again later.");

      // Скрыть сообщение об ошибке через 4 секунды
      setTimeout(() => {
        setStatus("");
      }, 4000);
    }
  };

  return (
    <div className="contact-outer">
      <div className="contact-wrapper">
        {/* Левая колонка — фото */}
        <div className="contact-photo">
          <img src={contactPhoto} alt="Contact" />
        </div>

        {/* Правая колонка — форма */}
        <div className="contact-container">
          <h2 className="contact-title">Contact Me</h2>
          <p className="contact-subtitle">
            I would love to hear from you. Feel free to reach out for bookings
            or any questions.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Name" required />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
            ></textarea>

            {/* honeypot */}
            <input type="text" name="website" style={{ display: "none" }} />

            <button type="submit" className="contact-submit">
              Send Message
            </button>

            {status && <p className="contact-status">{status}</p>}
          </form>

          {/* Соцсети */}
          <div className="contact-socials">
            <a
              href="https://www.instagram.com/yourprofile"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="contact-social-link"
            >
              <SiInstagram className="social-icon" />
            </a>

            <a
              href="https://www.facebook.com/yourprofile"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="contact-social-link"
            >
              <SiFacebook className="social-icon" />
            </a>

            <a
              href="https://www.threads.net/@yourprofile"
              target="_blank"
              rel="noreferrer"
              aria-label="Threads"
              className="contact-social-link"
            >
              <SiThreads className="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
