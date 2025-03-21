import React from "react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Lock, FileText, Info, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const PrivacyPolicy = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center mb-4 p-3 rounded-full bg-blue-50">
              <Shield className="h-8 w-8 text-redcross" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              Privacy Policy
            </h1>
            <div className="flex items-center justify-center text-gray-500">
              <FileText className="h-4 w-4 mr-2" />
              <p>Last Updated: March 11, 2025</p>
            </div>
          </div>
          
          {/* Introduction Card */}
          <div className="mb-12 glass p-8 rounded-xl shadow-lg border border-gray-100 bg-white/80 backdrop-blur-sm">
            <p className="text-gray-700 leading-relaxed">
              P.I.L.L.A.R. Initiative CTG ("we," "our," or "us") is a 501(c)(3) nonprofit organization committed to protecting your privacy and
              maintaining the highest standards of transparency, accountability, and legal compliance. This Privacy Policy explains how we collect, use, 
              disclose, and safeguard your personal information when you visit our website or use our services. By accessing or using our website, you agree 
              to the practices described herein. If you do not agree with this Policy, please discontinue your use immediately.
            </p>
          </div>
          
          <div className="prose max-w-none text-gray-700 space-y-10">
            {/* Table of Contents */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm mb-12">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Search className="h-5 w-5 mr-2 text-redcross" />
                Quick Navigation
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "1. Information We Collect",
                  "2. How We Use Your Information",
                  "3. Data Retention and Deletion",
                  "4. Sharing Your Information",
                  "5. International Data Transfers",
                  "6. Jurisdiction-Specific Rights",
                  "7. Your Rights and How to Exercise Them",
                  "8. Do Not Track Signals",
                  "9. Data Security",
                  "10. Children's Privacy",
                  "11. Changes to This Privacy Policy",
                  "12. Contact Us"
                ].map((item, i) => (
                  <a 
                    key={i} 
                    href={`#section-${i+1}`} 
                    className="text-redcross hover:text-redcross-dark transition-colors flex items-center group"
                  >
                    <span className="inline-block w-6 h-6 mr-2 rounded-full bg-redcross-light/20 text-xs flex items-center justify-center text-redcross">
                      {i+1}
                    </span>
                    <span className="group-hover:underline">{item.substring(item.indexOf(' ') + 1)}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Content Sections */}
            <section id="section-1" className="scroll-mt-24 bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100 flex items-center">
                <div className="bg-redcross/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-redcross">1</div>
                Information We Collect
              </h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-800 mb-3 flex items-center">
                    <Lock className="h-5 w-5 text-redcross mr-2" />
                    1.1 Personal Information
                  </h3>
                  <p className="mb-4">
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
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-800 mb-3 flex items-center">
                    <Lock className="h-5 w-5 text-redcross mr-2" />
                    1.2 Automatically Collected Information
                  </h3>
                  <p>
                    When you access our website, we may automatically collect data about your device and usage, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li><strong>Technical Data:</strong> IP address, browser type, operating system, and device identifiers</li>
                    <li><strong>Usage Data:</strong> Referring/exit pages, date/time stamps, clickstream data, and other interaction details</li>
                  </ul>
                  <p className="mt-2">
                    This information helps us monitor and improve our website and services.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-800 mb-3 flex items-center">
                    <Lock className="h-5 w-5 text-redcross mr-2" />
                    1.3 Data from Cookies and Similar Technologies
                  </h3>
                  <p>
                    We use cookies and similar tracking technologies to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Enhance and personalize your browsing experience</li>
                    <li>Analyze website usage and performance</li>
                    <li>Retain your preferences</li>
                  </ul>
                  <p className="mt-2">
                    You may adjust your browser settings to refuse cookies; however, doing so may limit certain features of our website.
                  </p>
                </div>
              </div>
            </section>

            {/* Rest of the content sections */}
            {[
              {
                id: 2,
                title: "How We Use Your Information",
                content: (
                  <>
                    <p>
                      We use the information collected for various legitimate purposes, including to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-3">
                      <li><strong>Facilitate Donations and Transactions:</strong> Process donations, issue tax receipts, and manage related financial transactions.</li>
                      <li><strong>Communicate:</strong> Provide updates on our programs, respond to inquiries, and send newsletters and marketing communications (only with your consent).</li>
                      <li><strong>Volunteer and Program Administration:</strong> Process volunteer applications, manage housing assistance applications, and support program delivery.</li>
                      <li><strong>Improve Our Services:</strong> Analyze user behavior, conduct research, and improve website functionality and content.</li>
                      <li><strong>Legal Compliance and Security:</strong> Comply with applicable laws and regulations, prevent fraud, and protect our organization, users, and data.</li>
                      <li><strong>Data Analytics and Marketing:</strong> Use aggregated data for internal research and to enhance our outreach and services (this does not involve identifying individual users).</li>
                    </ul>
                  </>
                )
              },
              {
                id: 3,
                title: "Data Retention and Deletion",
                content: (
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Retention Periods:</strong> We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Policy or as required by law.</li>
                    <li><strong>Deletion and Anonymization:</strong> Once your data is no longer needed, we will securely delete or anonymize it. Requests for deletion or modification of your data may be made as described in Section 7.</li>
                  </ul>
                )
              },
              {
                id: 4,
                title: "Sharing Your Information",
                content: (
                  <>
                    <p>
                      We do not sell, rent, or trade your personal information for third-party marketing purposes. We may share your data in the following instances:
                    </p>
                    <ul className="list-disc pl-6 space-y-3 mt-3">
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
                  </>
                )
              },
              {
                id: 5,
                title: "International Data Transfers",
                content: (
                  <p>
                    If you are located outside the United States, please note that your information may be transferred to, stored, and processed in the United States or other countries. We take appropriate measures to ensure that your data is protected in accordance with this Policy and applicable data protection laws (e.g., through standard contractual clauses or other legal mechanisms where required).
                  </p>
                )
              },
              {
                id: 6,
                title: "Jurisdiction-Specific Rights",
                content: (
                  <>
                    <p>
                      Depending on your location, you may have additional rights regarding your personal data. For example, if you are a California resident, you may have rights under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA), including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-3">
                      <li>The right to access your personal information.</li>
                      <li>The right to request correction or deletion of your data.</li>
                      <li>The right to opt out of the sale or sharing of your personal data.</li>
                    </ul>
                    <p className="mt-2">For any inquiries or to exercise these rights, please refer to the "Contact Us" section below.</p>
                  </>
                )
              },
              {
                id: 7,
                title: "Your Rights and How to Exercise Them",
                content: (
                  <>
                    <p>
                      You may have certain rights regarding your personal data, including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-3">
                      <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
                      <li><strong>Correction:</strong> Request corrections to any inaccurate or incomplete information.</li>
                      <li><strong>Deletion:</strong> Request that your personal information be deleted, subject to applicable legal obligations.</li>
                      <li><strong>Opt-Out:</strong> Opt out of receiving marketing communications from us.</li>
                    </ul>
                    <p className="mt-2">
                      To exercise these rights, please contact us at the details provided in Section 12. We will respond to your request in compliance with applicable laws.
                    </p>
                  </>
                )
              },
              {
                id: 8,
                title: "Do Not Track Signals",
                content: (
                  <p>
                    Our website currently does not respond to "Do Not Track" (DNT) signals. However, you may control cookies and similar technologies through your browser settings. If you have concerns regarding tracking, please review our Cookies and Similar Technologies section.
                  </p>
                )
              },
              {
                id: 9,
                title: "Data Security",
                content: (
                  <p>
                    We implement robust technical, administrative, and physical security measures to safeguard your personal information. While we strive to protect your data, no system is completely secure. You acknowledge that any data transmission or storage carries inherent risks, and we cannot guarantee absolute security.
                  </p>
                )
              },
              {
                id: 10,
                title: "Children's Privacy",
                content: (
                  <p>
                    Our website is not directed to children under 13, and we do not knowingly collect personal information from children under this age. If we learn that we have collected data from a child under 13 without verifiable parental consent, we will promptly delete that information. If you believe we have collected such data, please contact us immediately.
                  </p>
                )
              },
              {
                id: 11,
                title: "Changes to This Privacy Policy",
                content: (
                  <p>
                    We may update this Privacy Policy periodically to reflect changes in our practices or legal obligations. The "Last Updated" date at the top of this page will indicate when changes were last made. We encourage you to review this Policy regularly. Your continued use of our website after any updates constitutes your acceptance of the revised Policy.
                  </p>
                )
              },
              {
                id: 12,
                title: "Contact Us",
                content: (
                  <>
                    <p>
                      If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
                    </p>
                    <address className="not-italic mt-4 p-5 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="font-semibold">P.I.L.L.A.R. Initiative CTG</p>
                      <p>1201 Orange St #600</p>
                      <p>Wilmington, DE 19801</p>
                      <p className="mt-2 flex items-center">
                        <svg className="h-4 w-4 mr-2 text-redcross" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>Email: info@pillarinitiativectg.org</span>
                      </p>
                      <p className="flex items-center">
                        <svg className="h-4 w-4 mr-2 text-redcross" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>Phone: 1-833-585-4273 (1-833-LVL-HARD)</span>
                      </p>
                    </address>
                    <p className="mt-4">
                      We are committed to addressing your inquiries promptly and effectively.
                    </p>
                  </>
                )
              }
            ].map(section => (
              <section 
                key={section.id} 
                id={`section-${section.id}`} 
                className={cn(
                  "scroll-mt-24 bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in",
                  section.id % 2 === 0 ? "bg-gradient-to-br from-white to-gray-50" : ""
                )}
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100 flex items-center">
                  <div className="bg-redcross/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-redcross">
                    {section.id}
                  </div>
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
