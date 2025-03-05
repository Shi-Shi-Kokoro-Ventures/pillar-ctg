
import React from "react";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, ChevronRight, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: About */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 bg-redcross mr-2 rounded"></div>
              <span className="text-2xl font-bold">Red Cross</span>
            </div>
            <p className="text-gray-400 mb-6">
              The American Red Cross prevents and alleviates human suffering in the face of emergencies by mobilizing the power of volunteers and the generosity of donors.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-redcross transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-redcross transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-redcross transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-redcross transition-colors duration-300">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-redcross transition-colors duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {["About Us", "Find Your Local Red Cross", "Training & Certification", "Ways to Donate", "Volunteer", "Careers"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white flex items-center transition-colors">
                    <ChevronRight className="h-4 w-4 mr-2 text-redcross" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Services</h3>
            <ul className="space-y-3">
              {["Blood Donation", "Disaster Relief", "Military Families", "Training Services", "International Services", "Missing Persons"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white flex items-center transition-colors">
                    <ChevronRight className="h-4 w-4 mr-2 text-redcross" />
                    {item}
                  </a>
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
                  American Red Cross National Headquarters<br />
                  431 18th Street, NW<br />
                  Washington, DC 20006
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-redcross" />
                <a href="tel:1-800-733-2767" className="text-gray-400 hover:text-white transition-colors">
                  1-800-RED-CROSS
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-redcross" />
                <a href="mailto:info@redcross.org" className="text-gray-400 hover:text-white transition-colors">
                  info@redcross.org
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
              © {new Date().getFullYear()} Red Cross. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Emergency Alert Bar */}
      <div className="bg-redcross py-3 px-4 text-white text-center">
        <div className="container mx-auto">
          <p className="text-sm">
            <strong>Emergency:</strong> Call 1-800-RED-CROSS for immediate assistance
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
