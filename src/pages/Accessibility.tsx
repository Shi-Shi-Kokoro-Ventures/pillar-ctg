
import React from "react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Eye, Volume2, MousePointer, FileText, Cpu, Languages, HeartHandshake, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Accessibility = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center mb-4 p-3 rounded-full bg-blue-50">
              <svg className="h-8 w-8 text-redcross" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              Accessibility Commitment
            </h1>
            <p className="mx-auto max-w-2xl text-gray-600 text-lg">
              Our mission to support everyone facing housing insecurity includes making our digital services accessible to all individuals, regardless of ability.
            </p>
          </div>
          
          {/* Our Commitment Card */}
          <div className="glass p-8 rounded-xl shadow-lg border border-gray-100 bg-white/80 backdrop-blur-sm mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Commitment to Accessibility</h2>
            <p className="text-gray-700 leading-relaxed">
              The P.I.L.L.A.R. Initiative is committed to ensuring digital accessibility for people with disabilities. 
              We are continually improving the user experience for everyone, and applying the relevant accessibility standards.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards, which define 
              requirements for designers and developers to improve accessibility for people with disabilities. By adhering to 
              these guidelines, we aim to make our content more accessible to a wider range of people with disabilities, 
              including blindness and low vision, deafness and hearing loss, limited movement, speech disabilities, 
              photosensitivity, and combinations of these.
            </p>
          </div>
          
          {/* Accessibility Features */}
          <div className="bg-gradient-to-br from-blue-50/70 to-white p-8 rounded-xl border border-blue-100 shadow-lg my-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
              Accessibility Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Eye className="h-8 w-8 text-redcross" />,
                  title: "Visual Adaptations",
                  description: "Our site supports screen readers, offers text resizing, and maintains high contrast ratios for better readability."
                },
                {
                  icon: <Volume2 className="h-8 w-8 text-redcross" />,
                  title: "Audio Assistance",
                  description: "Media content includes captions and transcripts. Our contact center is equipped to assist those with hearing impairments."
                },
                {
                  icon: <MousePointer className="h-8 w-8 text-redcross" />,
                  title: "Navigation Support",
                  description: "Full keyboard navigation functionality and clear focus states help users navigate without a mouse."
                },
                {
                  icon: <FileText className="h-8 w-8 text-redcross" />,
                  title: "Clear Content",
                  description: "We use plain language, consistent layouts, and descriptive alt text for images."
                },
                {
                  icon: <Cpu className="h-8 w-8 text-redcross" />,
                  title: "Technical Standards",
                  description: "Our website is built following WCAG 2.1 Level AA compliance guidelines and best practices."
                },
                {
                  icon: <Languages className="h-8 w-8 text-redcross" />,
                  title: "Language Support",
                  description: "Content is available in multiple languages through translation services to serve our diverse community."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-redcross/20">
                  <div className="bg-redcross/10 p-3 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Accessibility Support */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 my-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100 flex items-center">
              <HeartHandshake className="h-6 w-6 text-redcross mr-3" />
              Accessibility Help
            </h2>
            <p className="text-gray-700 mb-6">
              If you encounter any accessibility barriers on our website or need assistance with accessing information, 
              please don't hesitate to contact us. Our team is here to help provide alternative formats or assistance 
              navigating our services.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="font-bold text-lg mb-3 flex items-center">
                  <Phone className="h-5 w-5 text-redcross mr-2" />
                  Contact by Phone
                </h3>
                <p className="text-gray-600 mb-4">
                  Our accessibility support team is available Monday through Friday, 9am to 5pm ET. We can provide assistance 
                  over the phone or arrange for alternative communication methods.
                </p>
                <a href="tel:1-833-585-4273" className="text-redcross hover:underline font-medium flex items-center">
                  Call 1-833-LVL-HARD (1-833-585-4273)
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="font-bold text-lg mb-3 flex items-center">
                  <Mail className="h-5 w-5 text-redcross mr-2" />
                  Contact by Email
                </h3>
                <p className="text-gray-600 mb-4">
                  Send us your accessibility questions, feedback, or requests for alternative formats. We aim to respond to all 
                  inquiries within 2 business days.
                </p>
                <a href="mailto:accessibility@pillarinitiativectg.org" className="text-redcross hover:underline font-medium flex items-center">
                  accessibility@pillarinitiativectg.org
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Button asChild className="px-8">
                <Link to="/contact-us">
                  Visit Our Contact Page
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Feedback Section */}
          <div className="bg-gradient-to-br from-redcross-light/10 to-blue-50/70 p-8 rounded-xl border border-blue-100 shadow-lg my-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              We Welcome Your Feedback
            </h2>
            <p className="text-center text-gray-700 max-w-3xl mx-auto mb-8">
              We are continuously working to improve the accessibility of our website and services. Your feedback helps us 
              identify areas where we can enhance our accessibility efforts.
            </p>
            <div className="flex justify-center">
              <Button asChild variant="outline" className="px-8">
                <Link to="/contact-us">
                  Send Accessibility Feedback
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Compliance Statement */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 my-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
              Accessibility Compliance Statement
            </h2>
            <p className="text-gray-700 mb-4">
              P.I.L.L.A.R. Initiative is committed to ensuring digital accessibility for people with disabilities. We are 
              continually improving the user experience for everyone, and applying the relevant accessibility standards.
            </p>
            <p className="text-gray-700 mb-4">
              We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. These guidelines explain 
              how to make web content more accessible for people with disabilities, and more user-friendly for everyone.
            </p>
            <p className="text-gray-700 mb-4">
              The guidelines have three levels of accessibility (A, AA and AAA). We've chosen Level AA as our target. As we 
              work toward this compliance target, known accessibility issues are documented and prioritized for resolution.
            </p>
            <div className="bg-gray-50 p-4 rounded-md mt-6">
              <p className="text-gray-600 text-sm">
                This statement was last updated on {new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Accessibility;
