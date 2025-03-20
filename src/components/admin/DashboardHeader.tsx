
import React from "react";

interface DashboardHeaderProps {
  title: string;
  description: string;
}

const DashboardHeader = ({ title, description }: DashboardHeaderProps) => {
  return (
    <header className="mb-8" aria-labelledby="dashboard-title">
      <h1 id="dashboard-title" className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </header>
  );
};

export default DashboardHeader;
