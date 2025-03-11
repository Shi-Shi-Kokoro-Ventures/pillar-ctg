
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ZipCodeSearch from "@/components/ZipCodeSearch";
import InteractiveMap from "@/components/InteractiveMap";

const FindLocalOffice = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Find Your Local Office</h1>
          <p className="text-lg text-gray-600 mb-8">
            Enter your zip code or use the interactive map below to find the nearest P.I.L.L.A.R. Initiative office in your area.
          </p>
          
          {/* Zip Code Search Component */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Search by Zip Code</h2>
            <ZipCodeSearch />
          </div>
          
          {/* Interactive Map Component */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">View on Map</h2>
            <div className="h-[500px] rounded-lg overflow-hidden border border-gray-200">
              <InteractiveMap />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FindLocalOffice;
