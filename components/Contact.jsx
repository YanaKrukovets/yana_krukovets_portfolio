import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

function ContactForm() {
  const [state, handleSubmit] = useForm("mjvllaww");
  if (state.succeeded) {
      return <p>Thanks for joining!</p>;
  }
  return (
      <div id="contact" className="margin-pos">
      <form onSubmit={handleSubmit} method="post">
            <fieldset>
                <legend><h2>Have a question or want to work together?</h2></legend>
                <p>* - required fields</p>
                <label htmlFor="name" className="form-label">Name:*</label>
                <input id="name" type="name" className="form-control" name="name" required />
                <ValidationError prefix="name" field="name" errors={state.errors} />
                
                <label htmlFor="email" className="form-label">Email:*</label>
                <input id="email" type="email" name="email" className="form-control" required />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
                
                <label htmlFor="message" className="form-label">Message:</label>
                <textarea className="form-control" id="message" name="message" />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
                <button type="submit" className="btn" disabled={state.submitting}>Submit</button>
          </fieldset>
    </form>
    </div>
  );
}

export default ContactForm;