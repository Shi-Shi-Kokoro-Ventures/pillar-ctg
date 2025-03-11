
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
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h2>
              <p>
                P.I.L.L.A.R. Initiative ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you visit our website or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Personal Information</h3>
              <p>
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Make a donation</li>
                <li>Register as a volunteer</li>
                <li>Sign up for our newsletter</li>
                <li>Apply for housing assistance</li>
                <li>Contact us through our website</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              <p className="mt-4">
                This information may include your name, email address, mailing address, phone number, 
                payment information, and demographic information.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-2 mt-6">Automatically Collected Information</h3>
              <p>
                When you visit our website, we may automatically collect certain information about your device, 
                including your IP address, browser type, referring/exit pages, operating system, date/time stamps, 
                and clickstream data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
              <p>We may use the information we collect for various purposes, including to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process donations and provide tax receipts</li>
                <li>Communicate with you about our programs, services, and events</li>
                <li>Respond to your inquiries and provide support</li>
                <li>Process volunteer applications</li>
                <li>Improve our website and services</li>
                <li>Send newsletters and marketing communications</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and protect the security of our website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sharing Your Information</h2>
              <p>We may share your information with third parties in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Providers:</strong> We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, and website hosting.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
                <li><strong>Protection of Rights:</strong> We may disclose your information when we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, or situations involving potential threats to the safety of any person.</li>
                <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of organization assets, financing, or acquisition of all or a portion of our organization to another organization.</li>
              </ul>
              <p className="mt-4">
                We do not sell, rent, or trade your personal information to third parties for their marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Security</h2>
              <p>
                We implement reasonable security measures to protect your personal information from unauthorized 
                access, alteration, disclosure, or destruction. However, no data transmission or storage system 
                is completely secure, and we cannot guarantee the absolute security of your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights</h2>
              <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The right to access the personal information we have about you</li>
                <li>The right to request that we correct or update inaccurate or incomplete information</li>
                <li>The right to request that we delete your personal information</li>
                <li>The right to opt out of receiving marketing communications</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cookies and Similar Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our website and store certain information. 
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you 
                do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Children's Privacy</h2>
              <p>
                Our website is not intended for children under 13 years of age. We do not knowingly collect personal 
                information from children under 13. If we learn we have collected or received personal information from 
                a child under 13 without verification of parental consent, we will delete that information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last Updated" date at the top of this page. You are advised 
                to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy, please contact us at:
              </p>
              <address className="not-italic mt-2">
                <p>P.I.L.L.A.R. Initiative</p>
                <p>1201 Orange St #600</p>
                <p>Wilmington, DE 19801</p>
                <p>Email: info@pillarinitiativectg.org</p>
                <p>Phone: 1-833-585-4273 (1-833-LVL-HARD)</p>
              </address>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
