"use client";

import { InnerHeader } from "@/components/layout/InnerHeader";
import { PageHeader } from "@/components/layout/PageHeader";
import { Footer } from "@/components/sections/Footer";

export default function PrivacyPage() {
  return (
    <>
      <InnerHeader />

      <main className="bg-black min-h-screen">
        <PageHeader
          title="Privacy Policy"
          subtitle="Legal"
          description="Last updated: January 2025"
          gradient="cyan"
        />

        <section className="py-16 md:py-24">
          <div className="container-main">
            <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
              <div className="space-y-8 text-neutral-300">
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    1. Introduction
                  </h2>
                  <p>
                    WebXExpert (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting
                    your privacy. This Privacy Policy explains how we collect, use,
                    disclose, and safeguard your information when you visit our
                    website or use our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    2. Information We Collect
                  </h2>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Personal Information
                  </h3>
                  <p className="mb-4">
                    We may collect personal information that you voluntarily provide
                    when you:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Fill out a contact form</li>
                    <li>Request a quote or consultation</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Engage with us on social media</li>
                  </ul>
                  <p>This information may include:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Name and email address</li>
                    <li>Company name and job title</li>
                    <li>Phone number</li>
                    <li>Project details and requirements</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-6">
                    Automatically Collected Information
                  </h3>
                  <p>
                    When you visit our website, we automatically collect certain
                    information, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>IP address and browser type</li>
                    <li>Device information</li>
                    <li>Pages viewed and time spent</li>
                    <li>Referring website</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    3. How We Use Your Information
                  </h2>
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Respond to your inquiries and provide customer support</li>
                    <li>Send you project updates and communications</li>
                    <li>Improve our website and services</li>
                    <li>Send marketing communications (with your consent)</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    4. Cookies and Tracking
                  </h2>
                  <p>
                    We use cookies and similar tracking technologies to enhance your
                    experience on our website. You can control cookies through your
                    browser settings. We use:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Essential cookies:</strong> Required for basic site
                      functionality
                    </li>
                    <li>
                      <strong>Analytics cookies:</strong> Help us understand how
                      visitors use our site
                    </li>
                    <li>
                      <strong>Marketing cookies:</strong> Used to deliver relevant
                      advertisements
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    5. Data Sharing
                  </h2>
                  <p>
                    We do not sell your personal information. We may share your
                    information with:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Service providers who assist in our operations</li>
                    <li>Legal authorities when required by law</li>
                    <li>Business partners with your consent</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    6. Data Security
                  </h2>
                  <p>
                    We implement appropriate technical and organizational measures to
                    protect your personal information against unauthorized access,
                    alteration, disclosure, or destruction. However, no method of
                    transmission over the Internet is 100% secure.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    7. Your Rights
                  </h2>
                  <p>Depending on your location, you may have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Object to processing</li>
                    <li>Data portability</li>
                    <li>Withdraw consent</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    8. Third-Party Links
                  </h2>
                  <p>
                    Our website may contain links to third-party websites. We are not
                    responsible for the privacy practices of these external sites. We
                    encourage you to review their privacy policies.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    9. Children&apos;s Privacy
                  </h2>
                  <p>
                    Our services are not directed to individuals under 16. We do not
                    knowingly collect personal information from children.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    10. Updates to This Policy
                  </h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will
                    notify you of any changes by posting the new policy on this page
                    and updating the &quot;Last updated&quot; date.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    11. Contact Us
                  </h2>
                  <p>
                    If you have any questions about this Privacy Policy, please
                    contact us at:
                  </p>
                  <p className="mt-4">
                    <strong className="text-brand-cyan-500">Email:</strong>{" "}
                    privacy@webxexpert.com
                    <br />
                    <strong className="text-brand-cyan-500">Address:</strong> San
                    Francisco, CA
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
