
import React from "react";
import { Calendar, ArrowRight } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "Red Cross Responds to Devastating Hurricane",
    excerpt: "Red Cross volunteers and staff are working around the clock to help thousands of people forced to leave their homes due to Hurricane Ian.",
    image: "https://images.unsplash.com/photo-1587029899257-82f5878981e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    date: "Sept 28, 2023"
  },
  {
    id: 2,
    title: "Urgent Need for Blood Donors as Supplies Drop",
    excerpt: "The Red Cross is experiencing an emergency blood shortage as the number of trauma cases, organ transplants and elective surgeries rise.",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2016&q=80",
    date: "Aug 15, 2023"
  },
  {
    id: 3,
    title: "Red Cross Launches New Disaster App",
    excerpt: "The new emergency app consolidates more than 35 types of severe weather and emergency alerts and provides step-by-step instructions.",
    image: "https://images.unsplash.com/photo-1586769852044-692d6e3703f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "July 2, 2023"
  }
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
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-redcross transition-colors">
          {item.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {item.excerpt}
        </p>
        <a 
          href={`#news/${item.id}`} 
          className="inline-flex items-center text-redcross font-medium group-hover:text-redcross-dark transition-colors"
        >
          Read More
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
};

const NewsUpdates = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <span className="bg-gray-100 text-gray-800 px-4 py-1 rounded-full text-sm font-medium inline-block mb-3">
              Latest Updates
            </span>
            <h2 className="text-3xl font-bold">News & Stories</h2>
          </div>
          <a 
            href="#all-news" 
            className="inline-flex items-center mt-4 md:mt-0 text-redcross hover:text-redcross-dark font-medium transition-colors"
          >
            View All News
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
        
        <div className="mt-16 bg-gray-50 rounded-xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-10">
              <h3 className="text-2xl font-bold mb-3">Stay Informed</h3>
              <p className="text-gray-600 mb-4">
                Subscribe to our newsletter to receive updates on our work, ways to get involved, and information on emergency preparedness.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-redcross focus:border-transparent"
                  required
                />
                <button 
                  type="submit" 
                  className="whitespace-nowrap bg-redcross hover:bg-redcross-dark text-white font-medium px-6 py-3 rounded-md transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-24 h-24 bg-redcross rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsUpdates;
