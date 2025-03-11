
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-md mx-auto px-4 py-12">
          <h1 className="text-6xl font-bold text-redcross mb-6">404</h1>
          <p className="text-2xl text-gray-700 mb-6">Page Not Found</p>
          <p className="text-gray-600 mb-8">
            We couldn't find the page you're looking for. The page may have been moved, 
            deleted, or is temporarily unavailable.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-redcross text-white rounded-md hover:bg-redcross-dark transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
