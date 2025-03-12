
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ZipCodeSearch from "@/components/ZipCodeSearch";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Building2, MapPin, Search, Shield, Home, ChevronRight, Database, ListFilter } from "lucide-react";
import { motion } from "framer-motion";

const Housing = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [resources, setResources] = useState<any[]>([]);
  const [zipCode, setZipCode] = useState<string | null>(null);

  const handleSearch = async (zip: string) => {
    setIsLoading(true);
    setZipCode(zip);

    // Simulate fetching resources based on zip code
    setTimeout(() => {
      const fakeResources = [
        { id: 1, name: "Shelter A", description: "Emergency shelter", zipCode: zip },
        { id: 2, name: "Food Bank B", description: "Provides food assistance", zipCode: zip },
      ];
      setResources(fakeResources);
      setIsLoading(false);

      if (fakeResources.length === 0) {
        toast.error("No resources found for this zip code.");
      } else {
        toast.success(`Found ${fakeResources.length} resources for zip code ${zip}`);
      }
    }, 1500);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative bg-blue-50 py-12 md:py-20 overflow-hidden">
          {/* Abstract geometric shapes in background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-redcross/5 rounded-full"
                style={{
                  width: `${Math.random() * 300 + 100}px`,
                  height: `${Math.random() * 300 + 100}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `scale(${Math.random() * 0.5 + 0.5})`,
                }}
              />
            ))}
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-3xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1 
                variants={fadeIn}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center text-gradient-primary"
              >
                Find Housing Resources
              </motion.h1>
              
              <motion.p 
                variants={fadeIn}
                className="text-lg md:text-xl text-gray-600 mb-8 text-center"
              >
                Enter your zip code to discover local housing resources and support services available in your area.
              </motion.p>
              
              <motion.div 
                variants={fadeIn}
                className="glass-card p-6 rounded-xl shadow-xl max-w-2xl mx-auto"
              >
                <div className="flex items-center mb-4">
                  <MapPin className="w-5 h-5 text-redcross mr-2" />
                  <h2 className="text-xl font-semibold">Location Search</h2>
                </div>
                <ZipCodeSearch onSearch={handleSearch} isLoading={isLoading} />
              </motion.div>
            </motion.div>
          </div>
          
          {/* Animated scan line */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute h-[2px] w-full bg-gradient-to-r from-transparent via-redcross/30 to-transparent top-0 animate-scan"></div>
          </div>
        </section>

        {/* Resources Found Section */}
        {resources.length > 0 && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex items-center mb-6">
                <Database className="w-5 h-5 text-redcross mr-2" />
                <h2 className="text-2xl font-bold">Resources Found</h2>
                <span className="ml-3 bg-redcross/10 text-redcross px-2.5 py-0.5 rounded-full text-sm font-medium">
                  {resources.length} Results
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((resource) => (
                  <motion.div 
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="neo-glass-card hover:shadow-redcross/10 group"
                  >
                    <div className="flex items-start">
                      <div className="bg-redcross/10 p-3 rounded-lg mr-4">
                        <Building2 className="h-6 w-6 text-redcross" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold group-hover:text-redcross transition-colors">{resource.name}</h3>
                        <p className="text-gray-600 mt-1">{resource.description}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>Zip Code: {resource.zipCode}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Additional Resources Section */}
        <section className="py-16 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-10">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-redcross/30"></div>
                <h2 className="text-2xl font-bold mx-4 text-center">Housing Programs</h2>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-redcross/30"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  className="group"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Button 
                    onClick={() => navigate("/housing-waitlist")} 
                    variant="outline" 
                    className="w-full h-auto py-6 px-5 flex items-center justify-between bg-white/80 backdrop-blur-sm border border-redcross/20 hover:border-redcross/50 hover:bg-redcross/5 shadow-md"
                  >
                    <div className="flex items-center">
                      <div className="bg-redcross/10 p-3 rounded-full mr-4">
                        <ListFilter className="h-5 w-5 text-redcross" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium text-lg">Housing Waitlist</h3>
                        <p className="text-sm text-gray-500">Join waitlists for affordable housing</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </motion.div>
                
                <motion.div 
                  className="group"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Button 
                    onClick={() => navigate("/affordable-housing")} 
                    variant="outline" 
                    className="w-full h-auto py-6 px-5 flex items-center justify-between bg-white/80 backdrop-blur-sm border border-redcross/20 hover:border-redcross/50 hover:bg-redcross/5 shadow-md"
                  >
                    <div className="flex items-center">
                      <div className="bg-redcross/10 p-3 rounded-full mr-4">
                        <Home className="h-5 w-5 text-redcross" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium text-lg">Affordable Housing</h3>
                        <p className="text-sm text-gray-500">Explore affordable housing options</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </motion.div>
                
                <motion.div 
                  className="group"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Button 
                    onClick={() => navigate("/rental-assistance")} 
                    variant="outline" 
                    className="w-full h-auto py-6 px-5 flex items-center justify-between bg-white/80 backdrop-blur-sm border border-redcross/20 hover:border-redcross/50 hover:bg-redcross/5 shadow-md"
                  >
                    <div className="flex items-center">
                      <div className="bg-redcross/10 p-3 rounded-full mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-redcross" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium text-lg">Rental Assistance</h3>
                        <p className="text-sm text-gray-500">Get help with rent payments</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </motion.div>
                
                <motion.div 
                  className="group"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Button 
                    onClick={() => navigate("/housing-vouchers")} 
                    variant="outline" 
                    className="w-full h-auto py-6 px-5 flex items-center justify-between bg-white/80 backdrop-blur-sm border border-redcross/20 hover:border-redcross/50 hover:bg-redcross/5 shadow-md"
                  >
                    <div className="flex items-center">
                      <div className="bg-redcross/10 p-3 rounded-full mr-4">
                        <Shield className="h-5 w-5 text-redcross" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium text-lg">Housing Vouchers</h3>
                        <p className="text-sm text-gray-500">Learn about housing subsidy programs</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </motion.div>
              </div>
              
              {/* New CTA Section */}
              <motion.div 
                className="mt-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-gradient-primary">Need Immediate Assistance?</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Our housing specialists are available to help you navigate your options
                  and find the right housing solutions for your specific situation.
                </p>
                <Button 
                  onClick={() => navigate("/housing-crisis-hotline")}
                  className="bg-gradient-to-r from-redcross to-redcross-light text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px] button-glow"
                >
                  Contact Housing Specialist
                </Button>
              </motion.div>
            </div>
          </div>
          
          {/* Background decorative elements */}
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-redcross/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute left-0 bottom-20 w-96 h-96 bg-redcross-light/5 rounded-full blur-3xl -z-10"></div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Housing;
