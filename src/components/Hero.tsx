
import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Full-screen background image */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621264448270-8fc8836047e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center after:content-[''] after:absolute after:inset-0 after:bg-black/40"></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-redcross/30 mix-blend-multiply"></div>
      
      {/* Content Container */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-3xl text-white animate-fade-in">
          <span className="inline-block py-1 px-3 mb-5 bg-redcross/80 backdrop-blur-sm text-white rounded-full text-sm font-medium">
            Disaster Relief Alert
          </span>
          
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4 text-shadow">
            Changing The Game, One Good Deed At A Time
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-xl text-white/90">
            Pillar prevents and alleviates human suffering in the face of emergencies by mobilizing the power of volunteers, because the world's on level hard mode.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/donate" 
              className="bg-redcross hover:bg-redcross-dark text-white font-medium py-3 px-6 rounded-full transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg flex items-center justify-center"
            >
              Donate Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            <Link 
              to="/volunteer" 
              className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm hover:bg-opacity-30 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
            >
              Volunteer With Us
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scrolling Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-white text-sm mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <span className="animate-bounce mt-1 w-1 h-3 bg-white rounded-full"></span>
        </div>
      </div>
      
      {/* Floating Emergency Banner */}
      <div className="absolute bottom-0 left-0 right-0 bg-redcross py-4 text-white">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="font-medium">Emergency: Hurricane Relief Efforts Underway</p>
          <Link to="/emergency" className="text-sm underline flex items-center">
            Learn how to help <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
