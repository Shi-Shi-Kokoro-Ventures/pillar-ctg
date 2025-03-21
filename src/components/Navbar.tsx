
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { navigationItems } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button"; 
import { UserCircle, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { user, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/fb949545-3500-4403-9a6b-3532aa878cef.png" 
                alt="P.I.L.L.A.R. Logo" 
                className="h-10 md:h-12"
              />
              <span className="text-redcross font-bold text-xl ml-2 hidden sm:inline">P.I.L.L.A.R.</span>
            </Link>
          </div>
          
          {/* Auth & Dashboard Links - Desktop */}
          <div className="hidden md:flex items-center gap-2 ml-auto mr-4">
            {user ? (
              <>
                <Link to="/admin-dashboard">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <UserCircle className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="default" size="sm">
                  Admin Login
                </Button>
              </Link>
            )}
          </div>

          {/* Main Menu - Desktop */}
          <div className="hidden md:flex space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "px-3 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200",
                  item.featured ? "text-redcross font-bold" : "text-gray-700"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-4 pb-4 md:hidden">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="block px-3 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Auth Links - Mobile */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              {user ? (
                <div className="flex flex-col gap-2">
                  <div className="text-sm text-gray-500">
                    Logged in as <span className="font-medium">{userRole}</span>
                  </div>
                  <Link to="/admin-dashboard">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <UserCircle className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleLogout}
                    className="w-full justify-start text-red-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Link to="/login" className="block">
                  <Button variant="default" size="sm" className="w-full">
                    Admin Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Add default export for Navbar
export default Navbar;
