
import React, { useState } from "react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import DashboardHeader from "@/components/admin/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, CheckCircle, AlertCircle, Clock, Plus, MoreHorizontal, Zap, Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Task type definition
type Task = {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  assignedTo?: string;
  dueDate?: string;
};

// Column type definition
type Column = {
  id: "todo" | "inProgress" | "review" | "completed";
  title: string;
  icon: React.ReactNode;
  tasks: Task[];
};

const TaskManagement = () => {
  // Initial state for the Kanban board columns
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "To Do",
      icon: <ClipboardList className="h-5 w-5 text-gray-500" />,
      tasks: [
        {
          id: "task1",
          title: "Create monthly report",
          description: "Compile data and create the monthly performance report",
          priority: "high",
          assignedTo: "Jane Smith",
          dueDate: "2023-06-15",
        },
        {
          id: "task2",
          title: "Update volunteer documentation",
          description: "Review and update the volunteer onboarding documents",
          priority: "medium",
          assignedTo: "John Doe",
          dueDate: "2023-06-20",
        },
        {
          id: "task3",
          title: "Schedule team meeting",
          description: "Set up the quarterly team review meeting",
          priority: "low",
          assignedTo: "Mark Johnson",
          dueDate: "2023-06-10",
        },
      ],
    },
    {
      id: "inProgress",
      title: "In Progress",
      icon: <Clock className="h-5 w-5 text-blue-500" />,
      tasks: [
        {
          id: "task4",
          title: "Review grant application",
          description: "Review the draft of the new grant application",
          priority: "high",
          assignedTo: "Alice Williams",
          dueDate: "2023-06-12",
        },
        {
          id: "task5",
          title: "Prepare training materials",
          description: "Create training materials for the new case management system",
          priority: "medium",
          assignedTo: "Bob Martin",
          dueDate: "2023-06-18",
        },
      ],
    },
    {
      id: "review",
      title: "Review",
      icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
      tasks: [
        {
          id: "task6",
          title: "Finalize budget proposal",
          description: "Complete the final review of the budget proposal",
          priority: "high",
          assignedTo: "Sarah Johnson",
          dueDate: "2023-06-11",
        },
      ],
    },
    {
      id: "completed",
      title: "Completed",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      tasks: [
        {
          id: "task7",
          title: "Update website content",
          description: "Update the programs section of the website",
          priority: "medium",
          assignedTo: "Tom Wilson",
          dueDate: "2023-06-05",
        },
        {
          id: "task8",
          title: "Conduct volunteer interviews",
          description: "Interview candidates for the volunteer coordinator position",
          priority: "high",
          assignedTo: "Lisa Brown",
          dueDate: "2023-06-02",
        },
      ],
    },
  ]);

  // Function to move a task to a different column
  const moveTask = (taskId: string, sourceColId: Column["id"], targetColId: Column["id"]) => {
    setColumns(prevColumns => {
      // Create a copy of the columns
      const newColumns = [...prevColumns];
      
      // Find the source and target column indices
      const sourceColIndex = newColumns.findIndex(col => col.id === sourceColId);
      const targetColIndex = newColumns.findIndex(col => col.id === targetColId);
      
      // Find the task in the source column
      const taskIndex = newColumns[sourceColIndex].tasks.findIndex(task => task.id === taskId);
      const task = newColumns[sourceColIndex].tasks[taskIndex];
      
      // Remove the task from the source column
      newColumns[sourceColIndex].tasks.splice(taskIndex, 1);
      
      // Add the task to the target column
      newColumns[targetColIndex].tasks.push(task);
      
      return newColumns;
    });
  };

  // Function to handle drag start
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string, columnId: Column["id"]) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("sourceColumnId", columnId);
  };

  // Function to handle drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetColumnId: Column["id"]) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const sourceColumnId = e.dataTransfer.getData("sourceColumnId") as Column["id"];
    
    if (sourceColumnId !== targetColumnId) {
      moveTask(taskId, sourceColumnId, targetColumnId);
    }
  };

  // Function to allow drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Get the priority badge color
  const getPriorityBadge = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>;
      case "low":
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl p-6 shadow-sm">
        <DashboardHeader 
          title="Task Management" 
          description="Manage projects and tasks for staff and volunteers" 
        />
        
        {/* Stats Overview Cards - Glassmorphism style with animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="neo-glass-card border border-white/20 bg-white/90 backdrop-blur-sm hover:translate-y-[-4px] transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="p-2 bg-teal-50 rounded-full">
                  <ClipboardList className="h-5 w-5 text-teal-600" />
                </div>
                <span>Active Tasks</span>
              </CardTitle>
              <CardDescription>Currently assigned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <div className="text-3xl font-bold text-gray-900">42</div>
                <div className="text-sm text-teal-600 font-medium">
                  Across 8 projects
                </div>
              </div>
              <div className="mt-3 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-teal-400 to-teal-600 w-[65%] rounded-full"></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="neo-glass-card border border-white/20 bg-white/90 backdrop-blur-sm hover:translate-y-[-4px] transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="p-2 bg-green-50 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <span>Completed</span>
              </CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <div className="text-3xl font-bold text-gray-900">78</div>
                <div className="text-sm text-green-600 font-medium">
                  92% success rate
                </div>
              </div>
              <div className="mt-3 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-green-600 w-[92%] rounded-full"></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="neo-glass-card border border-white/20 bg-white/90 backdrop-blur-sm hover:translate-y-[-4px] transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="p-2 bg-red-50 rounded-full">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <span>Overdue</span>
              </CardTitle>
              <CardDescription>Past deadline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <div className="text-3xl font-bold text-gray-900">5</div>
                <div className="text-sm text-red-600 font-medium">
                  3 high priority
                </div>
              </div>
              <div className="mt-3 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-400 to-red-600 w-[12%] rounded-full"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="neo-glass-card border border-white/20 bg-white/90 backdrop-blur-sm hover:translate-y-[-4px] transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-full">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <span>Due Soon</span>
              </CardTitle>
              <CardDescription>Next 48 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <div className="text-3xl font-bold text-gray-900">8</div>
                <div className="text-sm text-blue-600 font-medium">
                  4 require attention
                </div>
              </div>
              <div className="mt-3 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 w-[20%] rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Task Board (Kanban) - Enhanced modern design */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Task Board</h2>
              <p className="text-gray-500">Drag tasks between columns to update their status</p>
            </div>
            <Button className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-5 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <Plus className="h-4 w-4" />
              <span>New Task</span>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {columns.map((column) => (
              <div 
                key={column.id}
                className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100"
                onDrop={(e) => handleDrop(e, column.id)}
                onDragOver={handleDragOver}
              >
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {column.icon}
                      <h3 className="font-medium text-gray-900">{column.title}</h3>
                    </div>
                    <Badge variant="outline" className="bg-gray-50 text-gray-700">{column.tasks.length}</Badge>
                  </div>
                  <div className="h-1 w-full rounded-full bg-gray-100 mt-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        column.id === "todo" ? "bg-gray-400" : 
                        column.id === "inProgress" ? "bg-blue-500" : 
                        column.id === "review" ? "bg-yellow-500" : "bg-green-500"
                      }`} 
                      style={{ width: `${(column.tasks.length / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="p-3 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                  {column.tasks.map((task) => (
                    <div 
                      key={task.id}
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-3 cursor-move hover:shadow-md transition-all duration-200 group"
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id, column.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">{task.title}</h4>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-60 group-hover:opacity-100">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-40 backdrop-blur-md bg-white/95 border border-gray-100">
                            <DropdownMenuItem className="hover:bg-gray-50 cursor-pointer">Edit</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-50 cursor-pointer">Assign</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-50 cursor-pointer">Archive</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{task.description}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        {getPriorityBadge(task.priority)}
                        {task.assignedTo && (
                          <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{task.assignedTo}</span>
                          </div>
                        )}
                        {task.dueDate && (
                          <div className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ml-auto ${
                            new Date(task.dueDate) < new Date() ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
                          }`}>
                            <Clock className="h-3 w-3" />
                            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {column.tasks.length === 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-200 text-center">
                      <p className="text-sm text-gray-400">No tasks yet</p>
                      <Button variant="ghost" size="sm" className="mt-2 text-xs text-gray-500">
                        <Plus className="h-3 w-3 mr-1" /> Add task
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Task Management Tools - Redesigned with modern UI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="overflow-hidden border-0 shadow-lg bg-white">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-5">
              <CardTitle className="text-white flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Project Management
              </CardTitle>
              <CardDescription className="text-indigo-100">
                Track projects and milestones
              </CardDescription>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Website Redesign</h4>
                    <p className="text-sm text-gray-500">8 tasks remaining</p>
                  </div>
                  <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Mobile App Development</h4>
                    <p className="text-sm text-gray-500">12 tasks remaining</p>
                  </div>
                  <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: "35%" }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Q3 Marketing Campaign</h4>
                    <p className="text-sm text-gray-500">3 tasks remaining</p>
                  </div>
                  <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600">Manage Projects</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-0 shadow-lg bg-white">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-5">
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-5 w-5" />
                Task Assignment
              </CardTitle>
              <CardDescription className="text-blue-100">
                Assign and delegate tasks to team members
              </CardDescription>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">JS</div>
                  <div>
                    <h4 className="font-medium">Jane Smith</h4>
                    <p className="text-sm text-gray-500">4 active tasks</p>
                  </div>
                  <Badge className="ml-auto bg-blue-100 text-blue-700 hover:bg-blue-200">Design</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">MW</div>
                  <div>
                    <h4 className="font-medium">Mark Wilson</h4>
                    <p className="text-sm text-gray-500">2 active tasks</p>
                  </div>
                  <Badge className="ml-auto bg-green-100 text-green-700 hover:bg-green-200">Dev</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">AJ</div>
                  <div>
                    <h4 className="font-medium">Amanda Jones</h4>
                    <p className="text-sm text-gray-500">6 active tasks</p>
                  </div>
                  <Badge className="ml-auto bg-purple-100 text-purple-700 hover:bg-purple-200">Marketing</Badge>
                </div>
                <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600">Assign Tasks</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default TaskManagement;
