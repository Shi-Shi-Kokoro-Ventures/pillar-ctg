
import React, { useState, useEffect, memo } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Users, Home, GraduationCap, HeartHandshake } from "lucide-react";

interface StatProps {
  number: string;
  label: string;
  icon: React.ReactNode;
  delay?: number;
}

// Optimized counting component with reduced animation complexity
const CountUp = ({ target, duration = 1500 }: { target: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '100px 0px', // Load earlier
  });

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const countUp = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Simpler easing function for better performance
      const eased = percentage < 0.5 ? 2 * percentage * percentage : 1 - Math.pow(-2 * percentage + 2, 2) / 2;
      
      setCount(Math.floor(eased * target));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(countUp);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(countUp);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [inView, target, duration]);

  return <span ref={ref}>{count}</span>;
};

// Memoized Stat component to prevent unnecessary re-renders
const Stat = memo(({ number, label, icon, delay = 0 }: StatProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '150px 0px', // Significantly increased for earlier loading
  });

  const numericValue = parseInt(number.replace(/\+|\,/g, ''));

  // Simplified animation configuration
  const variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      ref={ref} 
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.4, delay: delay / 20 }} // Faster animation with less delay
      className="relative"
    >
      <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full">
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-redcross/10 rounded-full"></div>
        <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-redcross/10 rounded-full"></div>
        
        <div className="w-16 h-16 flex items-center justify-center mb-4 bg-gradient-to-br from-redcross/10 to-redcross-light/5 text-redcross rounded-full">
          {icon}
        </div>
        
        <h3 className="text-4xl font-bold mb-2 text-gray-800">
          {inView ? (
            <>{numericValue > 0 ? <CountUp target={numericValue} /> : 0}{number.includes('+') ? '+' : ''}</>
          ) : '0'}
        </h3>
        
        <p className="text-gray-600">{label}</p>
      </div>
    </motion.div>
  );
});

Stat.displayName = "Stat";

// Optimized Statistics component
const Statistics = () => {
  // Use a single inView reference for the whole section
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '200px 0px', // Start loading much earlier
  });

  // Precomputed stats data to avoid recalculations
  const stats = [
    { number: "100+", label: "Families We Aim to Assist Annually", icon: <Users size={28} />, delay: 0 },
    { number: "25+", label: "Affordable Housing Units Planned", icon: <Home size={28} />, delay: 50 },
    { number: "200+", label: "Future Financial Literacy Graduates", icon: <GraduationCap size={28} />, delay: 100 },
    { number: "1,000+", label: "Volunteer Hours Goal", icon: <HeartHandshake size={28} />, delay: 150 }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_theme(colors.redcross.light/5),_transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_theme(colors.redcross/5),_transparent_70%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto text-center mb-12" // Reduced margin
        >
          <span className="inline-block py-1 px-3 rounded-full text-redcross bg-redcross/10 text-sm font-medium tracking-wide mb-3">
            Our Impact Goals
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Building Foundations for Change</h2>
          <p className="text-lg text-gray-600">
            The P.I.L.L.A.R. Initiative aims to provide stable housing and support services to those in need, building foundations for lasting independence.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Stat 
              key={index}
              number={stat.number} 
              label={stat.label} 
              icon={stat.icon}
              delay={stat.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Statistics);
