
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, Search, X, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [accessibilityVisible, setAccessibilityVisible] = useState(false);
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if accessibility features were previously enabled
    const savedVisibility = localStorage.getItem('accessibility_visible');
    setAccessibilityVisible(savedVisibility === 'true');
    
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

  const toggleAccessibility = () => {
    const newVisibility = !accessibilityVisible;
    setAccessibilityVisible(newVisibility);
    localStorage.setItem('accessibility_visible', newVisibility.toString());
    
    // Trigger an event so AccessibilityControls component can react to this change
    const event = new CustomEvent('accessibilityToggled', { 
      detail: { visible: newVisibility } 
    });
    window.dispatchEvent(event);
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
        "fixed top-0 w-full z-50 transition-all duration-500",
        isScrolled 
          ? "bg-white/95 shadow-lg backdrop-blur-md py-2" 
          : "bg-white/70 backdrop-blur-sm py-3"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="text-blue-600 font-bold text-2xl flex items-center">
              <img
                src="/lovable-uploads/c2725c89-9993-4cd8-a5c8-3178f1204dc0.png"
                alt="Pillar Logo"
                className="h-12 mr-2 transition-transform duration-300 hover:scale-105"
              />
              <span className="hidden sm:inline text-blue-700 group-hover:text-blue-800 transition-colors">
                Pillar
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group">
                <button className="flex items-center px-3 py-2 text-gray-700 text-sm font-medium hover:text-blue-600 transition-colors rounded-md hover:bg-blue-50/50">
                  {item.title}
                  <ChevronDown className="ml-1 h-4 w-4 opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-0.5" />
                </button>
                <div className="absolute left-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black/5 ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left group-hover:translate-y-0 translate-y-1 overflow-hidden border border-blue-100/50">
                  <div className="py-1 bg-gradient-to-br from-white to-blue-50/30">
                    {item.submenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.link}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors border-l-2 border-transparent hover:border-blue-400"
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
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="animate-fade-in absolute right-0 top-[-10px] w-64">
                  <div className="flex items-center bg-white border border-blue-100 rounded-full shadow-md overflow-hidden">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search resources..."
                      className="w-full px-4 py-2 text-sm focus:outline-none focus:ring-0 border-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-gray-700 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Accessibility Toggle Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleAccessibility}
              aria-label={accessibilityVisible ? "Disable accessibility features" : "Enable accessibility features"}
              className="hidden sm:flex items-center gap-1.5 border-blue-200 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              <Settings className="h-4 w-4" />
              <span className="text-xs font-medium">
                {accessibilityVisible ? "Accessibility On" : "Accessibility"}
              </span>
            </Button>

            {/* Donate Button */}
            <Button
              asChild
              className="hidden sm:inline-flex items-center text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-full px-5 py-2.5 shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-0.5 button-hover-glow"
            >
              <Link to="/donate">Donate Now</Link>
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 rounded-md lg:hidden hover:text-blue-600 hover:bg-blue-50 transition-colors"
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md shadow-xl border-t border-blue-50 animate-slide-in overflow-y-auto max-h-[80vh]">
          <div className="py-6 px-6 space-y-5">
            {menuItems.map((item, index) => (
              <div key={index} className="border-b border-gray-100 pb-3">
                <button 
                  className="w-full text-left py-2 text-gray-700 font-medium flex justify-between items-center"
                  onClick={() => toggleSubmenu(index)}
                >
                  <span className="hover:text-blue-600 transition-colors">{item.title}</span>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform duration-300 text-gray-400 ${
                      activeSubmenu === index ? 'rotate-180 text-blue-500' : ''
                    }`} 
                  />
                </button>
                <div 
                  className={`pl-4 mt-2 space-y-2 border-l-2 border-blue-100 ${
                    activeSubmenu === index ? 'block animate-fade-in' : 'hidden'
                  }`}
                >
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
            
            {/* Mobile Accessibility Toggle */}
            <div className="pt-3">
              <Button
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 py-2.5 border-blue-200 text-blue-600 hover:bg-blue-50"
                onClick={toggleAccessibility}
              >
                <Settings className="h-4 w-4" />
                <span>
                  {accessibilityVisible ? "Disable Accessibility" : "Enable Accessibility"}
                </span>
              </Button>
            </div>

            {/* Mobile Donate Button */}
            <div className="pt-2">
              <Button 
                asChild
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center font-medium rounded-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md transform hover:-translate-y-0.5"
              >
                <Link to="/donate">Donate Now</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
