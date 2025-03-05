
import React from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface StatProps {
  number: string;
  label: string;
  icon?: React.ReactNode;
  delay?: number;
}

const Stat: React.FC<StatProps> = ({ number, label, icon, delay = 0 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref} 
      className={cn(
        "flex flex-col items-center text-center p-6 transition-all duration-700 transform",
        inView 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {icon && <div className="mb-4 text-redcross">{icon}</div>}
      <h3 className="text-4xl font-bold mb-2 text-redcross">{number}</h3>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};

const Statistics = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
          <p className="text-lg text-gray-600">
            Every day, the American Red Cross provides hope and comfort to people in their darkest hours.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Stat 
            number="500M+" 
            label="People Served Annually" 
            delay={0}
          />
          <Stat 
            number="40%" 
            label="of U.S. Blood Supply Collected" 
            delay={200}
          />
          <Stat 
            number="75,000+" 
            label="Disasters Responded To Yearly" 
            delay={400}
          />
          <Stat 
            number="20M+" 
            label="Volunteer Hours" 
            delay={600}
          />
        </div>
      </div>
    </section>
  );
};

export default Statistics;
