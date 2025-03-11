
import React from "react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Last Updated: March 11, 2025</h2>
              <p>
                P.I.L.L.A.R. Initiative CTG ("we," "our," or "us") is a 501(c)(3) nonprofit organization committed to protecting your privacy and
                maintaining the highest standards of transparency, accountability, and legal compliance. This Privacy Policy explains how we collect, use, 
                disclose, and safeguard your personal information when you visit our website or use our services. By accessing or using our website, you agree 
                to the practices described herein. If you do not agree with this Policy, please discontinue your use immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
              <h3 className="text-xl font-medium text-gray-800 mb-2">1.1 Personal Information</h3>
              <p>
                We collect personal information you voluntarily provide when you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Make a donation</li>
                <li>Register as a volunteer</li>
                <li>Sign up for our newsletter</li>
                <li>Apply for housing assistance</li>
                <li>Contact us through our website</li>
                <li>Participate in surveys, promotions, or other activities</li>
              </ul>
              <p className="mt-4">
                Examples of Personal Information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Contact Details:</strong> Name, email address, mailing address, and phone number</li>
                <li><strong>Payment Information:</strong> Credit card or other payment details for processing donations or transactions</li>
                <li><strong>Demographic Information:</strong> Age range, gender, or other demographic details you choose to provide</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-2 mt-6">1.2 Automatically Collected Information</h3>
              <p>
                When you access our website, we may automatically collect data about your device and usage, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Technical Data:</strong> IP address, browser type, operating system, and device identifiers</li>
                <li><strong>Usage Data:</strong> Referring/exit pages, date/time stamps, clickstream data, and other interaction details</li>
              </ul>
              <p className="mt-2">
                This information helps us monitor and improve our website and services.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-2 mt-6">1.3 Data from Cookies and Similar Technologies</h3>
              <p>
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Enhance and personalize your browsing experience</li>
                <li>Analyze website usage and performance</li>
                <li>Retain your preferences</li>
              </ul>
              <p className="mt-2">
                You may adjust your browser settings to refuse cookies; however, doing so may limit certain features of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
              <p>
                We use the information collected for various legitimate purposes, including to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Facilitate Donations and Transactions:</strong> Process donations, issue tax receipts, and manage related financial transactions.</li>
                <li><strong>Communicate:</strong> Provide updates on our programs, respond to inquiries, and send newsletters and marketing communications (only with your consent).</li>
                <li><strong>Volunteer and Program Administration:</strong> Process volunteer applications, manage housing assistance applications, and support program delivery.</li>
                <li><strong>Improve Our Services:</strong> Analyze user behavior, conduct research, and improve website functionality and content.</li>
                <li><strong>Legal Compliance and Security:</strong> Comply with applicable laws and regulations, prevent fraud, and protect our organization, users, and data.</li>
                <li><strong>Data Analytics and Marketing:</strong> Use aggregated data for internal research and to enhance our outreach and services (this does not involve identifying individual users).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Data Retention and Deletion</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Retention Periods:</strong> We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Policy or as required by law.</li>
                <li><strong>Deletion and Anonymization:</strong> Once your data is no longer needed, we will securely delete or anonymize it. Requests for deletion or modification of your data may be made as described in Section 7.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Sharing Your Information</h2>
              <p>
                We do not sell, rent, or trade your personal information for third-party marketing purposes. We may share your data in the following instances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Service Providers:</strong> With trusted third parties who perform services on our behalf (e.g., payment processors, email delivery, data analysis, hosting). These providers are contractually obligated to maintain your information securely and confidentially.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When disclosure is required by law, court order, or government regulation, or in response to a valid request by public authorities.
                </li>
                <li>
                  <strong>Protection of Rights:</strong> To investigate, prevent, or take action against potential violations of our policies, fraud, or threats to public safety or the security of our website.
                </li>
                <li>
                  <strong>Business Transactions:</strong> In connection with mergers, acquisitions, financing, or transfers of assets, subject to confidentiality obligations.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. International Data Transfers</h2>
              <p>
                If you are located outside the United States, please note that your information may be transferred to, stored, and processed in the United States or other countries. We take appropriate measures to ensure that your data is protected in accordance with this Policy and applicable data protection laws (e.g., through standard contractual clauses or other legal mechanisms where required).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Jurisdiction-Specific Rights</h2>
              <p>
                Depending on your location, you may have additional rights regarding your personal data. For example, if you are a California resident, you may have rights under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA), including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The right to access your personal information.</li>
                <li>The right to request correction or deletion of your data.</li>
                <li>The right to opt out of the sale or sharing of your personal data.</li>
              </ul>
              <p className="mt-2">For any inquiries or to exercise these rights, please refer to the "Contact Us" section below.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Your Rights and How to Exercise Them</h2>
              <p>
                You may have certain rights regarding your personal data, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
                <li><strong>Correction:</strong> Request corrections to any inaccurate or incomplete information.</li>
                <li><strong>Deletion:</strong> Request that your personal information be deleted, subject to applicable legal obligations.</li>
                <li><strong>Opt-Out:</strong> Opt out of receiving marketing communications from us.</li>
              </ul>
              <p className="mt-2">
                To exercise these rights, please contact us at the details provided in Section 9. We will respond to your request in compliance with applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Do Not Track Signals</h2>
              <p>
                Our website currently does not respond to "Do Not Track" (DNT) signals. However, you may control cookies and similar technologies through your browser settings. If you have concerns regarding tracking, please review our Cookies and Similar Technologies section.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Data Security</h2>
              <p>
                We implement robust technical, administrative, and physical security measures to safeguard your personal information. While we strive to protect your data, no system is completely secure. You acknowledge that any data transmission or storage carries inherent risks, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Children's Privacy</h2>
              <p>
                Our website is not directed to children under 13, and we do not knowingly collect personal information from children under this age. If we learn that we have collected data from a child under 13 without verifiable parental consent, we will promptly delete that information. If you believe we have collected such data, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy periodically to reflect changes in our practices or legal obligations. The "Last Updated" date at the top of this page will indicate when changes were last made. We encourage you to review this Policy regularly. Your continued use of our website after any updates constitutes your acceptance of the revised Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Contact Us</h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
              </p>
              <address className="not-italic mt-2">
                <p>P.I.L.L.A.R. Initiative CTG</p>
                <p>1201 Orange St #600</p>
                <p>Wilmington, DE 19801</p>
                <p>Email: info@pillarinitiativectg.org</p>
                <p>Phone: 1-833-585-4273 (1-833-LVL-HARD)</p>
              </address>
              <p className="mt-2">
                We are committed to addressing your inquiries promptly and effectively.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
