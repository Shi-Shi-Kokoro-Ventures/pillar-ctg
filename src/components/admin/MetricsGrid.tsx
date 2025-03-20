
import React from "react";
import KPICard from "./KPICard";

export interface KPIMetric {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  accentColor: "blue" | "green" | "yellow" | "red";
}

interface MetricsGridProps {
  metrics: KPIMetric[];
}

const MetricsGrid = ({ metrics }: MetricsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <KPICard
          key={index}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          icon={metric.icon}
          accentColor={metric.accentColor}
        />
      ))}
    </div>
  );
};

export default MetricsGrid;
