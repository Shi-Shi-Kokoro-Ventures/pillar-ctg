
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Home, Briefcase, Heart, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

interface ProgramCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  index: number;
}

const ProgramCard = ({ icon, title, description, link, index }: ProgramCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-xl transition-all duration-300 h-full p-6 hover:shadow-redcross/20 hover:shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-redcross/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative z-10">
          <div className="p-3 bg-gradient-to-br from-redcross/20 to-redcross-light/20 rounded-lg w-14 h-14 flex items-center justify-center mb-5">
            {icon}
          </div>
          
          <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-redcross transition-colors">{title}</h3>
          
          <p className="text-gray-600 mb-5">{description}</p>
          
          <Link 
            to={link} 
            className="inline-flex items-center text-redcross font-medium group-hover:text-redcross-dark transition-colors"
          >
            Learn more
            <motion.span
              initial={{ x: 0 }}
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
            >
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedPrograms = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const programs = [
    {
      icon: <Home className="w-8 h-8 text-redcross" />,
      title: "Affordable Housing",
      description: "Access quality affordable housing units across the country with our subsidized programs.",
      link: "/affordable-housing"
    },
    {
      icon: <Briefcase className="w-8 h-8 text-redcross" />,
      title: "Job Training",
      description: "Gain valuable skills with our industry-recognized job training and placement services.",
      link: "/job-training"
    },
    {
      icon: <Heart className="w-8 h-8 text-redcross" />,
      title: "Mental Health",
      description: "Access counseling, therapy, and mental health resources tailored to your needs.",
      link: "/mental-health"
    },
    {
      icon: <UsersRound className="w-8 h-8 text-redcross" />,
      title: "Family Support",
      description: "Comprehensive assistance for families facing housing insecurity and related challenges.",
      link: "/family-support"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-gray-50 to-transparent z-0"></div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-gray-50 to-transparent z-0"></div>
      <div className="absolute -left-24 top-1/4 w-48 h-48 rounded-full bg-redcross/5 z-0"></div>
      <div className="absolute -right-24 bottom-1/4 w-64 h-64 rounded-full bg-redcross/5 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 rounded-full text-redcross bg-redcross/10 text-sm font-medium tracking-wide mb-3">
            Our Programs
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gray-900">Building Better Futures</span>
            <span className="bg-gradient-to-r from-redcross to-redcross-light bg-clip-text text-transparent"> Together</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Our comprehensive suite of programs addresses the root causes of housing insecurity through innovative, people-centered approaches.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <ProgramCard
              key={index}
              icon={program.icon}
              title={program.title}
              description={program.description}
              link={program.link}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPrograms;
