import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, ArrowRight, Search, Filter, BookOpen, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const newsItems = [
  {
    id: 1,
    title: "Federal Housing Initiative Expands with $500M Investment in Urban Development",
    excerpt: "The Department of Housing and Urban Development announces major expansion of affordable housing programs across metropolitan areas, focusing on sustainable and technology-integrated communities.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80",
    date: "March 15, 2025",
    category: "Housing Projects"
  },
  {
    id: 2,
    title: "AI-Powered Housing Assistance Platform Launches Nationwide",
    excerpt: "Revolutionary platform uses artificial intelligence to match individuals with housing resources and support services, showing promising results in early adoption cities.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
    date: "March 10, 2025",
    category: "Technology"
  },
  {
    id: 3,
    title: "Innovative Housing First Program Shows 85% Success Rate",
    excerpt: "Latest data reveals remarkable success of Housing First initiatives in multiple states, with significant improvements in long-term stability and quality of life for participants.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    date: "March 5, 2025",
    category: "Programs"
  },
  {
    id: 4,
    title: "Green Building Standards Revolutionize Affordable Housing",
    excerpt: "New sustainable building practices are making affordable housing more energy-efficient and environmentally friendly, reducing costs for residents while fighting climate change.",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2065&q=80",
    date: "March 1, 2025",
    category: "Sustainability"
  },
  {
    id: 5,
    title: "Community-Led Housing Solutions Transform Urban Neighborhoods",
    excerpt: "Innovative partnership between local governments and community organizations creates new model for affordable housing development with resident input at its core.",
    image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
    date: "February 28, 2025",
    category: "Partnerships"
  }
];

// Update categories array to include new categories
const categories = [
  "All Categories",
  "Housing Projects",
  "Technology",
  "Programs",
  "Sustainability",
  "Partnerships"
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
            {item.category}
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

const AllNews = () => {
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const filteredNews = newsItems.filter(item => {
    const matchesCategory = activeCategory === "All Categories" || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-200 rounded-full filter blur-3xl opacity-20"></div>
          
          <motion.div 
            className="container mx-auto px-4 text-center relative z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center mb-6"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">News & Updates</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed about P.I.L.L.A.R.'s latest projects, events, and success stories in our mission to end homelessness.
            </p>
          </motion.div>
        </section>

        {/* Filter and Search */}
        <section className="py-8 border-b border-gray-200 bg-white backdrop-blur-sm shadow-sm sticky top-[72px] z-30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0 w-full md:w-auto overflow-x-auto">
                <motion.div 
                  className="flex space-x-2" 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {categories.map((category, index) => (
                    <motion.button
                      key={category}
                      variants={itemVariants}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                        activeCategory === category
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                      }`}
                    >
                      {category}
                    </motion.button>
                  ))}
                </motion.div>
              </div>
              
              <motion.div 
                className={`relative w-full md:w-64 transition-all duration-300 ${isSearchFocused ? 'md:w-72' : 'md:w-64'}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* News Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {filteredNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredNews.map((item, index) => (
                  <NewsCard key={item.id} item={item} index={index} />
                ))}
              </div>
            ) : (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="text-gray-400 h-6 w-6" />
                </div>
                <p className="text-xl text-gray-600 mb-4">No news articles found matching your criteria.</p>
                <Button 
                  onClick={() => {
                    setActiveCategory("All Categories");
                    setSearchQuery("");
                  }}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-6 py-3 rounded-md transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
            
            {/* Pagination (simplified for demo) */}
            {filteredNews.length > 0 && (
              <motion.div 
                className="mt-12 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled className="flex items-center">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    <span>Previous</span>
                  </Button>
                  <Button variant="outline" size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </section>
        
        {/* Newsletter Sign Up */}
        <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div 
              className="neo-glass-card backdrop-blur-md bg-white/50 rounded-xl p-8 md:p-10 border border-white/30 shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 mb-6 md:mb-0 md:pr-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="text-blue-600 h-5 w-5" />
                    <span className="text-blue-600 font-medium text-sm">Newsletter</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">Stay Updated</h3>
                  <p className="text-gray-600 mb-4">
                    Subscribe to our newsletter to receive the latest news, success stories, and updates on our housing initiatives.
                  </p>
                  <form className="flex flex-col sm:flex-row gap-3 max-w-md">
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="flex-grow px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
                      required
                    />
                    <Button 
                      type="submit" 
                      className="whitespace-nowrap bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-6 py-3 rounded-md transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 button-hover-glow"
                    >
                      Subscribe
                    </Button>
                  </form>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg animate-pulse-slow">
                      <BookOpen className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-blue-400 rounded-full filter blur-lg opacity-30 animate-pulse-glow"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AllNews;
