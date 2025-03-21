
import React from "react";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/contexts/NotificationsContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function NotificationsDemo() {
  const { addNotification } = useNotifications();

  const createTestNotification = (type: "success" | "error" | "warning" | "info") => {
    const notificationTypes = {
      success: {
        title: "Success Notification",
        description: "Operation completed successfully",
      },
      error: {
        title: "Error Notification",
        description: "There was a problem with your request",
      },
      warning: {
        title: "Warning Notification",
        description: "This action might have consequences",
      },
      info: {
        title: "Information Notification",
        description: "Here's some information you might find useful",
      },
    };

    addNotification({
      title: notificationTypes[type].title,
      description: notificationTypes[type].description,
      type,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications Demo</CardTitle>
        <CardDescription>
          Test the notification system by creating different types of notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => createTestNotification("success")}
            className="bg-green-500 hover:bg-green-600"
          >
            Success Notification
          </Button>
          <Button
            onClick={() => createTestNotification("error")}
            variant="destructive"
          >
            Error Notification
          </Button>
          <Button
            onClick={() => createTestNotification("warning")}
            className="bg-yellow-500 hover:bg-yellow-600"
          >
            Warning Notification
          </Button>
          <Button
            onClick={() => createTestNotification("info")}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Info Notification
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
