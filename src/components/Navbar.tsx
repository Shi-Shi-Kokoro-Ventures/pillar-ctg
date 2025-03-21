
import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { navigationItems, NavigationItem, NavigationDropdownItem } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button"; 
import { UserCircle, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

          {/* Main Menu - Desktop with Dropdowns */}
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    {item.dropdown ? (
                      <>
                        <NavigationMenuTrigger className={cn(
                          item.featured ? "text-redcross font-bold" : "text-gray-700"
                        )}>
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                            {item.dropdown.map((dropdownItem) => (
                              <li key={dropdownItem.label}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={dropdownItem.href}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  >
                                    <div className="text-sm font-medium leading-none">{dropdownItem.label}</div>
                                    {dropdownItem.description && (
                                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                        {dropdownItem.description}
                                      </p>
                                    )}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link
                        to={item.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          item.featured ? "text-redcross font-bold" : "text-gray-700"
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
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
              <div key={item.label} className="py-1">
                {item.dropdown ? (
                  <div className="relative group">
                    <button 
                      className={cn(
                        "flex items-center w-full px-3 py-2 text-left rounded-md font-medium hover:bg-gray-100 transition-colors duration-200",
                        item.featured ? "text-redcross font-bold" : "text-gray-700"
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </button>
                    <div className="pl-6 mt-1 space-y-1">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          to={dropdownItem.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      "block px-3 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200",
                      item.featured ? "text-redcross font-bold" : "text-gray-700"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
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

export default Navbar;
