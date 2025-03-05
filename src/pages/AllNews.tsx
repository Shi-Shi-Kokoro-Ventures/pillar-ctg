
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const newsItems = [
  {
    id: 1,
    title: "P.I.L.L.A.R. Opens New Transitional Housing Complex",
    excerpt: "Our new 24-unit transitional housing complex will provide safe, stable housing for families while they receive comprehensive support services.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    date: "Sept 28, 2023",
    category: "Housing Projects"
  },
  {
    id: 2,
    title: "Financial Literacy Program Reaches Milestone",
    excerpt: "Our financial education program has now helped over 500 individuals develop budgeting skills, repair credit, and prepare for homeownership.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2016&q=80",
    date: "Aug 15, 2023",
    category: "Programs"
  },
  {
    id: 3,
    title: "P.I.L.L.A.R. Partners with Local Employers",
    excerpt: "Our new job placement program connects clients with local employers, providing living-wage employment opportunities and career advancement.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    date: "July 2, 2023",
    category: "Partnerships"
  },
  {
    id: 4,
    title: "Annual Fundraising Gala Raises Record Amount",
    excerpt: "Our annual Home for the Future gala raised over $250,000 to support our housing and support services for families experiencing homelessness.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    date: "June 10, 2023",
    category: "Events"
  },
  {
    id: 5,
    title: "New Mental Health Services Added to Support Programs",
    excerpt: "P.I.L.L.A.R. has expanded its support services to include on-site mental health counseling and trauma-informed care for program participants.",
    image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "May 18, 2023",
    category: "Programs"
  },
  {
    id: 6,
    title: "P.I.L.L.A.R. Awarded Federal Grant for Housing Innovation",
    excerpt: "Our organization has been awarded a $500,000 federal grant to develop innovative affordable housing solutions using sustainable building practices.",
    image: "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    date: "Apr 5, 2023",
    category: "Grants"
  },
  {
    id: 7,
    title: "Success Story: Thompson Family Finds Permanent Housing",
    excerpt: "After six months in our transitional housing program, the Thompson family has moved into permanent affordable housing and achieved financial stability.",
    image: "https://images.unsplash.com/photo-1574282893982-ff1675ba4900?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "Mar 22, 2023",
    category: "Success Stories"
  },
  {
    id: 8,
    title: "Volunteer Spotlight: Local Construction Team Renovates Housing Units",
    excerpt: "A team of local construction professionals volunteered their time and skills to renovate five transitional housing units, making them ready for new families.",
    image: "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2031&q=80",
    date: "Feb 15, 2023",
    category: "Volunteers"
  },
  {
    id: 9,
    title: "P.I.L.L.A.R. Testifies at State Housing Committee",
    excerpt: "Our Executive Director presented testimony to the State Housing Committee on the importance of expanding affordable housing programs and rental assistance.",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "Jan 30, 2023",
    category: "Advocacy"
  }
];

const categories = [
  "All Categories",
  "Housing Projects",
  "Programs",
  "Partnerships",
  "Events",
  "Grants",
  "Success Stories",
  "Volunteers",
  "Advocacy"
];

const NewsCard = ({ item }: { item: typeof newsItems[0] }) => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute bottom-4 left-4 z-20 flex items-center text-white text-sm">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{item.date}</span>
        </div>
        <div className="absolute top-4 right-4 z-20">
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
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
    </div>
  );
};

const AllNews = () => {
  const [activeCategory, setActiveCategory] = React.useState("All Categories");
  const [searchQuery, setSearchQuery] = React.useState("");
  
  const filteredNews = newsItems.filter(item => {
    const matchesCategory = activeCategory === "All Categories" || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">News & Updates</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed about P.I.L.L.A.R.'s latest projects, events, and success stories in our mission to end homelessness.
            </p>
          </div>
        </section>

        {/* Filter and Search */}
        <section className="py-8 border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0 w-full md:w-auto overflow-x-auto">
                <div className="flex space-x-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-full whitespace-nowrap ${
                        activeCategory === category
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </section>
        
        {/* News Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {filteredNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredNews.map((item) => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No news articles found matching your criteria.</p>
                <Button 
                  onClick={() => {
                    setActiveCategory("All Categories");
                    setSearchQuery("");
                  }}
                  className="mt-4 bg-blue-600 hover:bg-blue-700"
                >
                  Clear Filters
                </Button>
              </div>
            )}
            
            {/* Pagination (simplified for demo) */}
            {filteredNews.length > 0 && (
              <div className="mt-12 flex justify-center">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" className="bg-blue-600 text-white">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Newsletter Sign Up */}
        <section className="py-12 bg-blue-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-xl p-8 md:p-10 shadow-md">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 mb-6 md:mb-0 md:pr-10">
                  <h3 className="text-2xl font-bold mb-3">Stay Updated</h3>
                  <p className="text-gray-600 mb-4">
                    Subscribe to our newsletter to receive the latest news, success stories, and updates on our housing initiatives.
                  </p>
                  <form className="flex flex-col sm:flex-row gap-3 max-w-md">
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      required
                    />
                    <Button 
                      type="submit" 
                      className="whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
                    >
                      Subscribe
                    </Button>
                  </form>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AllNews;
