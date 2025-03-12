
import React from 'react';
import { Link } from 'react-router-dom';

interface ApplicationHeaderProps {
  title: string;
  subtitle?: string;
}

const ApplicationHeader: React.FC<ApplicationHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center mb-8">
      <Link to="/" className="mb-4">
        <img 
          src="/lovable-uploads/fb949545-3500-4403-9a6b-3532aa878cef.png" 
          alt="Organization Logo" 
          className="h-20 object-contain"
        />
      </Link>
      <h1 className="text-3xl font-bold text-center text-gray-900">{title}</h1>
      {subtitle && <p className="text-gray-600 mt-2 text-center">{subtitle}</p>}
    </div>
  );
};

export default ApplicationHeader;
