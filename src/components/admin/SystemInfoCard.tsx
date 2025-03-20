
import React from "react";

interface SystemInfoItem {
  title: string;
  value: string | React.ReactNode;
}

interface SystemInfoCardProps {
  infoItems: SystemInfoItem[];
}

const SystemInfoCard = ({ infoItems }: SystemInfoCardProps) => {
  return (
    <section className="bg-white rounded-lg shadow-sm border p-6" aria-labelledby="system-info-title">
      <h3 id="system-info-title" className="text-lg font-medium text-gray-900 mb-4">System Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {infoItems.map((item, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">{item.title}</h4>
            <p className="text-lg font-semibold">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SystemInfoCard;
