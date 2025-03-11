
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-b from-white to-blue-50">
      <div className="relative">
        <div className="h-20 w-20 rounded-full border-t-4 border-b-4 border-blue-600 animate-spin"></div>
        <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-r-4 border-l-4 border-blue-400 animate-spin animate-pulse"></div>
      </div>
      <p className="mt-6 text-blue-700 font-medium animate-pulse">Loading resources...</p>
      <div className="mt-4 max-w-xs text-center text-gray-500 text-sm">
        <p>The P.I.L.L.A.R. Initiative is preparing your experience</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
