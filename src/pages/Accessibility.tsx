
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const Accessibility = () => {
  // Function to handle keyboard navigation for section links
  const handleKeyPress = (event: React.KeyboardEvent, sectionId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Accessibility Statement | P.I.L.L.A.R. Initiative</title>
        <meta name="description" content="Our commitment to making digital resources accessible to all individuals, including those with disabilities." />
        {/* Security headers */}
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://qbzuocsgfkugpsahesay.supabase.co;" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col" role="document">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl" role="main" aria-labelledby="accessibility-title">
          <h1 
            id="accessibility-title" 
            className="text-3xl md:text-4xl font-bold mb-8 text-gray-800"
            tabIndex={0}
          >
            Accessibility Statement
          </h1>
          
          {/* Quick Navigation */}
          <nav 
            aria-label="Page sections" 
            className="mb-8 p-4 bg-gray-50 rounded-lg"
          >
            <h2 className="text-xl font-semibold mb-4" tabIndex={0}>Quick Navigation</h2>
            <ul className="grid gap-2" role="list">
              {[
                { id: "commitment", title: "Our Commitment" },
                { id: "conformance", title: "Conformance Status" },
                { id: "measures", title: "Measures Taken" },
                { id: "feedback", title: "Feedback" },
                { id: "compatibility", title: "Compatibility" }
              ].map((section) => (
                <li key={section.id}>
                  <Button
                    variant="link"
                    className="text-left w-full"
                    onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
                    onKeyDown={(e) => handleKeyPress(e, section.id)}
                    aria-label={`Jump to ${section.title} section`}
                  >
                    {section.title}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          <ScrollArea className="h-[calc(100vh-300px)] rounded-md border p-4">
            <section id="commitment" className="mb-8" aria-labelledby="commitment-title">
              <h2 
                id="commitment-title" 
                className="text-2xl font-semibold mb-4 text-gray-800"
                tabIndex={0}
              >
                Our Commitment
              </h2>
              <p className="text-gray-700 mb-4">
                The P.I.L.L.A.R. Initiative is committed to ensuring digital accessibility for people with disabilities. 
                We are continually improving the user experience for everyone, and applying the relevant accessibility standards.
              </p>
            </section>
            
            <section id="conformance" className="mb-8" aria-labelledby="conformance-title">
              <h2 
                id="conformance-title" 
                className="text-2xl font-semibold mb-4 text-gray-800"
                tabIndex={0}
              >
                Conformance Status
              </h2>
              <p className="text-gray-700 mb-4">
                The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve 
                accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and 
                Level AAA. Our website strives to conform to WCAG 2.1 level AA standards.
              </p>
            </section>
            
            <section id="measures" className="mb-8" aria-labelledby="measures-title">
              <h2 
                id="measures-title" 
                className="text-2xl font-semibold mb-4 text-gray-800"
                tabIndex={0}
              >
                Measures Taken
              </h2>
              <ul 
                className="list-disc pl-6 mb-4 text-gray-700 space-y-2" 
                role="list"
                aria-label="List of accessibility measures"
              >
                {[
                  "Include accessibility throughout our mission",
                  "Integrate accessibility into procurement procedures",
                  "Provide accessibility training for staff",
                  "Assign clear accessibility goals and responsibilities",
                  "Employ formal accessibility quality assurance methods",
                  "Use appropriate heading structure",
                  "Provide sufficient color contrast",
                  "Ensure keyboard accessibility",
                  "Provide descriptive alt text for images",
                  "Implement responsive design"
                ].map((measure, index) => (
                  <li key={index} className="focus:outline-none focus:bg-gray-100 p-1 rounded">
                    {measure}
                  </li>
                ))}
              </ul>
            </section>
            
            <section id="feedback" className="mb-8" aria-labelledby="feedback-title">
              <h2 
                id="feedback-title" 
                className="text-2xl font-semibold mb-4 text-gray-800"
                tabIndex={0}
              >
                Feedback
              </h2>
              <p className="text-gray-700 mb-4">
                We welcome your feedback on the accessibility of our website. Please let us know if you encounter any barriers:
              </p>
              <ul className="list-none space-y-2" role="list">
                <li>
                  <a 
                    href="tel:1-833-585-4273"
                    className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                    aria-label="Call us at 1-833-585-4273"
                  >
                    Phone: 1(833) LVL-HARD (1-833-585-4273)
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:accessibility@pillarinitiativectg.org"
                    className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                    aria-label="Email us at accessibility@pillarinitiativectg.org"
                  >
                    Email: accessibility@pillarinitiativectg.org
                  </a>
                </li>
                <li>
                  <address className="not-italic">
                    Address: 1201 Orange St #600, Wilmington, DE 19801
                  </address>
                </li>
              </ul>
            </section>
            
            <section id="compatibility" className="mb-8" aria-labelledby="compatibility-title">
              <h2 
                id="compatibility-title" 
                className="text-2xl font-semibold mb-4 text-gray-800"
                tabIndex={0}
              >
                Compatibility
              </h2>
              <p className="text-gray-700 mb-4">
                Our website is designed to be compatible with the following assistive technologies:
              </p>
              <ul 
                className="list-disc pl-6 mb-4 text-gray-700 space-y-2" 
                role="list"
                aria-label="List of compatible assistive technologies"
              >
                <li>Screen readers (NVDA, JAWS, and VoiceOver)</li>
                <li>Screen magnifiers</li>
                <li>Voice recognition software</li>
                <li>Keyboard-only navigation</li>
              </ul>
            </section>

            <div 
              className="mt-12 pt-6 border-t border-gray-200"
              role="contentinfo"
            >
              <p 
                className="text-gray-600 italic" 
                aria-label="Statement last updated on March 11, 2024"
              >
                This statement was created on September 1, 2023 and was last updated on March 11, 2024.
              </p>
            </div>
          </ScrollArea>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Accessibility;
