import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import en from "../locales/en";
import fr from "../locales/fr";

export default function Footer() {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : fr;

  return (
    <footer className="max-w-inner xxxl:px-0 purple">
      <div className="footer-wrapper">
          <div className="content-wrapper">
          <div role="footer" aria-label="footer">
            © Yana Krukovets, 2025
          </div>
        </div>
      </div>
    </footer>
  );
}
