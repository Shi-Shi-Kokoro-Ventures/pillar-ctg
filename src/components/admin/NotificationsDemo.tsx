
import React from "react";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/contexts/NotificationsContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bell, CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react";

export function NotificationsDemo() {
  const { addNotification } = useNotifications();

  const createTestNotification = (type: "success" | "error" | "warning" | "info") => {
    const notificationTypes = {
      success: {
        title: "Success Notification",
        description: "Operation completed successfully",
        icon: <CheckCircle className="h-4 w-4" />
      },
      error: {
        title: "Error Notification",
        description: "There was a problem with your request",
        icon: <AlertCircle className="h-4 w-4" />
      },
      warning: {
        title: "Warning Notification",
        description: "This action might have consequences",
        icon: <AlertTriangle className="h-4 w-4" />
      },
      info: {
        title: "Information Notification",
        description: "Here's some information you might find useful",
        icon: <Info className="h-4 w-4" />
      },
    };

    addNotification({
      title: notificationTypes[type].title,
      description: notificationTypes[type].description,
      type,
    });
  };

  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-gray-500" />
          <CardTitle className="text-sm font-medium">Notification Tests</CardTitle>
        </div>
        <CardDescription className="text-xs">
          Test the notification system with different types
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => createTestNotification("success")}
            size="sm"
            className="bg-green-500 hover:bg-green-600 h-8 px-3 text-xs"
          >
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Success
          </Button>
          <Button
            onClick={() => createTestNotification("error")}
            size="sm"
            variant="destructive"
            className="h-8 px-3 text-xs"
          >
            <AlertCircle className="h-3.5 w-3.5 mr-1" />
            Error
          </Button>
          <Button
            onClick={() => createTestNotification("warning")}
            size="sm"
            className="bg-yellow-500 hover:bg-yellow-600 h-8 px-3 text-xs"
          >
            <AlertTriangle className="h-3.5 w-3.5 mr-1" />
            Warning
          </Button>
          <Button
            onClick={() => createTestNotification("info")}
            size="sm"
            className="bg-blue-500 hover:bg-blue-600 h-8 px-3 text-xs"
          >
            <Info className="h-3.5 w-3.5 mr-1" />
            Info
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
