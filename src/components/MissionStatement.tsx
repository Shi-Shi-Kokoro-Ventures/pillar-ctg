
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
              <img 
                src="https://images.unsplash.com/photo-1643321945941-2f787077a5de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                alt="Red Cross Volunteers" 
                className="rounded-lg shadow-xl relative z-10 object-cover w-full h-[500px]"
              />
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
                The American Red Cross prevents and alleviates human suffering in the face of emergencies by mobilizing the power of volunteers and the generosity of donors.
              </p>
              
              <blockquote className="pl-4 border-l-4 border-redcross italic">
                "The Red Cross is not just an emergency response organization. We're in communities every day, helping people prepare for and recover from emergencies."
              </blockquote>
              
              <p>
                For more than 140 years, we've dedicated ourselves to humanitarian service, providing relief to victims of disaster, supporting service members and their families, teaching lifesaving skills, collecting and distributing blood, and more.
              </p>
              
              <div className="pt-4">
                <a 
                  href="#learn-more" 
                  className="inline-flex items-center text-redcross hover:text-redcross-dark font-medium transition-colors"
                >
                  Learn more about our history
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
