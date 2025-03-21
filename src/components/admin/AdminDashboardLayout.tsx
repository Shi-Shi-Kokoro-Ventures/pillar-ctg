
import React from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { NotificationsDropdown } from "@/components/NotificationsDropdown";

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 h-full lg:px-6">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-semibold">Admin Portal</span>
          </Link>
          <div className="flex items-center gap-2">
            <NotificationsDropdown />
          </div>
        </div>
      </header>
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
