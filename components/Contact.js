import { useForm, ValidationError } from "@formspree/react";
import { useScrollReveal } from "../hooks/useScrollReveal";

function ContactForm() {
  const [state, handleSubmit] = useForm("mjvllaww");
  const { ref, isVisible } = useScrollReveal(0.1);

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
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="max-w-[900px] mx-auto"
      >
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
            autoComplete="name"
            aria-required="true"
            required
          />
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
          <button type="submit" className="btn" disabled={state.submitting}>
            {state.submitting ? "Sending…" : "Submit"}
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default ContactForm;
