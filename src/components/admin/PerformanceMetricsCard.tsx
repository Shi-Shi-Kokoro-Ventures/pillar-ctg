
import React from "react";

interface PerformanceMetricsCardProps {
  timeRangeOptions?: string[];
  defaultTimeRange?: string;
}

const PerformanceMetricsCard = ({
  timeRangeOptions = ["Last 7 days", "Last 30 days", "Last 90 days", "This year"],
  defaultTimeRange = "Last 7 days"
}: PerformanceMetricsCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Performance Metrics</h3>
        <select className="border border-gray-300 rounded-md p-2 text-sm">
          {timeRangeOptions.map((option) => (
            <option key={option} selected={option === defaultTimeRange}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-gray-500 text-center">Interactive charts will be implemented here</p>
      </div>
    </div>
  );
};

export default PerformanceMetricsCard;
