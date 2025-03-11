
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
    // Reset active submenu when route changes
    setActiveSubmenu(null);
  }, [location.pathname]);

  useEffect(() => {
    // Focus search input when opened
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
    setSearchOpen(false);
    setSearchQuery("");
  };

  const menuItems = [
    {
      title: "Housing Services",
      submenu: [
        { name: "Emergency Shelter", link: "/emergency" },
        { name: "Transitional Housing", link: "/housing" },
        { name: "Affordable Housing", link: "/affordable-housing" },
        { name: "Rental Assistance", link: "/rental-assistance" },
        { name: "Housing Placement", link: "/housing" }
      ]
    },
    {
      title: "Support Programs",
      submenu: [
        { name: "Financial Literacy", link: "/classes" },
        { name: "Job Training", link: "/job-training" },
        { name: "Mental Health Services", link: "/mental-health" },
        { name: "Case Management", link: "/case-management" },
        { name: "Family Support", link: "/family-support" }
      ]
    },
    {
      title: "Get Involved",
      submenu: [
        { name: "Volunteer Opportunities", link: "/volunteer" },
        { name: "Donation Drives", link: "/donate-goods" },
        { name: "Advocacy Work", link: "/advocate" },
        { name: "Community Events", link: "/all-news" },
        { name: "Corporate Partnerships", link: "/donate" }
      ]
    },
    {
      title: "Find Resources",
      submenu: [
        { name: "Housing Crisis Hotline", link: "/emergency" },
        { name: "Community Resources", link: "/all-ways" },
        { name: "Apply for Assistance", link: "/emergency" },
        { name: "Housing Vouchers", link: "/emergency" },
        { name: "Tenant Rights", link: "/advocate" }
      ]
    },
    {
      title: "About Us",
      submenu: [
        { name: "Our Mission", link: "/our-mission" },
        { name: "Leadership", link: "/leadership" },
        { name: "Partners", link: "/partners" },
        { name: "Careers", link: "/careers" },
        { name: "Contact Us", link: "/contact-us" }
      ]
    }
  ];

  const toggleSubmenu = (index: number) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-md py-2" : "bg-white/80 backdrop-blur-sm py-3"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="text-blue-600 font-bold text-2xl flex items-center">
              <img
                src="/lovable-uploads/fb949545-3500-4403-9a6b-3532aa878cef.png"
                alt="Pillar Logo"
                className="h-12 mr-2 hover-scale"
              />
              <span className="hidden sm:inline text-blue-700">Pillar</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group">
                <button className="flex items-center px-3 py-2 text-sm font-medium hover:text-blue-600 transition-colors">
                  {item.title}
                  <ChevronDown className="ml-1 h-4 w-4 opacity-70 group-hover:animate-pulse" />
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 animate-fade-in">
                  <div className="py-1">
                    {item.submenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.link}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="animate-fade-in absolute right-0 top-0 w-64">
                  <div className="flex items-center bg-white border rounded-full shadow-sm overflow-hidden">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search resources..."
                      className="w-full px-4 py-2 text-sm focus:outline-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="p-2 text-gray-500 hover:text-blue-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-gray-700 hover:text-blue-600 transition-colors rounded-full hover:bg-gray-100"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>
              )}
            </div>

            <Link
              to="/donate"
              className="hidden sm:inline-flex items-center text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-md px-4 py-2 shadow-sm hover:from-blue-600 hover:to-blue-700 transition-all duration-200 hover:shadow-md button-hover"
            >
              Donate Now
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 rounded-md lg:hidden hover:text-blue-600 hover:bg-gray-100 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
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

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-xl animate-slide-in-right overflow-y-auto max-h-[80vh]">
          <div className="py-4 px-4 space-y-4">
            {menuItems.map((item, index) => (
              <div key={index}>
                <button 
                  className="w-full text-left py-2 text-gray-700 font-medium flex justify-between items-center"
                  onClick={() => toggleSubmenu(index)}
                >
                  {item.title}
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeSubmenu === index ? 'rotate-180' : ''}`} />
                </button>
                <div className={`pl-4 mt-1 space-y-1 border-l-2 border-blue-100 ${activeSubmenu === index ? 'block animate-fade-in' : 'hidden'}`}>
                  {item.submenu.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subItem.link}
                      className="block py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="pt-2">
              <Link
                to="/donate"
                className="block w-full py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center font-medium rounded-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm"
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
