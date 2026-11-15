import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { OPEN_SETTINGS_EVENT } from "../../consent";
import "./Legal.css";

const POLICIES = {
  privacy: {
    title: "Privacy Policy",
    description: "How Denys Stepaniuk Photography handles your personal data.",
    sections: [
      {
        heading: "Who we are",
        body: "This website is the portfolio of Denys Stepaniuk, a wedding and editorial photographer, who is responsible for the personal data described here.",
      },
      {
        heading: "Information you share",
        body: "When you write to me through the contact form, I receive your name, email address and message. I use them only to reply to your enquiry and to discuss your photography, and I never sell or share them for marketing.",
      },
      {
        heading: "Analytics",
        body: "Only if you accept, anonymous usage data is collected through Google Analytics and Microsoft Clarity: pages viewed, device and browser type, approximate location and how the site is navigated. This helps me understand how the site is used and to refine your experience. If you decline, neither service is loaded.",
      },
      {
        heading: "Legal basis",
        body: "Replying to enquiries rests on your request and on legitimate interest. Analytics rest on your consent (GDPR Art. 6(1)(a)), which you may withdraw at any time without affecting earlier processing.",
      },
      {
        heading: "Third parties and transfers",
        body: "Google and Microsoft act as service providers for analytics. Data may be processed outside the European Economic Area under the safeguards those providers maintain, such as standard contractual clauses.",
      },
      {
        heading: "Retention",
        body: "Enquiries are kept for as long as needed to respond and to manage any resulting booking, then deleted. Analytics data is retained according to the settings of each provider.",
      },
      {
        heading: "Your rights",
        body: "You may request access, correction, deletion, restriction or portability of your data, and object to its processing. You may also lodge a complaint with your local data protection authority. To exercise any right, please use the contact form available on the Contact page.",
      },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    description: "Which cookies this website uses and how to control them.",
    sections: [
      {
        heading: "Essential storage",
        body: "Your choice is saved in your browser's local storage under the key “cookie-consent”. It is strictly necessary to remember your decision and contains no personal information.",
      },
      {
        heading: "Analytics cookies",
        body: "Google Analytics and Microsoft Clarity use cookies to measure traffic and to understand how visitors move through the site. They are loaded only after you press Accept; if you decline, they are never loaded and no analytics cookies are set.",
      },
      {
        heading: "Changing your mind",
        body: "You may accept or decline analytics cookies at any time using the button below. Declining after accepting stops further data collection; you can also clear existing cookies in your browser settings.",
        action: true,
      },
    ],
  },
};

function Legal({ type }) {
  const policy = POLICIES[type];

  return (
    <main className="legal-page">
      <Helmet>
        <title>{policy.title} | Denys Stepaniuk</title>
        <meta name="description" content={policy.description} />
      </Helmet>
      <article className="legal-article">
        <header>
          <h1 className="legal-title">{policy.title}</h1>
        </header>
        {policy.sections.map((s) => (
          <section key={s.heading} className="legal-section">
            <h2>{s.heading}</h2>
            <p>{s.body}</p>
            {s.action && (
              <button
                type="button"
                className="btn-ghost legal-btn"
                onClick={() =>
                  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))
                }
              >
                Cookie settings
              </button>
            )}
          </section>
        ))}
        <p className="legal-meta">
          For privacy-related questions or requests, please use the contact
          form available on the <Link to="/contact">Contact page</Link>.
        </p>
      </article>
    </main>
  );
}

export default Legal;
