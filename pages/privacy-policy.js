import Head from "next/head";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Yana Krukovets — Web Developer</title>
        <meta name="description" content="Privacy Policy for yanakrukovets.com — how your data is handled when you use the contact form." />
        <meta name="robots" key="robots" content="noindex,nofollow" />
      </Head>
      <div className="max-w-inner xxxl:px-0">
        <div className="content-wrapper font-roboto py-[60px] text-black">
          <h1 className="text-[32px] font-bold mb-[30px] pt-[40px]">Privacy Policy</h1>
          <p className="text-[14px] text-gray-500 mb-[40px]">Last updated: June 5, 2026</p>

          <section className="mb-[40px]">
            <h2 className="text-[22px] font-semibold mb-[16px]">1. Information I collect</h2>
            <p className="mb-[12px]">When you use the contact form on this website, the following information is collected:</p>
            <ul className="list-disc pl-[24px] space-y-[8px]">
              <li>Your name</li>
              <li>Your email address</li>
              <li>The message you submit</li>
            </ul>
          </section>

          <section className="mb-[40px]">
            <h2 className="text-[22px] font-semibold mb-[16px]">2. How I use your information</h2>
            <p>Your information is used solely to respond to your inquiry. It is not sold, shared with third parties for marketing purposes, or used for any automated profiling.</p>
          </section>

          <section className="mb-[40px]">
            <h2 className="text-[22px] font-semibold mb-[16px]">3. Third-party services</h2>
            <p className="mb-[12px]">Contact form submissions are processed by <a href="https://formspree.io" className="underline" target="_blank" rel="noopener noreferrer">Formspree</a>. By submitting the form, your data is also subject to <a href="https://formspree.io/legal/privacy-policy" className="underline" target="_blank" rel="noopener noreferrer">Formspree&apos;s Privacy Policy</a>.</p>
            <p>This site uses Google Fonts loaded via Google&apos;s CDN. Google may collect usage data in accordance with <a href="https://policies.google.com/privacy" className="underline" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a>.</p>
          </section>

          <section className="mb-[40px]">
            <h2 className="text-[22px] font-semibold mb-[16px]">4. Data retention</h2>
            <p>Form submissions are retained only as long as necessary to respond to your inquiry. You may request deletion of your data at any time by emailing <a href="mailto:yanashelli@gmail.com" className="underline">yanashelli@gmail.com</a>.</p>
          </section>

          <section className="mb-[40px]">
            <h2 className="text-[22px] font-semibold mb-[16px]">5. Cookies</h2>
            <p>This website does not use tracking cookies or analytics services. No cookie consent is required.</p>
          </section>

          <section className="mb-[40px]">
            <h2 className="text-[22px] font-semibold mb-[16px]">6. Your rights</h2>
            <p>Under PIPEDA (Canada) and applicable privacy laws, you have the right to access, correct, or request deletion of any personal information you have submitted. Contact <a href="mailto:yanashelli@gmail.com" className="underline">yanashelli@gmail.com</a> to exercise these rights.</p>
          </section>

          <section className="mb-[40px]">
            <h2 className="text-[22px] font-semibold mb-[16px]">7. Contact</h2>
            <p>For any privacy-related questions, reach out via the <Link href="/contact" className="underline">contact page</Link> or email <a href="mailto:krukovets.yana@gmail.com" className="underline">krukovets.yana@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </>
  );
}
