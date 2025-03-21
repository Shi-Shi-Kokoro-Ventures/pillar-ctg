import React from "react";
import Navbar from "@/components/Navbar";

const TermsOfService = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
        
        <p className="mb-4">
          Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern [Your Company Name]'s relationship with you in relation to this website.
        </p>

        <ol className="list-decimal pl-5">
          <li className="mb-2">
            <strong>Acceptance of Terms</strong>
            <p>
              By accessing and using this website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
            </p>
          </li>

          <li className="mb-2">
            <strong>Changes to Terms</strong>
            <p>
              We reserve the right to modify or revise these Terms of Service at any time. Your continued use of the website following any changes indicates your acceptance of the new terms.
            </p>
          </li>

          <li className="mb-2">
            <strong>Use of Website</strong>
            <p>
              This website is intended to provide information about our products and services. You may use this website for lawful purposes only.
            </p>
          </li>

          <li className="mb-2">
            <strong>Intellectual Property</strong>
            <p>
              The content, layout, design, data, graphics, and other materials on this website are protected by intellectual property laws and are owned by or licensed to us.
            </p>
          </li>

          <li className="mb-2">
            <strong>Limitation of Liability</strong>
            <p>
              We will not be liable for any damages or losses arising out of your use of this website.
            </p>
          </li>

          <li className="mb-2">
            <strong>Governing Law</strong>
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of [Your Jurisdiction].
            </p>
          </li>
        </ol>

        <p className="mt-4">
          If you have any questions about these Terms of Service, please contact us.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
