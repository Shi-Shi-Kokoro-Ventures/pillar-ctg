
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { NotificationsDropdown } from "@/components/NotificationsDropdown";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Shield, ChevronsUpDown } from "lucide-react";
import { ROLE_DEFINITIONS } from "@/types/user";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ children }) => {
  const { userRole, perspectiveRole, setPerspectiveRole, roleInfo } = useAuth();
  const isAdmin = userRole === 'admin';

  // Use perspectiveRole from auth context instead of local state
  useEffect(() => {
    if (!perspectiveRole && userRole) {
      setPerspectiveRole(userRole);
    }
  }, [userRole, perspectiveRole, setPerspectiveRole]);

  // Only show perspective options for admin users
  const handlePerspectiveChange = (value: string) => {
    setPerspectiveRole(value);
    toast.info(`Viewing dashboard as ${ROLE_DEFINITIONS[value as keyof typeof ROLE_DEFINITIONS]?.name || value}`, {
      description: "This is a view-only perspective change. Your admin permissions remain active.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 h-full lg:px-6">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-semibold">Admin Portal</span>
          </Link>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 gap-1 border-dashed">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span>
                      View as: <span className="font-semibold">{ROLE_DEFINITIONS[perspectiveRole as keyof typeof ROLE_DEFINITIONS]?.name || perspectiveRole}</span>
                    </span>
                    <ChevronsUpDown className="h-3.5 w-3.5 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-0" align="end">
                  <div className="p-2">
                    <div className="text-xs font-semibold text-gray-500 mb-2 px-2 pt-1">
                      Role Perspective
                    </div>
                    {Object.entries(ROLE_DEFINITIONS).map(([key, role]) => (
                      <Button
                        key={key}
                        variant={perspectiveRole === key ? "secondary" : "ghost"}
                        className="w-full justify-start text-left mb-1"
                        onClick={() => handlePerspectiveChange(key)}
                      >
                        <div className="flex items-center">
                          <span className={`h-2 w-2 rounded-full mr-2 ${perspectiveRole === key ? 'bg-blue-600' : 'bg-gray-300'}`}></span>
                          {role.name}
                        </div>
                      </Button>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 p-2">
                    <div className="text-xs text-gray-500 px-2 py-1">
                      This only changes your view perspective. Your admin permissions remain active.
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
            <NotificationsDropdown />
          </div>
        </div>
      </header>
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          {isAdmin && perspectiveRole !== 'admin' && (
            <div className="mb-6 bg-blue-50 border border-blue-100 rounded-md p-3 text-sm text-blue-700 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-blue-500" />
              <span>
                <strong>Admin Mode:</strong> You are viewing the dashboard as{" "}
                <span className="font-medium">{ROLE_DEFINITIONS[perspectiveRole as keyof typeof ROLE_DEFINITIONS]?.name}</span>.
                Your admin privileges remain active.
              </span>
              <Button variant="link" className="ml-auto text-blue-600" onClick={() => setPerspectiveRole('admin')}>
                Return to Admin View
              </Button>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
