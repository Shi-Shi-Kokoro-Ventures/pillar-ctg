
import React from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

const MissionStatement = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Image Side */}
          <div 
            ref={ref} 
            className={cn(
              "w-full lg:w-1/2 mb-10 lg:mb-0 transition-all duration-1000",
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
            )}
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-redcross/10 rounded-full"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-redcross/10 rounded-full"></div>
              
              {/* PILLAR logo image */}
              <div className="relative w-full shadow-xl rounded-lg overflow-hidden z-10">
                <img 
                  src="/lovable-uploads/edfffd3f-0692-4cf0-8f35-98a3309fc707.png" 
                  alt="PILLAR Initiative Logo"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
          
          {/* Text Side */}
          <div 
            className={cn(
              "w-full lg:w-1/2 lg:pl-16 transition-all duration-1000",
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
            )}
          >
            <h2 className="text-3xl font-bold mb-6">
              <span className="text-redcross">Our Mission</span> and Vision
            </h2>
            
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                The P.I.L.L.A.R. Initiative is dedicated to ending homelessness through sustainable housing solutions, comprehensive support services, and community empowerment programs.
              </p>
              
              <blockquote className="pl-4 border-l-4 border-redcross italic">
                "We believe that secure housing is the foundation for rebuilding lives and creating pathways to long-term independence and dignity."
              </blockquote>
              
              <p>
                Our approach includes plans for transitional housing, financial literacy education, job training, mental health resources, and community-building programs that address the root causes of housing insecurity.
              </p>
              
              <div className="pt-4">
                <a 
                  href="/our-mission" 
                  className="inline-flex items-center text-redcross hover:text-redcross-dark font-medium transition-colors"
                >
                  Learn more about our approach
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionStatement;
