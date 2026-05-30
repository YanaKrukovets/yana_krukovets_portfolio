import { useForm, ValidationError } from "@formspree/react";
import { useScrollReveal } from "../hooks/useScrollReveal";

// Contact form powered by Formspree — no custom backend needed.
// Submissions are forwarded by Formspree to Yana's email address.
// "mjvllaww" is the Formspree form ID for this project.
function ContactForm() {
  // useForm handles submission state (submitting, succeeded, errors) and wires up handleSubmit
  const [state, handleSubmit] = useForm("mjvllaww");

  // Animate the form in when it scrolls into view
  const { ref, isVisible } = useScrollReveal(0.1);

  // Replace the entire form with a thank-you message after successful submission —
  // avoids a double-submit and gives immediate visual feedback
  if (state.succeeded) {
    return (
      <p className="succeed-form">
        Thanks for taking the time to reach out. I will contact with you soon
      </p>
    );
  }

  return (
    <div
      id="contact"
      ref={ref}
      className={`content-wrapper my-[40px] py-[20px] font-roboto reveal${isVisible ? " reveal--visible" : ""}`}
    >
      {/* method="POST" is a fallback for non-JS environments; Formspree also handles it via JS fetch */}
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="max-w-[900px] mx-auto"
      >
        {/* <fieldset> + <legend> groups the fields semantically and labels the form for screen readers */}
        <fieldset>
          <legend>
            <h2 className="pb-[10px] text-[27px]">
              <b>Have a question or want to work together?</b>
            </h2>
          </legend>
          <p>* - required fields</p>

          <label htmlFor="name" className="form-label">
            Name:*
          </label>
          <input
            id="name"
            type="text"
            className="form-control"
            name="name"
            autoComplete="name"  // hints the browser to offer saved names
            aria-required="true"
            required
          />
          {/* ValidationError renders the field-level error message from Formspree if submission fails */}
          <ValidationError prefix="name" field="name" errors={state.errors} />

          <label htmlFor="email" className="form-label">
            Email:*
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="form-control"
            autoComplete="email"
            aria-required="true"
            required
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />

          <label htmlFor="message" className="form-label">
            Message:
          </label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            rows={5}
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />

          {/* Disabled while submitting to prevent duplicate submissions */}
          <button type="submit" className="btn" disabled={state.submitting}>
            {state.submitting ? "Sending…" : "Submit"}
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default ContactForm;
