
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ZipCodeSearch from "@/components/ZipCodeSearch";
import InteractiveMap from "@/components/InteractiveMap";
import { toast } from "sonner";

const FindLocalOffice = () => {
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showFullMap, setShowFullMap] = useState(false);

  const handleSearch = async (zipCode: string) => {
    // Set loading state
    setIsSearching(true);
    
    try {
      // Simulate API call to search for offices by zip code
      // In a real implementation, you would call an actual API here
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data - in a real app this would come from an API
      const mockResults = {
        nearestOffice: {
          name: "P.I.L.L.A.R. Initiative Delaware Office",
          address: "1201 Orange St #600, Wilmington, DE 19801",
          phone: "(833) 585-4273",
          email: "info@pillarinitiativectg.org",
          distance: "2.3 miles"
        }
      };
      
      setSearchResults(mockResults);
      toast.success(`Found office near ${zipCode}`);
    } catch (error) {
      toast.error("Error finding offices. Please try again.");
      console.error("Error finding offices:", error);
    } finally {
      setIsSearching(false);
    }
  };

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
            <ZipCodeSearch onSearch={handleSearch} isLoading={isSearching} />
            
            {/* Search Results */}
            {searchResults && (
              <div className="mt-6 p-6 bg-white rounded-lg shadow-md border border-gray-200 animate-in fade-in-50 duration-500">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Nearest Office</h3>
                <div className="space-y-2">
                  <p className="font-medium text-gray-900">{searchResults.nearestOffice.name}</p>
                  <p className="text-gray-600">{searchResults.nearestOffice.address}</p>
                  <p className="text-gray-600">
                    <span className="font-medium">Phone:</span> {searchResults.nearestOffice.phone}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Email:</span> {searchResults.nearestOffice.email}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Distance:</span> {searchResults.nearestOffice.distance}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    Office hours: Monday-Friday, 9:00 AM - 5:00 PM
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Interactive Map Component */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">View on Map</h2>
            <div className="h-[500px] rounded-lg overflow-hidden border border-gray-200">
              {showFullMap ? (
                <InteractiveMap 
                  initialLat={38.9072} 
                  initialLng={-77.0369} 
                  initialZoom={12} 
                  fullScreen={true} 
                />
              ) : (
                <InteractiveMap 
                  initialLat={38.9072} 
                  initialLng={-77.0369} 
                  initialZoom={12} 
                  fullScreen={false} 
                  onViewFullMap={() => setShowFullMap(true)} 
                />
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FindLocalOffice;
