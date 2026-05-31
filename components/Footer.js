import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

// Locale string bundles — imported for potential future use when the language toggle is re-enabled.
// Currently the FR locale is placeholder text, so `t` is not used in the JSX below.
import en from "../locales/en";
import fr from "../locales/fr";

export default function Footer() {
  const router = useRouter();
  const { locale } = router;
  // t holds the active locale bundle — ready to use once i18n strings are wired up
  const t = locale === "en" ? en : fr;

  return (
    <footer className="max-w-inner xxxl:px-0 purple">
      <div className="footer-wrapper">
        <div className="content-wrapper">
          <div>
            © Yana Krukovets, 2026
          </div>
        </div>
      </div>
    </footer>
  );
}
