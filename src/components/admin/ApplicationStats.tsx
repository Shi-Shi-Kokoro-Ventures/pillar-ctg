
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, CheckCircle, Clock, XCircle } from "lucide-react";
import { Application } from "@/types/application";

type ApplicationStatsProps = {
  applications: Application[];
};

const ApplicationStats = ({ applications }: ApplicationStatsProps) => {
  // Calculate statistics
  const totalApplications = applications.length;
  const pendingCount = applications.filter(app => app.status === "pending").length;
  const approvedCount = applications.filter(app => app.status === "approved").length;
  const deniedCount = applications.filter(app => app.status === "denied").length;
  const inReviewCount = applications.filter(app => app.status === "in-review").length;

  // Calculate percentages for visualization
  const pendingPercentage = totalApplications ? Math.round((pendingCount / totalApplications) * 100) : 0;
  const approvedPercentage = totalApplications ? Math.round((approvedCount / totalApplications) * 100) : 0;
  const deniedPercentage = totalApplications ? Math.round((deniedCount / totalApplications) * 100) : 0;
  const inReviewPercentage = totalApplications ? Math.round((inReviewCount / totalApplications) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Application Status Overview</CardTitle>
          <CardDescription>Current status distribution of all applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-blue-500 mr-1.5" />
                  <span>Pending</span>
                </div>
                <span className="font-medium">{pendingCount}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${pendingPercentage}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <BarChart3 className="h-4 w-4 text-yellow-500 mr-1.5" />
                  <span>In Review</span>
                </div>
                <span className="font-medium">{inReviewCount}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{ width: `${inReviewPercentage}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1.5" />
                  <span>Approved</span>
                </div>
                <span className="font-medium">{approvedCount}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${approvedPercentage}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <XCircle className="h-4 w-4 text-red-500 mr-1.5" />
                  <span>Denied</span>
                </div>
                <span className="font-medium">{deniedCount}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full" 
                  style={{ width: `${deniedPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Assistance Types Requested</CardTitle>
          <CardDescription>Most common types of assistance requested</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Calculate assistance type statistics */}
          {(() => {
            const assistanceTypes: {[key: string]: number} = {};
            
            applications.forEach(app => {
              app.assistanceTypes.forEach(type => {
                assistanceTypes[type] = (assistanceTypes[type] || 0) + 1;
              });
            });
            
            // Sort by frequency
            const sortedTypes = Object.entries(assistanceTypes)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5); // Top 5
            
            const maxCount = sortedTypes.length > 0 ? sortedTypes[0][1] : 0;
            
            return (
              <div className="space-y-2">
                {sortedTypes.map(([type, count]) => {
                  const percentage = maxCount ? Math.round((count / maxCount) * 100) : 0;
                  
                  return (
                    <div key={type} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="capitalize">{type}</span>
                        <span className="font-medium">{count}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
                
                {sortedTypes.length === 0 && (
                  <div className="text-sm text-gray-500 py-4 text-center">
                    No assistance types data available
                  </div>
                )}
              </div>
            );
          })()}
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationStats;
