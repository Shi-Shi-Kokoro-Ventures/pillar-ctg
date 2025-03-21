
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { NotificationsDropdown } from "@/components/NotificationsDropdown";
import { NotificationsDemo } from "@/components/admin/NotificationsDemo";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ children }) => {
  const { user, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 h-full lg:px-6">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-semibold">Admin Portal</span>
          </Link>
          <div className="flex items-center gap-3">
            <NotificationsDropdown />
            
            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {user?.firstName || "User"}
                  <span className="text-xs bg-gray-100 rounded-full px-2 py-0.5 text-gray-700">
                    {userRole}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          {children}
          
          {/* Temporary notification demo - can be removed or moved elsewhere */}
          <div className="mt-8">
            <NotificationsDemo />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
