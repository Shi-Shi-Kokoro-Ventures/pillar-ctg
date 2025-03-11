
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Accessibility = () => {
  return (
    <>
      <Helmet>
        <title>Accessibility Statement | P.I.L.L.A.R. Initiative</title>
        <meta name="description" content="Our commitment to making digital resources accessible to all individuals, including those with disabilities." />
        <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://qbzuocsgfkugpsahesay.supabase.co;" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">Accessibility Statement</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Commitment</h2>
            <p className="text-gray-700 mb-4">
              The P.I.L.L.A.R. Initiative is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone, and applying the relevant accessibility standards.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Conformance Status</h2>
            <p className="text-gray-700 mb-4">
              The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. Our website strives to conform to WCAG 2.1 level AA.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Measures Taken</h2>
            <p className="text-gray-700 mb-4">We've taken the following measures to ensure accessibility:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Include accessibility as part of our mission</li>
              <li>Integrate accessibility into our procurement procedures</li>
              <li>Provide accessibility training for our staff</li>
              <li>Assign clear accessibility goals and responsibilities</li>
              <li>Employ formal accessibility quality assurance methods</li>
              <li>Use appropriate heading structure to organize content</li>
              <li>Provide sufficient color contrast</li>
              <li>Ensure all interactive elements are keyboard accessible</li>
              <li>Provide descriptive alt text for images</li>
              <li>Implement responsive design for different devices and screen sizes</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Feedback</h2>
            <p className="text-gray-700 mb-4">
              We welcome your feedback on the accessibility of the P.I.L.L.A.R. Initiative website. Please let us know if you encounter accessibility barriers:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Phone: <a href="tel:1-833-585-4273" className="text-blue-600 hover:text-blue-800 transition-colors">1(833) LVL-HARD (1-833-585-4273)</a></li>
              <li>E-mail: <a href="mailto:accessibility@pillarinitiativectg.org" className="text-blue-600 hover:text-blue-800 transition-colors">accessibility@pillarinitiativectg.org</a></li>
              <li>Visitor address: 1201 Orange St #600, Wilmington, DE 19801</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Compatibility</h2>
            <p className="text-gray-700 mb-4">
              The P.I.L.L.A.R. Initiative website is designed to be compatible with the following assistive technologies:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Screen readers (including NVDA, JAWS, and VoiceOver)</li>
              <li>Screen magnifiers</li>
              <li>Voice recognition software</li>
              <li>Keyboard-only navigation</li>
            </ul>
          </section>
          
          <div className="mt-12 pt-6 border-t border-gray-200">
            <p className="text-gray-600 italic">
              This statement was created on September 1, 2023 and was last updated on August 9, 2024.
            </p>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Accessibility;
