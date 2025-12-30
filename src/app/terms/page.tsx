"use client";

import { InnerHeader } from "@/components/layout/InnerHeader";
import { PageHeader } from "@/components/layout/PageHeader";
import { Footer } from "@/components/sections/Footer";

export default function TermsPage() {
  return (
    <>
      <InnerHeader />

      <main className="bg-black min-h-screen">
        <PageHeader
          title="Terms of Service"
          subtitle="Legal"
          description="Last updated: January 2025"
          gradient="purple"
        />

        <section className="py-16 md:py-24">
          <div className="container-main">
            <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
              <div className="space-y-8 text-neutral-300">
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    1. Agreement to Terms
                  </h2>
                  <p>
                    By accessing or using the services provided by WebXExpert
                    (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you agree to be bound by
                    these Terms of Service. If you do not agree to these terms,
                    please do not use our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    2. Services
                  </h2>
                  <p>WebXExpert provides the following services:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Web design and development</li>
                    <li>Custom software development</li>
                    <li>CRM and business application development</li>
                    <li>API integrations and automation</li>
                    <li>Consulting and technical advisory</li>
                    <li>Maintenance and support services</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    3. Project Agreements
                  </h2>
                  <p>
                    All projects are governed by a separate Project Agreement that
                    outlines:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Scope of work and deliverables</li>
                    <li>Timeline and milestones</li>
                    <li>Pricing and payment terms</li>
                    <li>Revision policy</li>
                    <li>Ownership and intellectual property rights</li>
                  </ul>
                  <p className="mt-4">
                    In case of any conflict between these Terms and a Project
                    Agreement, the Project Agreement shall prevail.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    4. Payment Terms
                  </h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      A deposit is required before work begins (typically 30-50% of
                      project total)
                    </li>
                    <li>
                      Milestone payments are due upon completion of agreed
                      deliverables
                    </li>
                    <li>Final payment is due before launch or handover</li>
                    <li>Late payments may incur interest charges</li>
                    <li>
                      We reserve the right to pause work on accounts with overdue
                      balances
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    5. Intellectual Property
                  </h2>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Client Materials
                  </h3>
                  <p className="mb-4">
                    You retain ownership of all materials, content, and intellectual
                    property you provide to us for use in your project.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    Deliverables
                  </h3>
                  <p className="mb-4">
                    Upon full payment, you receive ownership of custom work created
                    specifically for your project. This excludes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Third-party libraries, frameworks, and tools (which remain
                      under their respective licenses)
                    </li>
                    <li>
                      Our pre-existing tools, components, and code libraries
                    </li>
                    <li>General methodologies and know-how</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">
                    Portfolio Rights
                  </h3>
                  <p>
                    We reserve the right to showcase completed work in our portfolio
                    and marketing materials unless explicitly agreed otherwise.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    6. Client Responsibilities
                  </h2>
                  <p>As a client, you agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate and complete project requirements</li>
                    <li>Supply necessary materials and content in a timely manner</li>
                    <li>
                      Respond to communications and review requests within agreed
                      timeframes
                    </li>
                    <li>
                      Ensure you have rights to all materials provided to us
                    </li>
                    <li>Make payments according to the agreed schedule</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    7. Revisions and Changes
                  </h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Each project phase includes a specified number of revision
                      rounds
                    </li>
                    <li>Additional revisions may incur extra charges</li>
                    <li>
                      Scope changes after project commencement will be handled
                      through a change order process
                    </li>
                    <li>
                      Significant scope changes may affect timeline and pricing
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    8. Warranties and Disclaimers
                  </h2>
                  <p>
                    We warrant that our services will be performed in a professional
                    and workmanlike manner. However:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      We do not guarantee specific business outcomes or results
                    </li>
                    <li>
                      We are not responsible for third-party services, hosting, or
                      integrations
                    </li>
                    <li>
                      Services are provided &quot;as is&quot; without warranties of
                      merchantability or fitness for a particular purpose
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    9. Limitation of Liability
                  </h2>
                  <p>
                    Our total liability for any claims arising from our services
                    shall not exceed the total amount paid by you for the specific
                    project in question. We are not liable for:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Indirect, incidental, or consequential damages</li>
                    <li>Lost profits or business opportunities</li>
                    <li>Data loss or security breaches beyond our control</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    10. Termination
                  </h2>
                  <p>Either party may terminate a project with written notice:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Client termination: Payment is due for all work completed to
                      date
                    </li>
                    <li>
                      Our termination: We will deliver all work completed and refund
                      any prepaid amounts for undelivered work
                    </li>
                    <li>
                      For cause: Either party may terminate immediately for material
                      breach
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    11. Confidentiality
                  </h2>
                  <p>
                    Both parties agree to keep confidential any proprietary
                    information shared during the course of the project. This
                    obligation survives termination of the agreement.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    12. Dispute Resolution
                  </h2>
                  <p>
                    Any disputes arising from these terms or our services shall be
                    resolved through:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Good faith negotiation between the parties</li>
                    <li>Mediation by a mutually agreed mediator</li>
                    <li>
                      Binding arbitration in accordance with the rules of the
                      American Arbitration Association
                    </li>
                  </ol>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    13. Governing Law
                  </h2>
                  <p>
                    These terms shall be governed by the laws of the State of
                    California, without regard to its conflict of law provisions.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    14. Changes to Terms
                  </h2>
                  <p>
                    We reserve the right to modify these terms at any time. Changes
                    will be effective upon posting to our website. Continued use of
                    our services constitutes acceptance of modified terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    15. Contact Information
                  </h2>
                  <p>For questions about these Terms of Service, contact us at:</p>
                  <p className="mt-4">
                    <strong className="text-brand-purple-500">Email:</strong>{" "}
                    legal@webxexpert.com
                    <br />
                    <strong className="text-brand-purple-500">Address:</strong> San
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
