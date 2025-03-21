
import React from "react";

interface DashboardHeaderProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const DashboardHeader = ({ title, description, icon }: DashboardHeaderProps) => {
  return (
    <header className="mb-8" aria-labelledby="dashboard-title">
      <div className="flex items-center gap-3 mb-2">
        {icon && <div className="flex-shrink-0">{icon}</div>}
        <h1 id="dashboard-title" className="text-3xl font-bold text-gray-900">{title}</h1>
      </div>
      <p className="text-gray-600">{description}</p>
    </header>
  );
};

export default DashboardHeader;
