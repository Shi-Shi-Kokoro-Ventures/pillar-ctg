import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { 
  Accessibility as AccessibilityIcon, 
  Eye, 
  MousePointer2, 
  Text, 
  Info, 
  Settings, 
  ExternalLink 
} from "lucide-react";

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
        {/* Enhanced Security headers */}
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://qbzuocsgfkugpsahesay.supabase.co; form-action 'self'; base-uri 'self'; frame-ancestors 'self'" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains; preload" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=(), payment=(), usb=(), fullscreen=(self)" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Cache-Control" content="no-store, max-age=0" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col" role="document">
        <Navbar />
        
        <main className="flex-grow bg-gradient-to-b from-gray-50 to-gray-100" role="main" aria-labelledby="accessibility-title">
          <div className="container mx-auto py-12 px-4 max-w-6xl">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center justify-center p-2 bg-blue-50 rounded-full mb-4 animate-fade-in">
                <AccessibilityIcon className="h-8 w-8 text-redcross" />
              </div>
              <h1 
                id="accessibility-title" 
                className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-redcross-dark to-redcross-light"
                tabIndex={0}
              >
                Accessibility Statement
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our commitment to creating a digital experience that is accessible to everyone
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Quick Navigation */}
              <Card className="md:col-span-1 p-6 border-0 shadow-lg bg-white backdrop-blur-sm animate-slide-in">
                <nav 
                  aria-label="Page sections" 
                  className="sticky top-24"
                >
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2" tabIndex={0}>
                    <Settings className="h-5 w-5 text-redcross" />
                    Quick Navigation
                  </h2>
                  <ul className="space-y-3" role="list">
                    {[
                      { id: "commitment", title: "Our Commitment", icon: <Info className="h-4 w-4" /> },
                      { id: "conformance", title: "Conformance Status", icon: <Eye className="h-4 w-4" /> },
                      { id: "measures", title: "Measures Taken", icon: <Settings className="h-4 w-4" /> },
                      { id: "feedback", title: "Feedback", icon: <ExternalLink className="h-4 w-4" /> },
                      { id: "compatibility", title: "Compatibility", icon: <MousePointer2 className="h-4 w-4" /> }
                    ].map((section) => (
                      <li key={section.id} className="transition-all duration-200 hover:translate-x-1">
                        <Button
                          variant="ghost"
                          className="justify-start w-full group text-left font-medium"
                          onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
                          onKeyDown={(e) => handleKeyPress(e, section.id)}
                          aria-label={`Jump to ${section.title} section`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-redcross">{section.icon}</span>
                            <span className="group-hover:text-redcross transition-colors">{section.title}</span>
                          </span>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Card>

              <Card className="md:col-span-3 p-0 overflow-hidden border-0 shadow-lg bg-white backdrop-blur-sm rounded-xl">
                <ScrollArea className="h-[calc(100vh-220px)] p-8 rounded-xl">
                  <section id="commitment" className="mb-12 p-6 bg-gradient-to-r from-blue-50 to-transparent rounded-xl" aria-labelledby="commitment-title">
                    <h2 
                      id="commitment-title" 
                      className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2"
                      tabIndex={0}
                    >
                      <Info className="h-5 w-5 text-redcross" />
                      Our Commitment
                    </h2>
                    <div className="text-gray-700 space-y-4">
                      <p>
                        The P.I.L.L.A.R. Initiative is committed to ensuring digital accessibility for people with disabilities. 
                        We are continually improving the user experience for everyone, and applying the relevant accessibility standards.
                      </p>
                      <p>
                        We believe that the internet should be available and accessible to anyone, and are committed to providing a website that is accessible to the widest possible audience, regardless of circumstance or ability.
                      </p>
                    </div>
                  </section>
                  
                  <section id="conformance" className="mb-12 p-6 bg-gradient-to-r from-blue-50 to-transparent rounded-xl" aria-labelledby="conformance-title">
                    <h2 
                      id="conformance-title" 
                      className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2"
                      tabIndex={0}
                    >
                      <Eye className="h-5 w-5 text-redcross" />
                      Conformance Status
                    </h2>
                    <div className="text-gray-700 space-y-4">
                      <p>
                        The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve 
                        accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and 
                        Level AAA. Our website strives to conform to WCAG 2.1 level AA standards.
                      </p>
                      <p>
                        This commitment means we aim to ensure that our website is designed and developed so that people with disabilities can perceive, understand, navigate, and interact with it effectively.
                      </p>
                    </div>
                  </section>
                  
                  <section id="measures" className="mb-12 p-6 bg-gradient-to-r from-blue-50 to-transparent rounded-xl" aria-labelledby="measures-title">
                    <h2 
                      id="measures-title" 
                      className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2"
                      tabIndex={0}
                    >
                      <Settings className="h-5 w-5 text-redcross" />
                      Measures Taken
                    </h2>
                    <p className="text-gray-700 mb-4">We have taken the following measures to ensure accessibility:</p>
                    <div className="grid md:grid-cols-2 gap-4">
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
                        <div 
                          key={index} 
                          className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-2"
                        >
                          <div className="text-redcross flex-shrink-0 mt-0.5">✓</div>
                          <div>{measure}</div>
                        </div>
                      ))}
                    </div>
                  </section>
                  
                  <section id="feedback" className="mb-12 p-6 bg-gradient-to-r from-blue-50 to-transparent rounded-xl" aria-labelledby="feedback-title">
                    <h2 
                      id="feedback-title" 
                      className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2"
                      tabIndex={0}
                    >
                      <ExternalLink className="h-5 w-5 text-redcross" />
                      Feedback
                    </h2>
                    <p className="text-gray-700 mb-6">
                      We welcome your feedback on the accessibility of our website. Please let us know if you encounter any barriers:
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="p-6 bg-gray-50 border border-gray-100">
                        <h3 className="font-medium text-lg mb-3">Contact Information</h3>
                        <ul className="space-y-4" role="list">
                          <li className="flex items-center gap-3">
                            <div className="bg-redcross/10 p-2 rounded-full">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-redcross"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            </div>
                            <a 
                              href="tel:1-833-585-4273"
                              className="text-gray-700 hover:text-redcross transition-colors"
                              aria-label="Call us at 1-833-585-4273"
                            >
                              1(833) LVL-HARD (1-833-585-4273)
                            </a>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="bg-redcross/10 p-2 rounded-full flex-shrink-0 mt-0.5">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-redcross"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </div>
                            <a 
                              href="mailto:accessibility@pillarinitiativectg.org"
                              className="text-gray-700 hover:text-redcross transition-colors break-words word-break"
                              aria-label="Email us at accessibility@pillarinitiativectg.org"
                            >
                              accessibility@pillarinitiativectg.org
                            </a>
                          </li>
                          <li className="flex items-center gap-3">
                            <div className="bg-redcross/10 p-2 rounded-full">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-redcross"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            </div>
                            <address className="not-italic text-gray-700">
                              1201 Orange St #600, Wilmington, DE 19801
                            </address>
                          </li>
                        </ul>
                      </Card>
                      
                      <Card className="p-6 bg-gradient-to-br from-redcross/5 to-redcross/10 border border-redcross/20">
                        <h3 className="font-medium text-lg mb-3">Support Options</h3>
                        <p className="text-gray-700 mb-4">
                          Our accessibility support team is available Monday through Friday, 9:00 AM to 5:00 PM EST.
                        </p>
                        <Button>
                          Contact Support
                        </Button>
                      </Card>
                    </div>
                  </section>
                  
                  <section id="compatibility" className="mb-12 p-6 bg-gradient-to-r from-blue-50 to-transparent rounded-xl" aria-labelledby="compatibility-title">
                    <h2 
                      id="compatibility-title" 
                      className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2"
                      tabIndex={0}
                    >
                      <MousePointer2 className="h-5 w-5 text-redcross" />
                      Compatibility
                    </h2>
                    <p className="text-gray-700 mb-6">
                      Our website is designed to be compatible with the following assistive technologies:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        {
                          title: "Screen Readers",
                          description: "Compatible with NVDA, JAWS, and VoiceOver",
                          icon: <Text className="h-6 w-6" />
                        },
                        {
                          title: "Screen Magnifiers",
                          description: "Works with popular screen magnification tools",
                          icon: <Eye className="h-6 w-6" />
                        },
                        {
                          title: "Voice Recognition",
                          description: "Supports voice recognition software",
                          icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>
                        },
                        {
                          title: "Keyboard Navigation",
                          description: "Full support for keyboard-only users",
                          icon: <MousePointer2 className="h-6 w-6" />
                        }
                      ].map((item, index) => (
                        <div 
                          key={index} 
                          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center"
                        >
                          <div className="p-3 bg-redcross/10 rounded-full mb-4 text-redcross">
                            {item.icon}
                          </div>
                          <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <div 
                    className="mt-12 pt-6 border-t border-gray-200 text-center"
                    role="contentinfo"
                  >
                    <p 
                      className="text-gray-500 italic" 
                      aria-label="Statement last updated on March 11, 2024"
                    >
                      This statement was created on September 1, 2023 and was last updated on March 11, 2024.
                    </p>
                  </div>
                </ScrollArea>
              </Card>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Accessibility;
