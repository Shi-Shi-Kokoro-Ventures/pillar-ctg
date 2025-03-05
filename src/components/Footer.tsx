
import React from "react";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, ChevronRight, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: About */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <img src="/lovable-uploads/fb949545-3500-4403-9a6b-3532aa878cef.png" alt="Pillar Logo" className="h-12 mr-2" />
              <span className="text-2xl font-bold">Pillar</span>
            </div>
            <p className="text-gray-400 mb-6">
              The P.I.L.L.A.R. Initiative is changing the game, one home at a time. We're dedicated to ending homelessness through affordable housing solutions, support services, and community empowerment programs that build foundations for lasting independence.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="bg-gray-800 p-2 rounded-full hover:bg-redcross transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link to="#" className="bg-gray-800 p-2 rounded-full hover:bg-redcross transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link to="#" className="bg-gray-800 p-2 rounded-full hover:bg-redcross transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link to="#" className="bg-gray-800 p-2 rounded-full hover:bg-redcross transition-colors duration-300">
                <Youtube className="h-5 w-5" />
              </Link>
              <Link to="#" className="bg-gray-800 p-2 rounded-full hover:bg-redcross transition-colors duration-300">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", link: "/" },
                { name: "Find Your Local Office", link: "/all-ways" },
                { name: "Housing Programs", link: "/emergency" },
                { name: "Ways to Donate", link: "/donate" },
                { name: "Volunteer", link: "/volunteer" },
                { name: "Careers", link: "/volunteer" }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.link} className="text-gray-400 hover:text-white flex items-center transition-colors">
                    <ChevronRight className="h-4 w-4 mr-2 text-redcross" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Services</h3>
            <ul className="space-y-3">
              {[
                { name: "Transitional Housing", link: "/emergency" },
                { name: "Financial Education", link: "/classes" },
                { name: "Job Training", link: "/classes" },
                { name: "Mental Health Services", link: "/emergency" },
                { name: "Community Programs", link: "/all-ways" },
                { name: "Advocacy", link: "/advocate" }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.link} className="text-gray-400 hover:text-white flex items-center transition-colors">
                    <ChevronRight className="h-4 w-4 mr-2 text-redcross" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 mr-3 text-redcross shrink-0" />
                <span className="text-gray-400">
                  P.I.L.L.A.R. Initiative Headquarters<br />
                  431 Main Street<br />
                  Portland, OR 97205
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-redcross" />
                <a href="tel:1-800-733-2767" className="text-gray-400 hover:text-white transition-colors">
                  1-800-PILLAR
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-redcross" />
                <a href="mailto:info@pillar.org" className="text-gray-400 hover:text-white transition-colors">
                  info@pillar.org
                </a>
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
            <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
              <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="#" className="hover:text-white transition-colors">Accessibility</Link>
              <Link to="#" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Emergency Alert Bar */}
      <div className="bg-redcross py-3 px-4 text-white text-center">
        <div className="container mx-auto">
          <p className="text-sm">
            <strong>Housing Support:</strong> Call 1-800-PILLAR for immediate housing assistance
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
