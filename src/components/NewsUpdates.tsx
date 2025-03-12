import React from "react";
import { Calendar, ArrowRight, Newspaper, BookOpen, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

const newsItems = [
  {
    id: 1,
    title: "Federal Housing Initiative Expands with $500M Investment in Urban Development",
    excerpt: "The Department of Housing and Urban Development announces major expansion of affordable housing programs across metropolitan areas, focusing on sustainable and technology-integrated communities.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80",
    date: "March 15, 2025"
  },
  {
    id: 2,
    title: "AI-Powered Housing Assistance Platform Launches Nationwide",
    excerpt: "Revolutionary platform uses artificial intelligence to match individuals with housing resources and support services, showing promising results in early adoption cities.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
    date: "March 10, 2025"
  },
  {
    id: 3,
    title: "Innovative Housing First Program Shows 85% Success Rate",
    excerpt: "Latest data reveals remarkable success of Housing First initiatives in multiple states, with significant improvements in long-term stability and quality of life for participants.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    date: "March 5, 2025"
  }
];

const NewsCard = ({ item, index }: { item: typeof newsItems[0]; index: number }) => {
  return (
    <motion.div 
      className="group bg-gradient-to-br from-white to-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 backdrop-blur-sm neo-glass-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute bottom-4 left-4 z-20 flex items-center text-white text-sm backdrop-blur-sm bg-black/20 px-3 py-1 rounded-full">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{item.date}</span>
        </div>
        <div className="absolute top-4 right-4 z-20">
          <span className="bg-blue-600/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full shadow-lg">
            News
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
          {item.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {item.excerpt}
        </p>
        <Link 
          to={`/news/${item.id}`} 
          className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-800 transition-colors"
        >
          Read More
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

const NewsUpdates = () => {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Get the email value from the form
    const form = e.currentTarget;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    
    if (emailInput && emailInput.value) {
      // Show success toast
      toast.success("Successfully subscribed to the newsletter!", {
        position: "top-center",
        duration: 4000,
        className: "z-50 max-w-md bg-white text-gray-900 shadow-lg", 
        style: {
          padding: '16px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '500'
        },
      });
      
      // Reset the form
      emailInput.value = '';
    } else {
      // Show error toast if email is empty
      toast.error("Please enter a valid email address", {
        position: "top-center",
        duration: 4000,
        className: "z-50 max-w-md bg-white text-gray-900 shadow-lg",
        style: {
          padding: '16px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '500'
        },
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      
      {/* Blurred circles for futuristic effect */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-200 rounded-full filter blur-3xl opacity-20" style={{animationDelay: "2s"}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Newspaper className="text-blue-600 h-5 w-5" />
              <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium inline-block">
                Latest Updates
              </span>
            </div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">News & Stories</h2>
          </div>
          <Link 
            to="/all-news" 
            className="inline-flex items-center mt-4 md:mt-0 text-blue-600 hover:text-blue-800 font-medium transition-colors group"
          >
            <span className="mr-2">View All News</span>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-all">
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <NewsCard key={item.id} item={item} index={index} />
          ))}
        </div>
        
        <motion.div 
          className="mt-16 neo-glass-card backdrop-blur-md bg-white/50 rounded-xl p-8 md:p-10 border border-white/30 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-10">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="text-blue-600 h-5 w-5" />
                <span className="text-blue-600 font-medium text-sm">Keep Connected</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">Stay Updated</h3>
              <p className="text-gray-600 mb-4">
                Subscribe to our newsletter to receive updates on new housing projects, success stories, volunteer opportunities, and community events.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md relative z-10" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
                  required
                />
                <button 
                  type="submit" 
                  className="whitespace-nowrap bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-6 py-3 rounded-md transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 button-hover-glow"
                >
                  Subscribe
                </button>
              </form>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg animate-pulse-slow">
                  <BookOpen className="w-12 h-12 text-white" />
                </div>
                <div className="absolute inset-0 bg-blue-400 rounded-full filter blur-lg opacity-30 animate-pulse-glow"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsUpdates;
