
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ZipCodeSearch from "@/components/ZipCodeSearch";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, Info } from "lucide-react";

const FindLocalOffice = () => {
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (zipCode: string) => {
    setIsSearching(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Since we only have one office, always return the Delaware location
      const delawareOffice = {
        nearestOffice: {
          name: "P.I.L.L.A.R. Initiative Delaware Office",
          address: "1201 Orange St #600, Wilmington, DE 19801",
          phone: "(833) 585-4273",
          email: "info@pillarinitiativectg.org",
          distance: "Main Office"
        }
      };
      
      setSearchResults(delawareOffice);
      toast.success("Our Delaware office serves all locations");
    } catch (error) {
      toast.error("Error finding office. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Find Your Local Office</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our main office is located in Delaware, serving communities nationwide. Additional locations coming soon across the United States.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Search Section */}
              <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                  <Info className="h-6 w-6 mr-2 text-redcross" />
                  Find By Zip Code
                </h2>
                <p className="text-gray-600 mb-6">
                  Enter your zip code to find the nearest P.I.L.L.A.R. Initiative office location and available services.
                </p>
                <ZipCodeSearch onSearch={handleSearch} isLoading={isSearching} />
              </div>
              
              {/* Office Info Section */}
              <div className="lg:col-span-3">
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 h-full animate-in fade-in-50 duration-500">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Delaware Headquarters</h2>
                    <span className="bg-redcross/10 text-redcross px-3 py-1 rounded-full text-sm font-medium">Main Office</span>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-redcross mt-1 shrink-0" />
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">P.I.L.L.A.R. Initiative Delaware Office</p>
                        <p className="text-gray-600">1201 Orange St #600, Wilmington, DE 19801</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-redcross shrink-0" />
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">Phone Number</p>
                        <p className="text-gray-600">(833) 585-4273</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-redcross shrink-0" />
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-gray-600">info@pillarinitiativectg.org</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-redcross shrink-0" />
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">Office Hours</p>
                        <p className="text-gray-600">Monday-Friday, 9:00 AM - 5:00 PM</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="flex items-start">
                      <div className="bg-redcross/10 p-2 rounded-full">
                        <Info className="h-5 w-5 text-redcross" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">About This Office</p>
                        <p className="text-gray-600 mt-1">
                          Our Delaware headquarters serves as the central hub for all P.I.L.L.A.R. Initiative operations nationwide. 
                          Our team is dedicated to providing comprehensive support and resources to individuals and families in need.
                        </p>
                        <p className="text-blue-600 font-medium text-sm mt-3">
                          Additional locations coming soon across the United States
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Services Offered Section */}
            <div className="mt-12 bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Services Offered</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  "Housing Assistance",
                  "Family Support",
                  "Financial Education",
                  "Mental Health Resources",
                  "Job Training Programs",
                  "Community Outreach",
                  "Advocacy Services",
                  "Crisis Intervention"
                ].map((service, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-md border border-gray-100">
                    <p className="font-medium text-gray-900">{service}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FindLocalOffice;
