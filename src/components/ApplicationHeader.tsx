import React from 'react';
import { Link } from 'react-router-dom';
interface ApplicationHeaderProps {
  title: string;
  subtitle?: string;
  description?: string; // Added description as an optional prop
}
const ApplicationHeader: React.FC<ApplicationHeaderProps> = ({
  title,
  subtitle,
  description
}) => {
  return <div className="w-full flex flex-col items-center justify-center mb-8">
      <Link to="/" className="mb-4">
        <img alt="Organization Logo" className="h-20 object-contain" src="/lovable-uploads/6e14ea75-fa08-422e-8318-09cb454bf841.png" />
      </Link>
      <h1 className="text-3xl font-bold text-center text-gray-900">{title}</h1>
      {(subtitle || description) && <p className="text-gray-600 mt-2 text-center">{subtitle || description}</p>}
    </div>;
};
export default ApplicationHeader;