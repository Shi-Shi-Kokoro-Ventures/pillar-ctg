
import React, { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface AdminDashboardLayoutProps {
  children: ReactNode;
}

const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboardLayout;
