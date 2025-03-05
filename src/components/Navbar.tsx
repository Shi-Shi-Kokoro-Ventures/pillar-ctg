
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
      title: "Housing Services",
      submenu: [
        { name: "Emergency Shelter", link: "/emergency" },
        { name: "Transitional Housing", link: "/housing" },
        { name: "Affordable Housing", link: "/housing" },
        { name: "Rental Assistance", link: "/emergency" },
        { name: "Housing Placement", link: "/housing" }
      ]
    },
    {
      title: "Support Programs",
      submenu: [
        { name: "Financial Literacy", link: "/classes" },
        { name: "Job Training", link: "/classes" },
        { name: "Mental Health Services", link: "/emergency" },
        { name: "Case Management", link: "/emergency" },
        { name: "Family Support", link: "/emergency" }
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
        { name: "Our Mission", link: "/" },
        { name: "Leadership", link: "/all-news" },
        { name: "Partners", link: "/all-news" },
        { name: "Careers", link: "/volunteer" },
        { name: "Contact Us", link: "/all-ways" }
      ]
    }
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-blue-600 font-bold text-2xl flex items-center">
              <img
                src="/lovable-uploads/fb949545-3500-4403-9a6b-3532aa878cef.png"
                alt="Pillar Logo"
                className="h-12 mr-2"
              />
              <span className="hidden sm:inline text-blue-700">Pillar</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group">
                <button className="flex items-center px-3 py-2 text-sm font-medium hover:text-blue-600">
                  {item.title}
                  <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    {item.submenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.link}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {subItem.name}
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
                      className="p-2 text-gray-500 hover:text-blue-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Donate Button */}
            <Link
              to="/donate"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors"
            >
              Donate Now
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 rounded-md lg:hidden hover:text-blue-600"
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
                      to={subItem.link}
                      className="block py-2 text-sm text-gray-600 hover:text-blue-600"
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
                className="block w-full py-3 bg-blue-600 text-white text-center font-medium rounded-md hover:bg-blue-700 transition-colors"
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
