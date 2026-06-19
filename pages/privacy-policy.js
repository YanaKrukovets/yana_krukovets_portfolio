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
          <p className="text-[14px] text-gray-500 mb-[40px]">Last updated: June 18, 2026</p>

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
            <p>This website does not use advertising or cross-site tracking cookies. The only cookie that may be set is a strictly necessary session cookie used to keep the site owner signed in to the private analytics dashboard — it is never set for ordinary visitors.</p>
          </section>

          <section className="mb-[40px]">
            <h2 className="text-[22px] font-semibold mb-[16px]">6. Analytics</h2>
            <p className="mb-[12px]">This site uses a privacy-friendly, first-party analytics system to understand how visitors interact with the pages (for example, which pages are viewed, how far people scroll, and where they click). This helps improve the site&apos;s content and usability.</p>
            <p className="mb-[12px]">This analytics is designed to respect your privacy:</p>
            <ul className="list-disc pl-[24px] space-y-[8px] mb-[12px]">
              <li><strong>No cookies</strong> are used for analytics. A random, temporary session identifier is held only in your browser&apos;s session storage and is discarded when you close the tab.</li>
              <li><strong>No personal data</strong> is collected — no names, emails, or precise IP addresses are stored (your IP is used transiently only to prevent abuse and is not retained with the analytics data).</li>
              <li>The data is anonymous and aggregated, and is stored on infrastructure provided by <a href="https://supabase.com" className="underline" target="_blank" rel="noopener noreferrer">Supabase</a>. Aggregated summaries may be processed by Google&apos;s Gemini AI to generate suggestions for improving the site.</li>
            </ul>
            <p>Analytics is enabled by default, but you can <strong>opt out at any time</strong> by selecting &quot;Decline&quot; on the consent banner shown on your first visit. If your browser sends a &quot;Do Not Track&quot; signal, analytics is disabled automatically.</p>
          </section>

          <section className="mb-[40px]">
            <h2 className="text-[22px] font-semibold mb-[16px]">7. Your rights</h2>
            <p>Under PIPEDA (Canada) and applicable privacy laws, you have the right to access, correct, or request deletion of any personal information you have submitted. Contact <a href="mailto:yanashelli@gmail.com" className="underline">yanashelli@gmail.com</a> to exercise these rights.</p>
          </section>

          <section className="mb-[40px]">
            <h2 className="text-[22px] font-semibold mb-[16px]">8. Contact</h2>
            <p>For any privacy-related questions, reach out via the <Link href="/contact" className="underline">contact page</Link> or email <a href="mailto:krukovets.yana@gmail.com" className="underline">krukovets.yana@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </>
  );
}
