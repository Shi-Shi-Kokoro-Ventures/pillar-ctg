
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import DashboardHeader from "@/components/admin/DashboardHeader";
import ActivityFeed from "@/components/admin/ActivityFeed";
import { Activity, Users, Filter, Download, RefreshCw } from "lucide-react";

// Mock activity data
const generateMockActivityData = () => {
  const actions = [
    "logged in",
    "updated profile",
    "viewed application",
    "submitted application",
    "downloaded document",
    "changed password",
    "approved application",
    "rejected application",
    "created user",
    "deactivated account"
  ];
  
  const users = [
    "John Smith",
    "Maria Garcia",
    "David Chen",
    "Sarah Johnson",
    "Michael Brown",
    "Emma Wilson",
    "James Taylor",
    "Olivia Martinez",
    "Robert Lee",
    "Sophia Anderson"
  ];
  
  const targets = [
    "#AP-1234",
    "#AP-5678",
    "#AP-9012",
    "user profile",
    "system settings",
    "financial report",
    "housing form",
    "assistance application",
    "document #DOC-456",
    "user account"
  ];
  
  const statuses = ["success", "warning", "error", "info"];
  
  // Generate 40 random activity items
  return Array.from({ length: 40 }, (_, i) => ({
    id: `activity-${i + 1}`,
    user: users[Math.floor(Math.random() * users.length)],
    action: actions[Math.floor(Math.random() * actions.length)],
    target: targets[Math.floor(Math.random() * targets.length)],
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    status: statuses[Math.floor(Math.random() * statuses.length)] as "success" | "warning" | "error" | "info",
  }));
};

const UserActivity = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activityType, setActivityType] = useState("all");
  const [allActivities] = useState(generateMockActivityData());
  const [filteredActivities, setFilteredActivities] = useState(allActivities);
  
  // Apply filters
  const applyFilters = () => {
    let result = allActivities;
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(activity => 
        activity.user.toLowerCase().includes(term) || 
        activity.action.toLowerCase().includes(term) || 
        activity.target.toLowerCase().includes(term)
      );
    }
    
    // Filter by activity type
    if (activityType !== "all") {
      result = result.filter(activity => activity.status === activityType);
    }
    
    // Sort by timestamp, newest first
    result = [...result].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    setFilteredActivities(result);
  };
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setActivityType("all");
    setFilteredActivities(allActivities);
  };
  
  return (
    <AdminDashboardLayout>
      <DashboardHeader 
        title="User Activity" 
        description="Monitor and analyze user actions across the platform" 
        icon={<Activity className="h-6 w-6 text-redcross" />}
      />
      
      <Tabs defaultValue="all-activity" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="all-activity" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>All Activity</span>
          </TabsTrigger>
          <TabsTrigger value="user-logins" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>User Logins</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>
                View and filter all user activity across the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Input 
                    placeholder="Search users or actions..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-full md:w-64">
                  <Select value={activityType} onValueChange={setActivityType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Activity Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Activities</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                      <SelectItem value="info">Information</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={applyFilters} className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Apply</span>
                  </Button>
                  <Button variant="ghost" onClick={resetFilters} className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    <span>Reset</span>
                  </Button>
                </div>
              </div>
              
              {/* Activity Feed */}
              <ActivityFeed activities={filteredActivities} />
              
              {/* Export Button */}
              <div className="mt-6 flex justify-end">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>Export Log</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="user-logins">
          <Card>
            <CardHeader>
              <CardTitle>Login Activity</CardTitle>
              <CardDescription>
                Monitor user login and authentication activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Login-specific activity - filter the existing data */}
              <ActivityFeed 
                activities={allActivities.filter(a => a.action === "logged in")
                  .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())} 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminDashboardLayout>
  );
};

export default UserActivity;
