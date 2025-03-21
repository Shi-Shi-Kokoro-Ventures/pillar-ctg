import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />

      <main className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
        <section className="mb-8">
          <h1 className="text-3xl font-extrabold text-redcross mb-4">Privacy Policy</h1>
          <p className="text-lg">
            Your privacy is important to us. It is P.I.L.L.A.R.'s policy to respect your privacy regarding any information we may collect from you across our website, <a href="#" className="text-blue-600 hover:underline">https://example.com</a>, and other sites we own and operate.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Information We Collect</h2>
          <p>We collect information in the following ways:</p>
          <ul className="list-disc pl-5">
            <li>
              <strong>Information you directly provide to us:</strong> For example, when you fill out a contact form, subscribe to our newsletter, or make a donation.
            </li>
            <li>
              <strong>Information we collect automatically:</strong> This includes your IP address, browser type, and device information. We also use cookies to track your activity on our site.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-5">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
            <li>Send you emails</li>
            <li>Find and prevent fraud</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Sharing Your Information</h2>
          <p>We do not share your personal information with third parties except as described below:</p>
          <ul className="list-disc pl-5">
            <li>
              <strong>With your consent:</strong> We may share your information with third parties when we have your explicit consent to do so.
            </li>
            <li>
              <strong>Service providers:</strong> We may share information with service providers who perform services on our behalf, such as payment processing, email marketing, and data analytics.
            </li>
            <li>
              <strong>Legal requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Cookies</h2>
          <p>We use cookies to enhance your experience on our website. You can control cookies through your browser settings.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-5">
            <li>Access the personal information we hold about you</li>
            <li>Correct any inaccurate or incomplete personal information</li>
            <li>Request the deletion of your personal information</li>
            <li>Object to our processing of your personal information</li>
          </ul>
          <p>To exercise these rights, please contact us using the contact information provided below.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
          <address>
            P.I.L.L.A.R.<br />
            123 Main Street<br />
            Anytown, USA 12345<br />
            Email: <a href="mailto:info@example.com" className="text-blue-600 hover:underline">info@example.com</a>
          </address>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
