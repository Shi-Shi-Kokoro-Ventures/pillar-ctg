
import { useState, useEffect } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuItems = [
    { 
      title: "Give Blood", 
      submenu: ["Find a Blood Drive", "Schedule an Appointment", "Eligibility Information", "What to Expect"] 
    },
    { 
      title: "Volunteer",
      submenu: ["Become a Volunteer", "Volunteer Opportunities", "Training Resources"]
    },
    { 
      title: "Take a Class", 
      submenu: ["First Aid", "CPR", "AED", "Aquatics", "Professional Development"]
    },
    { 
      title: "Find Help", 
      submenu: ["Disaster Relief", "Emergency Assistance", "Military Families", "Missing Persons"] 
    },
    { 
      title: "About Us", 
      submenu: ["Our Mission", "Leadership", "History", "Careers", "Contact Us"]
    }
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white shadow-md py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-redcross font-bold text-2xl flex items-center">
              <img src="/lovable-uploads/fb949545-3500-4403-9a6b-3532aa878cef.png" alt="Pillar Logo" className="h-12 mr-2" />
              <span className="hidden sm:inline">Pillar</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group">
                <button className="flex items-center px-3 py-2 text-sm font-medium hover:text-redcross">
                  {item.title}
                  <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    {item.submenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {subItem}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center">
            {/* Search */}
            <div className="mr-4 relative">
              {searchOpen ? (
                <div className="animate-fade-in absolute right-0 top-0 w-64">
                  <div className="flex items-center bg-white border rounded-full shadow-sm overflow-hidden">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full px-4 py-2 text-sm focus:outline-none"
                    />
                    <button 
                      onClick={() => setSearchOpen(false)}
                      className="p-2 text-gray-500 hover:text-redcross"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-gray-700 hover:text-redcross transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Donate Button */}
            <Link
              to="/donate"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-redcross text-white font-medium rounded-full button-hover"
            >
              Donate Now
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 rounded-md lg:hidden hover:text-redcross"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-xl animate-slide-in">
          <div className="py-4 px-4 space-y-4">
            {menuItems.map((item, index) => (
              <div key={index}>
                <button className="w-full text-left py-2 text-gray-700 font-medium flex justify-between items-center">
                  {item.title}
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="pl-4 mt-1 space-y-1 border-l-2 border-gray-200">
                  {item.submenu.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      to="#"
                      className="block py-2 text-sm text-gray-600 hover:text-redcross"
                    >
                      {subItem}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="pt-2">
              <Link
                to="/donate"
                className="block w-full py-3 bg-redcross text-white text-center font-medium rounded-md button-hover"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
