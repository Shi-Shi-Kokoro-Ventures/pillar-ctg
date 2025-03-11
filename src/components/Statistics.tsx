
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Users, Home, GraduationCap, HeartHandshake } from "lucide-react";

interface StatProps {
  number: string;
  label: string;
  icon: React.ReactNode;
  delay?: number;
}

// Animated counting component
const CountUp = ({ target, duration = 2000 }: { target: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const countUp = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smoother animation
      const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);
      const easedPercentage = easeOutQuart(percentage);
      
      setCount(Math.floor(easedPercentage * target));

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

// Memoize the Stat component to prevent unnecessary re-renders
const Stat = React.memo(({ number, label, icon, delay = 0 }: StatProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    // Add rootMargin to start loading before the element is in view
    rootMargin: '50px 0px',
  });

  const numericValue = parseInt(number.replace(/\+|\,/g, ''));

  return (
    <motion.div 
      ref={ref} 
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: delay / 10 }}
      className="relative"
    >
      <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 h-full">
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-redcross/10 rounded-full"></div>
        <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-redcross/10 rounded-full"></div>
        
        <div className="w-16 h-16 flex items-center justify-center mb-4 bg-gradient-to-br from-redcross/10 to-redcross-light/5 text-redcross rounded-full">
          {icon}
        </div>
        
        <h3 className="text-4xl font-bold mb-2 text-gray-800">
          {inView ? (
            <><CountUp target={numericValue} />{number.includes('+') ? '+' : ''}</>
          ) : '0'}
        </h3>
        
        <p className="text-gray-600">{label}</p>
      </div>
    </motion.div>
  );
});

Stat.displayName = "Stat";

// Memoize the entire Statistics component
const Statistics = React.memo(() => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_theme(colors.redcross.light/5),_transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_theme(colors.redcross/5),_transparent_70%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
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
          <Stat 
            number="100+" 
            label="Families We Aim to Assist Annually" 
            icon={<Users size={28} />}
            delay={0}
          />
          <Stat 
            number="25+" 
            label="Affordable Housing Units Planned" 
            icon={<Home size={28} />}
            delay={150}
          />
          <Stat 
            number="200+" 
            label="Future Financial Literacy Graduates" 
            icon={<GraduationCap size={28} />}
            delay={300}
          />
          <Stat 
            number="1,000+" 
            label="Volunteer Hours Goal" 
            icon={<HeartHandshake size={28} />}
            delay={450}
          />
        </div>
      </div>
    </section>
  );
});

Statistics.displayName = "Statistics";

export default Statistics;
