
import React from 'react';
import ApplicationHeader from './ApplicationHeader';
import Footer from './Footer';

interface ApplicationWrapperProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const ApplicationWrapper: React.FC<ApplicationWrapperProps> = ({ 
  title, 
  subtitle, 
  children 
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <ApplicationHeader title={title} subtitle={subtitle} />
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ApplicationWrapper;
