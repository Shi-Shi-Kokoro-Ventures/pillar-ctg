
import React, { useState, useEffect } from "react";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, ChevronRight, Mail, Phone, MapPin, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const [accessibilityVisible, setAccessibilityVisible] = useState(false);
  
  useEffect(() => {
    // Check if accessibility features were previously enabled
    const savedVisibility = localStorage.getItem('accessibility_visible');
    setAccessibilityVisible(savedVisibility === 'true');
  }, []);
  
  const toggleAccessibility = () => {
    const newVisibility = !accessibilityVisible;
    setAccessibilityVisible(newVisibility);
    localStorage.setItem('accessibility_visible', newVisibility.toString());

    // Trigger an event so AccessibilityControls component can react to this change
    const event = new CustomEvent('accessibilityToggled', {
      detail: {
        visible: newVisibility
      }
    });
    window.dispatchEvent(event);
  };

  return <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: About */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-8">
              <img alt="Pillar Logo" src="/lovable-uploads/59f06ce4-9233-4601-a6b4-3f158c46293b.png" className="h-12 mr-3 object-cover" />
              <span className="text-2xl font-bold text-white">Pillar</span>
            </div>
            <p className="text-gray-300 mb-8 leading-relaxed">
              The P.I.L.L.A.R. Initiative is changing the game, one home at a time. We're dedicated to ending homelessness through affordable housing solutions, support services, and community empowerment programs that build foundations for lasting independence.
            </p>
            <div className="flex space-x-4">
              <SocialLink Icon={Facebook} href="#" />
              <SocialLink Icon={Twitter} href="#" />
              <SocialLink Icon={Instagram} href="#" />
              <SocialLink Icon={Youtube} href="#" />
              <SocialLink Icon={Linkedin} href="#" />
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-3">
              {[{
              name: "About Us",
              link: "/our-mission"
            }, {
              name: "Find Your Local Office",
              link: "/find-local-office"
            }, {
              name: "Housing Programs",
              link: "/housing"
            }, {
              name: "Ways to Donate",
              link: "/donate"
            }, {
              name: "Volunteer",
              link: "/volunteer"
            }, {
              name: "Careers",
              link: "/careers"
            }].map(item => <FooterLink key={item.name} name={item.name} link={item.link} />)}
            </ul>
          </div>
          
          {/* Column 3: Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-b border-gray-700 pb-2">Services</h3>
            <ul className="space-y-3">
              {[{
              name: "Transitional Housing",
              link: "/affordable-housing"
            }, {
              name: "Financial Education",
              link: "/financial-literacy"
            }, {
              name: "Job Training",
              link: "/job-training"
            }, {
              name: "Mental Health Services",
              link: "/mental-health"
            }, {
              name: "Community Programs",
              link: "/community-events"
            }, {
              name: "Advocacy",
              link: "/advocate"
            }].map(item => <FooterLink key={item.name} name={item.name} link={item.link} />)}
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 mr-3 text-redcross shrink-0 mt-1" />
                <span className="text-gray-300">
                  P.I.L.L.A.R. Initiative Headquarters<br />
                  1201 Orange St #600<br />
                  Wilmington, DE 19801
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-redcross shrink-0" />
                <a href="tel:1-833-585-4273" className="text-gray-300 hover:text-white transition-colors">
                  <span className="font-semibold">1(833) LVL-HARD</span> <span className="text-sm text-gray-400">(1-833-585-4273)</span>
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-redcross shrink-0" />
                <a href="mailto:info@pillarinitiativectg.org" className="text-gray-300 hover:text-white transition-colors">
                  info@pillarinitiativectg.org
                </a>
              </li>
              <li className="flex items-center mt-5">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleAccessibility} 
                  aria-label={accessibilityVisible ? "Disable accessibility features" : "Enable accessibility features"} 
                  className="flex items-center gap-1.5 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg"
                >
                  <Settings className="h-4 w-4" />
                  <span className="text-xs font-medium">
                    {accessibilityVisible ? "Accessibility On" : "Accessibility"}
                  </span>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} P.I.L.L.A.R. Initiative. All rights reserved. 501(c)(3) Nonprofit Organization.
            </div>
            <div className="flex flex-wrap gap-6 text-gray-400 text-sm">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/donor-rights" className="hover:text-white transition-colors">Donor Rights</Link>
              <Link to="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Emergency Alert Bar */}
      <div className="bg-redcross py-3 px-4 text-white">
        <div className="container mx-auto">
          <p className="text-sm font-medium text-center">
            <strong>Housing Support:</strong> Call <a href="tel:1-833-585-4273" className="underline hover:no-underline">
              <span className="font-semibold">1(833) LVL-HARD</span> <span className="text-sm">(1-833-585-4273)</span>
            </a> for immediate housing assistance
          </p>
        </div>
      </div>
    </footer>;
};

// Helper components to reduce repetition and improve maintainability
const SocialLink = ({
  Icon,
  href
}) => <Link to={href} className="bg-gray-800 p-2 rounded-full hover:bg-redcross transition-colors duration-300">
    <Icon className="h-5 w-5" />
  </Link>;
const FooterLink = ({
  name,
  link
}) => <li>
    <Link to={link} className="text-gray-300 hover:text-white flex items-center transition-colors">
      <ChevronRight className="h-4 w-4 mr-2 text-redcross" />
      {name}
    </Link>
  </li>;
export default Footer;
