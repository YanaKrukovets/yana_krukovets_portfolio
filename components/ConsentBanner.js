import { useEffect, useState } from "react";
import Link from "next/link";
import { getConsent, setConsent, flush } from "../lib/analytics";

// Opt-out consent banner. Tracking runs by default; this banner lets the
// visitor decline. It shows once (until a choice is stored in localStorage),
// then never again. Mounted globally in _app.js.
export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if the visitor hasn't made a choice yet.
    if (!getConsent()) setVisible(true);
  }, []);

  const accept = () => {
    setConsent("accepted");
    setVisible(false);
  };

  const decline = () => {
    setConsent("declined");
    flush(); // send anything already queued, then the tracker goes quiet
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="consent-banner" role="dialog" aria-label="Privacy notice">
      <p className="consent-banner__text">
        This site uses privacy-friendly, cookieless analytics to understand how
        visitors use the page. No personal data is collected. See the{" "}
        <Link href="/privacy-policy" className="consent-banner__link">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="consent-banner__actions">
        <button
          type="button"
          onClick={decline}
          className="consent-banner__btn consent-banner__btn--ghost"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={accept}
          className="consent-banner__btn consent-banner__btn--primary"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
