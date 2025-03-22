
import React, { useState } from "react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import DashboardHeader from "@/components/admin/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, CheckCircle, AlertCircle, Clock, Plus, MoreHorizontal } from "lucide-react";
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
      <DashboardHeader 
        title="Task Management" 
        description="Manage projects and tasks for staff and volunteers" 
      />
      
      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-teal-600" />
              Active Tasks
            </CardTitle>
            <CardDescription>Currently assigned</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42</div>
            <div className="text-sm text-teal-600 mt-1">
              Across 8 active projects
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Completed
            </CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78</div>
            <div className="text-sm text-green-600 mt-1">
              92% completion rate
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              Overdue
            </CardTitle>
            <CardDescription>Past deadline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <div className="text-sm text-red-600 mt-1">
              3 high priority tasks
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Due Soon
            </CardTitle>
            <CardDescription>Next 48 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <div className="text-sm text-blue-600 mt-1">
              4 require immediate attention
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Task Board (Kanban) */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Task Board</h2>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {columns.map((column) => (
            <div 
              key={column.id}
              className="bg-gray-50 rounded-lg p-4"
              onDrop={(e) => handleDrop(e, column.id)}
              onDragOver={handleDragOver}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {column.icon}
                  <h3 className="font-medium">{column.title}</h3>
                  <Badge variant="outline" className="ml-2">{column.tasks.length}</Badge>
                </div>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <div 
                    key={task.id}
                    className="bg-white p-3 rounded-md shadow-sm border border-gray-200 cursor-move"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id, column.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{task.title}</h4>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Assign</DropdownMenuItem>
                          <DropdownMenuItem>Archive</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{task.description}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {getPriorityBadge(task.priority)}
                      {task.assignedTo && (
                        <div className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                          {task.assignedTo}
                        </div>
                      )}
                      {task.dueDate && (
                        <div className="text-xs text-gray-500 ml-auto">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {column.tasks.length === 0 && (
                  <div className="bg-white p-3 rounded-md border border-dashed border-gray-300 text-center">
                    <p className="text-sm text-gray-500">No tasks</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Task Management Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Management</CardTitle>
            <CardDescription>
              Track projects and milestones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">This is a placeholder for the project management interface</p>
              <Button>Manage Projects</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Task Assignment</CardTitle>
            <CardDescription>
              Assign and delegate tasks to team members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">This is a placeholder for the task assignment interface</p>
              <Button>Assign Tasks</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
};

export default TaskManagement;
