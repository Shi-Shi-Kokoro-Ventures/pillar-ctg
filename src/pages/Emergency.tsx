
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone, MapPin, Clock, ExternalLink, Home, FileText, LifeBuoy, Siren, Shield, AlertCircle, Gamepad } from "lucide-react";
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
const delawareResources: ResourceLocation[] = [{
  id: 1,
  name: "Delaware Housing Assistance Program",
  category: "shelter",
  address: "18 The Green, Dover, DE 19901",
  phone: "1-833-585-4273",
  zipCode: "19901",
  city: "Dover",
  state: "DE",
  website: "https://www.delawarehousingassistance.org"
}, {
  id: 2,
  name: "Wilmington Community Health Center",
  category: "healthcare",
  address: "1001 N. Market St, Wilmington, DE 19801",
  phone: "1-833-585-4273",
  zipCode: "19801",
  city: "Wilmington",
  state: "DE",
  website: "https://www.wilmingtoncommunityhealth.org"
}, {
  id: 3,
  name: "Delaware Food Bank",
  category: "food",
  address: "222 Lake Dr, Newark, DE 19702",
  phone: "1-833-585-4273",
  zipCode: "19702",
  city: "Newark",
  state: "DE",
  website: "https://www.delfoodbank.org"
}, {
  id: 4,
  name: "Crisis Support Center of Delaware",
  category: "crisis",
  address: "500 Main St, Middletown, DE 19709",
  phone: "1-833-585-4273",
  zipCode: "19709",
  city: "Middletown",
  state: "DE",
  website: "https://www.delawarecrisis.org"
}, {
  id: 5,
  name: "New Castle County Shelter",
  category: "shelter",
  address: "400 N. Walnut St, Wilmington, DE 19801",
  phone: "1-833-585-4273",
  zipCode: "19801",
  city: "Wilmington",
  state: "DE",
  website: "https://www.delawareshelters.org"
}];

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
    const timers = [setTimeout(() => window.dispatchEvent(new Event('resize')), 300), setTimeout(() => window.dispatchEvent(new Event('resize')), 600), setTimeout(() => window.dispatchEvent(new Event('resize')), 1000)];
    return () => timers.forEach(timer => clearTimeout(timer));
  }, [isFullMapVisible]);

  // Force a resize event when the component mounts
  useEffect(() => {
    // Dispatch resize events with increasing delays to ensure map loads
    const timers = [setTimeout(() => window.dispatchEvent(new Event('resize')), 100), setTimeout(() => window.dispatchEvent(new Event('resize')), 500), setTimeout(() => window.dispatchEvent(new Event('resize')), 1000), setTimeout(() => window.dispatchEvent(new Event('resize')), 2000), setTimeout(() => window.dispatchEvent(new Event('resize')), 3000)];
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
      const results = delawareResources.filter(resource => resource.zipCode === zipCode || resource.zipCode.startsWith(zipCodePrefix));
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
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Navbar />
        <main className="flex-grow pt-16">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Emergency Resources Map</h2>
              <Button variant="outline" onClick={handleCloseFullMap} className="border-red-500 text-red-500 hover:bg-red-500/10">
                Back to Emergency Page
              </Button>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-md p-6 rounded-lg shadow-[0_0_20px_rgba(255,0,0,0.2)] border border-red-500/30">
              <InteractiveMap fullScreen={true} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-black text-white overflow-hidden">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Emergency Alert Banner with animated highlight effect */}
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_0%,_transparent_70%)]"></div>
          <div className="absolute inset-0">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="absolute h-px bg-red-400/30" style={{
                left: 0,
                right: 0,
                top: `${i * 33}%`,
                animation: `scanline ${3 + i}s linear infinite`,
                opacity: 0.6 - i * 0.15
              }} />
            ))}
          </div>
          <div className="container mx-auto px-4 py-4 flex items-center justify-center relative z-10">
            <Siren className="h-6 w-6 mr-3 animate-pulse text-white" />
            <p className="text-lg md:text-xl font-medium tracking-wide text-white">
              <span className="inline-block animate-pulse">If you are in immediate danger, call </span>
              <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-red-200 ml-1">911</span>
            </p>
          </div>
        </div>
        
        {/* Hero Section with cyberpunk styling */}
        <section className="relative py-16 overflow-hidden">
          {/* Dynamic background with animated grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.9),rgba(20,0,0,0.95))]">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(255, 0, 0, 0.03) 0%, transparent 70%), radial-gradient(circle at 20% 80%, rgba(255, 0, 0, 0.05) 0%, transparent 50%)'
            }}></div>
            
            {/* Cyberpunk grid lines */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(255, 0, 0, .3) 25%, rgba(255, 0, 0, .3) 26%, transparent 27%, transparent 74%, rgba(255, 0, 0, .3) 75%, rgba(255, 0, 0, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 0, 0, .3) 25%, rgba(255, 0, 0, .3) 26%, transparent 27%, transparent 74%, rgba(255, 0, 0, .3) 75%, rgba(255, 0, 0, .3) 76%, transparent 77%, transparent)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-red-100 to-red-200 animate-pulse-subtle md:text-6xl px-[10px]">
                Emergency Housing Assistance
              </h1>
              <p className="text-xl text-gray-300 mb-8 animate-fade-in leading-relaxed">
                If you or someone you know is experiencing a housing emergency or homelessness, 
                the <span className="text-red-400 font-semibold">P.I.L.L.A.R. Initiative CTG</span> can help connect you with immediate resources and support.
              </p>
              
              {/* Call hotline section with futuristic styling */}
              <div className="bg-black/70 backdrop-blur-xl p-8 rounded-lg shadow-[0_0_30px_rgba(255,0,0,0.2)] border border-red-500/40 mb-8 animate-scale-in relative overflow-hidden">
                {/* Circuit board pattern overlay */}
                <div className="absolute inset-0 opacity-5" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ff0000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                  backgroundSize: '100px 100px'
                }}></div>
                
                {/* Animated accent line */}
                <div className="absolute h-0.5 w-full left-0 top-0 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>
                <div className="absolute h-0.5 w-full left-0 bottom-0 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>
                
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mr-4 shrink-0 shadow-[0_0_15px_rgba(255,0,0,0.5)]">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-500">24/7 Housing Crisis Hotline</h2>
                    <p className="text-gray-300 mb-4 max-w-2xl">Our specialized emergency response team is available around the clock to provide immediate assistance, connect you with resources, and guide you through the housing crisis process.</p>
                    <a href="tel:1-833-585-4273" className="group inline-flex items-center">
                      <span className="relative text-3xl font-bold text-red-500 group-hover:text-red-400 transition-colors">
                        1-833-585-4273
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                      </span>
                      <span className="text-gray-400 text-lg ml-2">(1-833-LVL-HARD)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Services - Enhanced with high-tech cards */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(255, 0, 0, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255, 0, 0, 0.05) 0%, transparent 50%)'
          }}></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 relative inline-block mx-auto">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-white via-red-100 to-red-200">Emergency Services We Provide</span>
              <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Service 1 - Shelter */}
              <div className="bg-black/60 backdrop-blur-md rounded-lg p-8 border border-red-500/20 hover:border-red-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 group relative overflow-hidden shadow-[0_10px_20px_rgba(255,0,0,0.07)]">
                {/* Scanning line animation */}
                <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
                  <div className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-red-500 to-transparent top-0 -left-full group-hover:animate-[scan_3s_linear_infinite]"></div>
                </div>
                
                {/* Light edge effect */}
                <div className="absolute top-0 right-0 w-[1px] h-0 bg-red-500/50 group-hover:h-full transition-all duration-700 delay-300"></div>
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-red-500/50 group-hover:w-full transition-all duration-700 delay-150"></div>
                
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center mb-6 mx-auto shadow-[0_0_15px_rgba(255,0,0,0.2)] group-hover:shadow-[0_0_25px_rgba(255,0,0,0.4)] transition-all duration-500">
                  <Home className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center text-white group-hover:text-red-300 transition-colors duration-300">Emergency Shelter</h3>
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
                    <span className="text-gray-300 text-left">Multiple locations throughout Delaware</span>
                  </li>
                </ul>
                <Link to="/housing" className="w-full group">
                  <Button className="w-full bg-gradient-to-r from-red-800 to-red-600 hover:from-red-700 hover:to-red-500 text-white border border-red-500/30 group-hover:border-red-500/60 transition-all duration-300 relative overflow-hidden">
                    <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-30" style={{
                      background: 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.2) 50%, transparent 75%)',
                      backgroundSize: '250% 250%',
                      animation: 'shimmer 3s linear infinite'
                    }}></span>
                    <Home className="mr-2" /> Find Shelter
                  </Button>
                </Link>
              </div>
              
              {/* Service 2 - Eviction Prevention */}
              <div className="bg-black/60 backdrop-blur-md rounded-lg p-8 border border-red-500/20 hover:border-red-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 group relative overflow-hidden shadow-[0_10px_20px_rgba(255,0,0,0.07)]">
                {/* Scanning line animation */}
                <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
                  <div className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-red-500 to-transparent top-0 -left-full group-hover:animate-[scan_3s_linear_infinite]"></div>
                </div>
                
                {/* Light edge effect */}
                <div className="absolute top-0 right-0 w-[1px] h-0 bg-red-500/50 group-hover:h-full transition-all duration-700 delay-300"></div>
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-red-500/50 group-hover:w-full transition-all duration-700 delay-150"></div>
                
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center mb-6 mx-auto shadow-[0_0_15px_rgba(255,0,0,0.2)] group-hover:shadow-[0_0_25px_rgba(255,0,0,0.4)] transition-all duration-500">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center text-white group-hover:text-red-300 transition-colors duration-300">Eviction Prevention</h3>
                <p className="text-gray-300 mb-6 text-center">
                  Financial assistance and mediation services to help prevent eviction for households in crisis.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-left">Rapid response within 48 hours</span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-left">Services available throughout Delaware</span>
                  </li>
                </ul>
                <Link to="/apply-for-assistance" className="w-full group">
                  <Button className="w-full bg-gradient-to-r from-red-800 to-red-600 hover:from-red-700 hover:to-red-500 text-white border border-red-500/30 group-hover:border-red-500/60 transition-all duration-300 relative overflow-hidden">
                    <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-30" style={{
                      background: 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.2) 50%, transparent 75%)',
                      backgroundSize: '250% 250%',
                      animation: 'shimmer 3s linear infinite'
                    }}></span>
                    <FileText className="mr-2" /> Apply for Assistance
                  </Button>
                </Link>
              </div>
              
              {/* Service 3 - Crisis Support */}
              <div className="bg-black/60 backdrop-blur-md rounded-lg p-8 border border-red-500/20 hover:border-red-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 group relative overflow-hidden shadow-[0_10px_20px_rgba(255,0,0,0.07)]">
                {/* Scanning line animation */}
                <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
                  <div className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-red-500 to-transparent top-0 -left-full group-hover:animate-[scan_3s_linear_infinite]"></div>
                </div>
                
                {/* Light edge effect */}
                <div className="absolute top-0 right-0 w-[1px] h-0 bg-red-500/50 group-hover:h-full transition-all duration-700 delay-300"></div>
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-red-500/50 group-hover:w-full transition-all duration-700 delay-150"></div>
                
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center mb-6 mx-auto shadow-[0_0_15px_rgba(255,0,0,0.2)] group-hover:shadow-[0_0_25px_rgba(255,0,0,0.4)] transition-all duration-500">
                  <LifeBuoy className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center text-white group-hover:text-red-300 transition-colors duration-300">Crisis Support</h3>
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
                    <span className="text-gray-300 text-left">Phone and in-person support</span>
                  </li>
                </ul>
                <Link to="/housing-crisis-hotline" className="w-full group">
                  <Button className="w-full bg-gradient-to-r from-red-800 to-red-600 hover:from-red-700 hover:to-red-500 text-white border border-red-500/30 group-hover:border-red-500/60 transition-all duration-300 relative overflow-hidden">
                    <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-30" style={{
                      background: 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.2) 50%, transparent 75%)',
                      backgroundSize: '250% 250%',
                      animation: 'shimmer 3s linear infinite'
                    }}></span>
                    <LifeBuoy className="mr-2" /> Get Support
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Resource Map with high-tech UI */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 relative inline-block mx-auto">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-white via-red-100 to-red-200">Find Help Near You</span>
              <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></span>
            </h2>
            
            <div className="bg-black/60 backdrop-blur-md rounded-lg p-8 border border-red-500/20 shadow-[0_10px_20px_rgba(255,0,0,0.07)] max-w-4xl mx-auto">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-red-300">
                  Interactive Map & Resource Finder
                </h3>
                <p className="text-gray-300 mb-6">
                  Our advanced mapping feature is currently undergoing a cybernetic overhaul. 
                  While our developers are busy equipping it with enhanced capabilities, 
                  you can still search for emergency resources by ZIP code below. 
                  <span className="block mt-2 text-red-400 font-semibold">
                    The digital cartography upgrade is loading... Level up your patience stats!
                  </span>
                </p>
                
                <div className="mb-8">
                  <ZipCodeSearch onSearch={handleZipCodeSearch} />
                </div>
                
                <Button 
                  onClick={handleViewFullMap} 
                  className="mb-6 bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white"
                  disabled={true}
                >
                  <AlertCircle className="mr-2" /> View Full Resource Map (Coming Soon)
                </Button>
                
                <Link to="/community-resources" className="w-full max-w-md mx-auto mt-4 block">
                  <Button 
                    variant="outline" 
                    className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
                  >
                    <ExternalLink className="mr-2" /> Browse All Community Resources
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Emergency;
