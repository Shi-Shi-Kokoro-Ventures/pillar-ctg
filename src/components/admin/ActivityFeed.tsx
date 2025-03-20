
import React from "react";
import { cn } from "@/lib/utils";

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: Date;
  status?: "success" | "warning" | "error" | "info";
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  className?: string;
}

const ActivityFeed = ({ activities, className }: ActivityFeedProps) => {
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "success":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      case "info":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className={cn("bg-white rounded-lg shadow-sm border", className)}>
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium">Recent Activity</h3>
      </div>
      <div className="p-0">
        <ul className="divide-y divide-gray-200">
          {activities.map((activity) => (
            <li key={activity.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start">
                <div
                  className={cn(
                    "flex-shrink-0 w-2 h-2 mt-2 rounded-full mr-3",
                    getStatusColor(activity.status)
                  )}
                ></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.user}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatTimestamp(activity.timestamp)}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {activity.action} <strong>{activity.target}</strong>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {activities.length > 5 && (
        <div className="p-3 border-t text-center">
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View all activity
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
