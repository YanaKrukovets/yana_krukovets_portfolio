import { useForm, ValidationError } from "@formspree/react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

function ContactForm() {
  const [state, handleSubmit] = useForm("mjvllaww");

  if (state.succeeded) {
    return (
      <section className="contact-banner">
        <p className="contact-success" role="status">
          Thanks for reaching out — I&apos;ll be in touch soon!
        </p>
      </section>
    );
  }

  return (
    <section className="contact-banner" id="contact" aria-labelledby="contact-heading">
      <div className="contact-grid">

        {/* Left column — intro text */}
        <div className="contact-info">
          <h1 id="contact-heading">Let&apos;s Work Together</h1>
          <p className="contact-tagline">
            I&apos;m open to freelance, contract, and full-time opportunities.
            Have a project in mind or just want to say hello?
          </p>
        </div>

        {/* Right column — contact form */}
        <div className="contact-form-col">
          <form onSubmit={handleSubmit} method="POST">
            <fieldset>
              <legend className="sr-only">Contact form</legend>

              <label htmlFor="name" className="contact-label">Name *</label>
              <input
                id="name"
                type="text"
                className="contact-input"
                name="name"
                autoComplete="name"
                aria-required="true"
                required
              />
              <ValidationError prefix="name" field="name" errors={state.errors} />

              <label htmlFor="email" className="contact-label">Email *</label>
              <input
                id="email"
                type="email"
                name="email"
                className="contact-input"
                autoComplete="email"
                aria-required="true"
                required
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />

              <label htmlFor="message" className="contact-label">Message</label>
              <textarea
                className="contact-input"
                id="message"
                name="message"
                rows={5}
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} />

              <button type="submit" className="btn" disabled={state.submitting}>
                {state.submitting ? "Sending…" : "Send Message"}
              </button>
            </fieldset>
          </form>
        </div>

        {/* Details + socials — below form on mobile, below intro on desktop */}
        <div className="contact-meta">
          <ul className="contact-details">
            <li>
              <span className="contact-detail-label">Location</span>
              <span>Ottawa, Canada</span>
            </li>
            <li>
              <span className="contact-detail-label">Email</span>
              <a href="mailto:krukovets.yana@gmail.com">krukovets.yana@gmail.com</a>
            </li>
          </ul>

          <div className="contact-socials">
            <a
              href="https://github.com/YanaKrukovets"
              aria-label="GitHub profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillGithub size={28} />
            </a>
            <a
              href="https://www.linkedin.com/in/yana-krukovets-25658260/"
              aria-label="LinkedIn profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillLinkedin size={28} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ContactForm;
