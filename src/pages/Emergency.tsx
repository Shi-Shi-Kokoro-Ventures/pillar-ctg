
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Clock, 
  ExternalLink, 
  Home, 
  FileText, 
  LifeBuoy, 
  Siren,
  Shield,
  AlertCircle
} from "lucide-react";
import InteractiveMap from "@/components/InteractiveMap";
import ZipCodeSearch from "@/components/ZipCodeSearch";
import { toast } from "sonner";

// Resource location interface
interface ResourceLocation {
  id: number;
  name: string;
  category: "shelter" | "healthcare" | "food" | "crisis";
  address: string;
  phone: string;
  zipCode: string;
  city: string;
  state: string;
  website: string;
}

// Delaware resource locations
const delawareResources: ResourceLocation[] = [
  {
    id: 1,
    name: "Delaware Housing Assistance Program",
    category: "shelter",
    address: "18 The Green, Dover, DE 19901",
    phone: "1-833-585-4273",
    zipCode: "19901",
    city: "Dover",
    state: "DE",
    website: "https://www.delawarehousingassistance.org"
  },
  {
    id: 2,
    name: "Wilmington Community Health Center",
    category: "healthcare",
    address: "1001 N. Market St, Wilmington, DE 19801",
    phone: "1-833-585-4273",
    zipCode: "19801",
    city: "Wilmington",
    state: "DE",
    website: "https://www.wilmingtoncommunityhealth.org"
  },
  {
    id: 3,
    name: "Delaware Food Bank",
    category: "food",
    address: "222 Lake Dr, Newark, DE 19702",
    phone: "1-833-585-4273",
    zipCode: "19702",
    city: "Newark",
    state: "DE",
    website: "https://www.delfoodbank.org"
  },
  {
    id: 4,
    name: "Crisis Support Center of Delaware",
    category: "crisis",
    address: "500 Main St, Middletown, DE 19709",
    phone: "1-833-585-4273",
    zipCode: "19709",
    city: "Middletown",
    state: "DE",
    website: "https://www.delawarecrisis.org"
  },
  {
    id: 5,
    name: "New Castle County Shelter",
    category: "shelter",
    address: "400 N. Walnut St, Wilmington, DE 19801",
    phone: "1-833-585-4273",
    zipCode: "19801",
    city: "Wilmington",
    state: "DE",
    website: "https://www.delawareshelters.org"
  }
];

const Emergency = () => {
  const [isFullMapVisible, setIsFullMapVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [filteredResources, setFilteredResources] = useState<ResourceLocation[]>(delawareResources);
  const [searchedZipCode, setSearchedZipCode] = useState<string | null>(null);
  
  // Toggle full map view
  const handleViewFullMap = () => {
    setIsFullMapVisible(true);
    // Force resize events after state change
    setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
    setTimeout(() => window.dispatchEvent(new Event('resize')), 500);
    setTimeout(() => window.dispatchEvent(new Event('resize')), 1000);
  };
  
  // Return to normal view
  const handleCloseFullMap = () => {
    setIsFullMapVisible(false);
    // Force resize events after state change
    setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
    setTimeout(() => window.dispatchEvent(new Event('resize')), 500);
    setTimeout(() => window.dispatchEvent(new Event('resize')), 1000);
  };
  
  // Re-render map on layout change and force a resize
  useEffect(() => {
    // Give the layout time to adjust before forcing a resize event
    const timers = [
      setTimeout(() => window.dispatchEvent(new Event('resize')), 300),
      setTimeout(() => window.dispatchEvent(new Event('resize')), 600),
      setTimeout(() => window.dispatchEvent(new Event('resize')), 1000),
    ];
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, [isFullMapVisible]);

  // Force a resize event when the component mounts
  useEffect(() => {
    // Dispatch resize events with increasing delays to ensure map loads
    const timers = [
      setTimeout(() => window.dispatchEvent(new Event('resize')), 100),
      setTimeout(() => window.dispatchEvent(new Event('resize')), 500),
      setTimeout(() => window.dispatchEvent(new Event('resize')), 1000),
      setTimeout(() => window.dispatchEvent(new Event('resize')), 2000),
      setTimeout(() => window.dispatchEvent(new Event('resize')), 3000),
    ];
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);
  
  // Handle ZIP code search
  const handleZipCodeSearch = (zipCode: string) => {
    setIsSearching(true);
    setSearchedZipCode(zipCode);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // For demo purposes, we'll filter based on exact match or first 2 digits
      const zipCodePrefix = zipCode.substring(0, 2);
      const results = delawareResources.filter(
        resource => resource.zipCode === zipCode || resource.zipCode.startsWith(zipCodePrefix)
      );
      
      if (results.length > 0) {
        setFilteredResources(results);
        toast.success(`Found ${results.length} resources near ${zipCode}`);
      } else {
        // If no results, show all Delaware resources
        setFilteredResources(delawareResources);
        toast.info("No exact matches found. Showing all Delaware resources.");
      }
      
      setIsSearching(false);
    }, 1000);
  };
  
  // If full map is visible, show only that
  if (isFullMapVisible) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-900 text-white">
        <Navbar />
        <main className="flex-grow pt-16">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Emergency Resources Map</h2>
              <Button 
                variant="outline" 
                onClick={handleCloseFullMap}
                className="border-red-500 text-red-500 hover:bg-red-500/10"
              >
                Back to Emergency Page
              </Button>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
              <InteractiveMap fullScreen={true} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Emergency Alert Banner - Kept as requested but enhanced */}
        <div className="bg-red-600 text-white py-4 relative overflow-hidden animate-pulse-subtle">
          <div className="absolute inset-0 bg-gradient-to-r from-red-700/30 to-transparent"></div>
          <div className="container mx-auto px-4 flex items-center justify-center relative z-10">
            <Siren className="h-6 w-6 mr-3 animate-pulse" />
            <p className="text-lg font-medium tracking-wide">If you are in immediate danger, call 911</p>
          </div>
        </div>
        
        {/* Hero Section - Enhanced with futuristic styling */}
        <section className="bg-gradient-to-b from-gray-900 to-gray-800 py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-600/10 via-transparent to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-glow">Emergency Housing Assistance</h1>
              <p className="text-xl text-gray-300 mb-8 animate-fade-in">
                If you or someone you know is experiencing a housing emergency or homelessness, 
                the P.I.L.L.A.R. Initiative can help connect you with immediate resources and support.
              </p>
              <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg shadow-[0_0_15px_rgba(234,56,76,0.3)] border border-red-500/30 mb-8 animate-scale-in neo-glass">
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-red-500 flex items-center justify-center mr-4 shrink-0 animate-pulse">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2 gradient-text">24/7 Housing Crisis Hotline</h2>
                    <p className="text-gray-300 mb-4">Our trained staff is available around the clock to provide assistance and information.</p>
                    <a href="tel:1-833-585-4273" className="group inline-block">
                      <span className="text-2xl font-bold text-red-500 group-hover:underline">1-833-585-4273</span>
                      <span className="text-gray-400 text-lg ml-2">(1-833-LVL-HARD)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Services - Enhanced with cards */}
        <section className="py-16 bg-gray-800 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700/50 to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl font-bold text-center mb-12 text-glow">Emergency Services We Provide</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="bg-gray-800/80 backdrop-blur-md rounded-lg shadow-[0_5px_15px_rgba(0,0,0,0.3)] p-8 border border-gray-700 hover:border-red-500/50 transition-all duration-300 hover:transform hover:-translate-y-2 neo-glass">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-6 mx-auto">
                  <Home className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">Emergency Shelter</h3>
                <p className="text-gray-300 mb-6 text-center">
                  Immediate temporary housing for individuals and families facing homelessness or unsafe living conditions.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-300">Available 24/7</span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-300">Multiple locations throughout Delaware</span>
                  </li>
                </ul>
                <Link to="/housing" className="w-full">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white button-border-light">
                    <Home className="mr-2" /> Find Shelter
                  </Button>
                </Link>
              </div>
              
              {/* Service 2 */}
              <div className="bg-gray-800/80 backdrop-blur-md rounded-lg shadow-[0_5px_15px_rgba(0,0,0,0.3)] p-8 border border-gray-700 hover:border-red-500/50 transition-all duration-300 hover:transform hover:-translate-y-2 neo-glass">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-6 mx-auto">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">Eviction Prevention</h3>
                <p className="text-gray-300 mb-6 text-center">
                  Financial assistance and mediation services to help prevent eviction for households in crisis.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-300">Rapid response within 48 hours</span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-300">Services available throughout Delaware</span>
                  </li>
                </ul>
                <Link to="/apply-for-assistance" className="w-full">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white button-border-light">
                    <FileText className="mr-2" /> Apply for Assistance
                  </Button>
                </Link>
              </div>
              
              {/* Service 3 */}
              <div className="bg-gray-800/80 backdrop-blur-md rounded-lg shadow-[0_5px_15px_rgba(0,0,0,0.3)] p-8 border border-gray-700 hover:border-red-500/50 transition-all duration-300 hover:transform hover:-translate-y-2 neo-glass">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-6 mx-auto">
                  <LifeBuoy className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">Crisis Support</h3>
                <p className="text-gray-300 mb-6 text-center">
                  Mental health resources, case management, and support services for individuals experiencing housing instability.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-300">Available 24/7</span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-300">Phone and in-person support</span>
                  </li>
                </ul>
                <Link to="/housing-crisis-hotline" className="w-full">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white button-border-light">
                    <LifeBuoy className="mr-2" /> Get Support
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Resource Map - Enhanced with futuristic design */}
        <section className="py-16 bg-gradient-to-b from-gray-800 to-gray-900 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-red-600/5 via-transparent to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl font-bold text-center mb-12 text-glow">Find Help Near You</h2>
            
            <div className="bg-gray-800/80 backdrop-blur-md p-8 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.3)] max-w-4xl mx-auto border border-gray-700 neo-glass">
              <div className="mb-6">
                <ZipCodeSearch onSearch={handleZipCodeSearch} isLoading={isSearching} />
              </div>
              <div className="border border-gray-700 rounded-lg overflow-hidden">
                <InteractiveMap onViewFullMap={handleViewFullMap} />
              </div>
              <p className="text-gray-300 mt-6 mb-6">
                Use our interactive map to find emergency housing resources in your area, 
                including shelters, food banks, healthcare facilities, and other support services.
              </p>
            </div>
          </div>
        </section>
        
        {/* Community Resources - Enhanced with modern cards */}
        <section className="py-16 bg-gray-900 relative">
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl font-bold text-center mb-8 text-glow">Community Resources</h2>
            
            {searchedZipCode && (
              <p className="text-center text-gray-300 mb-8 animate-fade-in">
                {filteredResources.length > 0 
                  ? `Showing resources near zip code ${searchedZipCode}`
                  : `No resources found for zip code ${searchedZipCode}. Showing all Delaware resources.`
                }
              </p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {filteredResources.map(resource => (
                <div key={resource.id} className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg shadow-md border border-gray-700 hover:border-red-500/30 transition-all duration-300 animate-slide-in neo-glass">
                  <h3 className="text-xl font-bold mb-3 flex items-center text-white">
                    <MapPin className="h-5 w-5 text-red-500 mr-2" />
                    {resource.name}
                  </h3>
                  <p className="text-gray-300 mb-2">{resource.address}</p>
                  <p className="text-gray-300 mb-4">{resource.city}, {resource.state} {resource.zipCode}</p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-red-500 mr-2" />
                      <a href={`tel:${resource.phone.replace(/[^0-9]/g, '')}`} className="group">
                        <span className="font-medium text-gray-200">{resource.phone}</span>
                      </a>
                    </div>
                    <div className="flex items-center">
                      <ExternalLink className="h-4 w-4 text-red-500 mr-2" />
                      <a href={resource.website} className="text-red-400 hover:text-red-300 hover:underline" target="_blank" rel="noreferrer">
                        {resource.website.replace(/^https?:\/\/(www\.)?/i, '')}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Emergency Preparation - Enhanced with visual appeal */}
        <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-600/10 via-transparent to-transparent"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl font-bold mb-6 text-glow">Know Before You Need Help</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Take steps now to prepare for potential housing emergencies. Download our emergency housing guide 
              and keep important resources handy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-red-600 hover:bg-red-700 text-white button-border-light">
                Download Emergency Guide
              </Button>
              <Button variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10 button-cyberpunk">
                Sign Up for Alert Notifications
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Emergency;
