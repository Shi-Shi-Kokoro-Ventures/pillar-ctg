
import React from "react";
import { cn } from "@/lib/utils";
import { Bell, CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Notification {
  id: string;
  title: string;
  description: string;
  type: "approval" | "deadline" | "alert" | "info";
  isRead: boolean;
  timestamp: Date;
}

interface NotificationsPanelProps {
  notifications: Notification[];
  className?: string;
}

const NotificationsPanel = ({ notifications, className }: NotificationsPanelProps) => {
  const formatTimestamp = (date: Date) => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return formatter.format(date);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "approval":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "deadline":
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case "alert":
        return <XCircle className="h-5 w-5 text-red-600" />;
      case "info":
        return <AlertCircle className="h-5 w-5 text-blue-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "approval":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Approval
          </Badge>
        );
      case "deadline":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Deadline
          </Badge>
        );
      case "alert":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            Alert
          </Badge>
        );
      case "info":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            Info
          </Badge>
        );
      default:
        return <Badge variant="outline">Other</Badge>;
    }
  };

  return (
    <div className={cn("bg-white rounded-lg shadow-sm border", className)}>
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="text-lg font-medium">Notifications</h3>
        <Badge>{notifications.filter((n) => !n.isRead).length}</Badge>
      </div>
      <div className="p-0">
        <ul className="divide-y divide-gray-200">
          {notifications.length === 0 ? (
            <li className="p-6 text-center text-gray-500">No notifications</li>
          ) : (
            notifications.map((notification) => (
              <li
                key={notification.id}
                className={cn(
                  "p-4 hover:bg-gray-50",
                  !notification.isRead && "bg-gray-50"
                )}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                        {!notification.isRead && (
                          <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                        )}
                      </p>
                      <div className="flex items-center gap-2">
                        {getTypeLabel(notification.type)}
                        <p className="text-xs text-gray-500">
                          {formatTimestamp(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.description}
                    </p>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
      {notifications.length > 0 && (
        <div className="p-3 border-t text-center">
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationsPanel;
