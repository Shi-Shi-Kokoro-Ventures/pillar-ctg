
import React, { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const textGradientStyle = {
    backgroundImage: "linear-gradient(90deg, #33C3F0, #0D6E97)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    color: "transparent",
    display: "inline-block"
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-16 md:pt-20">
      {/* Full-screen background image with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=75')",
          backgroundSize: "cover",
          backgroundPosition: `center ${scrollPosition * 0.2}px`,
          transform: `scale(${1 + scrollPosition * 0.0005})`,
          transition: "transform 0.1s ease-out",
          zIndex: 0
        }}
        aria-hidden="true"
      >
        <link 
          rel="preload" 
          href="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=75" 
          as="image"
        />
      </div>
      
      {/* Futuristic Gradient Overlay with mesh gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-redcross-dark/30 to-redcross/40 mix-blend-multiply z-0"></div>
      
      {/* Animated light streaks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 30 + 20}%`,
              opacity: 0.3,
              rotate: `${Math.random() * 360}deg`
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: Math.random() * 3 + 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
      
      {/* Content Container - With motion animations */}
      <div className="relative container mx-auto px-4 h-[calc(100vh-4rem)] flex flex-col justify-center z-10 pt-10 md:pt-16">
        <motion.div 
          className="max-w-3xl text-white"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center py-1.5 px-4 mb-5 bg-gradient-to-r from-redcross/90 to-redcross-light/90 backdrop-blur-lg text-white rounded-full text-sm font-medium shadow-lg">
              <Sparkles className="w-4 h-4 mr-2" />
              Housing Crisis Alert
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp} 
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            <span className="drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]">Changing The Game,</span><br />
            <span style={textGradientStyle}>One Home At A Time</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp} 
            className="text-lg md:text-xl lg:text-2xl mb-8 max-w-xl text-white/90 drop-shadow-md leading-relaxed"
          >
            Providing secure housing and transformative support services to end homelessness, because everyone deserves a place to call home.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link 
              to="/donate" 
              className="bg-gradient-to-r from-redcross to-redcross-light text-white font-medium py-3 px-6 rounded-full transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-xl flex items-center justify-center group overflow-hidden relative"
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
              <span className="relative flex items-center">
                Donate Now
                <Zap className="ml-2 h-5 w-5 group-hover:animate-pulse" />
              </span>
            </Link>
            
            <Link 
              to="/volunteer" 
              className="bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-xl border border-white/30"
            >
              Volunteer With Us
              <ArrowRight className="ml-2 h-5 w-5 inline-block" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Animated Scrolling Indicator */}
      <motion.div 
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
        animate={{
          y: [0, 10, 0],
          opacity: [0.3, 1, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <span className="text-white text-sm mb-2 font-light tracking-wide">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
          <span className="animate-bounce mt-1 w-1.5 h-3 bg-white rounded-full"></span>
        </div>
      </motion.div>
      
      {/* Floating Emergency Banner with glassmorphism */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-redcross to-redcross-dark backdrop-blur-md py-4 text-white border-t border-white/10 z-10">
        <div className="container mx-auto px-4 flex flex-wrap md:flex-nowrap justify-between items-center">
          <p className="font-medium text-base lg:text-lg flex items-center">
            <span className="inline-block w-3 h-3 bg-white rounded-full mr-3 animate-pulse"></span>
            Emergency: Affordable Housing Initiative Underway
          </p>
          <Link to="/emergency" className="text-sm underline flex items-center group mt-2 md:mt-0">
            Learn how to help 
            <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
