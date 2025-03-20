
import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  accentColor?: "blue" | "green" | "yellow" | "red";
  className?: string;
}

const KPICard = ({
  title,
  value,
  icon,
  change,
  accentColor = "blue",
  className,
}: KPICardProps) => {
  const getAccentClass = () => {
    switch (accentColor) {
      case "blue":
        return "border-l-blue-500 bg-blue-50";
      case "green":
        return "border-l-green-500 bg-green-50";
      case "yellow":
        return "border-l-yellow-500 bg-yellow-50";
      case "red":
        return "border-l-red-500 bg-red-50";
      default:
        return "border-l-blue-500 bg-blue-50";
    }
  };

  const getTextClass = () => {
    switch (accentColor) {
      case "blue":
        return "text-blue-700";
      case "green":
        return "text-green-700";
      case "yellow":
        return "text-yellow-700";
      case "red":
        return "text-red-700";
      default:
        return "text-blue-700";
    }
  };

  const getIconBgClass = () => {
    switch (accentColor) {
      case "blue":
        return "bg-blue-100 text-blue-700";
      case "green":
        return "bg-green-100 text-green-700";
      case "yellow":
        return "bg-yellow-100 text-yellow-700";
      case "red":
        return "bg-red-100 text-red-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col border rounded-lg shadow-sm border-l-4 overflow-hidden bg-white",
        getAccentClass(),
        className
      )}
    >
      <div className="flex items-center justify-between p-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold">{value}</p>
            {change && (
              <span
                className={cn(
                  "ml-2 text-sm flex items-center",
                  change.isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                {change.isPositive ? (
                  <ArrowUpRight className="h-3 w-3 mr-0.5" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-0.5" />
                )}
                {change.value}%
              </span>
            )}
          </div>
        </div>
        <div className={cn("p-2 rounded-full", getIconBgClass())}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default KPICard;
