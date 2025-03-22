
import React from 'react';
import { TeamMember } from './TeamMemberForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserCog, UserPlus, ChartBar, ClipboardList, Clock } from 'lucide-react';
import { format, subDays } from 'date-fns';

interface TeamMemberDetailsProps {
  isOpen: boolean;
  member: TeamMember;
  onClose: () => void;
  onEdit: () => void;
  onAssignCase: () => void;
}

const TeamMemberDetails = ({ isOpen, member, onClose, onEdit, onAssignCase }: TeamMemberDetailsProps) => {
  // Generate sample performance data for demonstration
  const generateTimeData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 30; i >= 0; i--) {
      const date = subDays(today, i);
      const value = 5 + Math.random() * 5;
      data.push({
        date,
        value: Math.round(value * 10) / 10,
      });
    }
    
    return data;
  };
  
  const generateCaseData = () => {
    const data = [];
    const today = new Date();
    
    let cumulativeCases = member.activeCases - Math.floor(Math.random() * 5) - 5;
    
    for (let i = 30; i >= 0; i--) {
      const date = subDays(today, i);
      const newCases = Math.floor(Math.random() * 2);
      const resolvedCases = Math.floor(Math.random() * 2);
      
      cumulativeCases = cumulativeCases + newCases - resolvedCases;
      if (cumulativeCases < 0) cumulativeCases = 0;
      
      data.push({
        date,
        activeCases: cumulativeCases,
        newCases,
        resolvedCases
      });
    }
    
    return data;
  };
  
  const timeData = generateTimeData();
  const caseData = generateCaseData();
  
  // Sample case types data
  const caseTypes = [
    { name: 'Housing', value: Math.floor(member.activeCases * 0.4) },
    { name: 'Financial', value: Math.floor(member.activeCases * 0.3) },
    { name: 'Health', value: Math.floor(member.activeCases * 0.2) },
    { name: 'Education', value: Math.floor(member.activeCases * 0.1) },
  ];
  
  // Sample case priority data
  const casePriorities = [
    { name: 'High', value: Math.floor(member.activeCases * 0.2) },
    { name: 'Medium', value: Math.floor(member.activeCases * 0.5) },
    { name: 'Low', value: Math.floor(member.activeCases * 0.3) },
  ];
  
  // Sample recent cases
  const recentCases = [
    { id: 'C-1234', type: 'Housing', priority: 'High', status: 'In Progress', date: subDays(new Date(), 3) },
    { id: 'C-1235', type: 'Financial', priority: 'Medium', status: 'In Progress', date: subDays(new Date(), 5) },
    { id: 'C-1236', type: 'Health', priority: 'Low', status: 'Pending', date: subDays(new Date(), 7) },
    { id: 'C-1237', type: 'Education', priority: 'Medium', status: 'In Progress', date: subDays(new Date(), 10) },
  ];
  
  // Colors for pie charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  // Helper to get role and department display names
  const getRoleName = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'manager': return 'Manager';
      case 'case-worker': return 'Case Worker';
      case 'viewer': return 'Viewer';
      default: return role;
    }
  };
  
  // Helper to get badge color for priority
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Helper to get badge color for status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-purple-100 text-purple-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <span className="font-semibold">{member.name}</span>
            <span className="text-sm font-normal text-gray-500">({member.email})</span>
          </DialogTitle>
          <DialogDescription>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                {getRoleName(member.role)}
              </span>
              <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full text-xs">
                {member.department}
              </span>
              <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs">
                {member.activeCases} active cases
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="performance" className="w-full mt-2">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="performance" className="flex items-center gap-1">
              <ChartBar className="h-4 w-4" />
              <span>Performance</span>
            </TabsTrigger>
            <TabsTrigger value="cases" className="flex items-center gap-1">
              <ClipboardList className="h-4 w-4" />
              <span>Case Load</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Recent Cases</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Average Resolution Time</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timeData}>
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(date) => format(new Date(date), 'MM/dd')}
                        minTickGap={30}
                      />
                      <YAxis />
                      <Tooltip
                        labelFormatter={(label) => format(new Date(label), 'MMM dd, yyyy')}
                        formatter={(value) => [`${value} days`, 'Avg. Resolution Time']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#0088FE" 
                        name="Resolution Time"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Case History</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={caseData}>
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(date) => format(new Date(date), 'MM/dd')}
                        minTickGap={30}
                      />
                      <YAxis />
                      <Tooltip
                        labelFormatter={(label) => format(new Date(label), 'MMM dd, yyyy')}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="activeCases" 
                        stroke="#0088FE" 
                        name="Active Cases"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border col-span-1 md:col-span-2">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Monthly Case Metrics</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={caseData.filter((_, i) => i % 4 === 0)}>
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(date) => format(new Date(date), 'MM/dd')}
                      />
                      <YAxis />
                      <Tooltip
                        labelFormatter={(label) => format(new Date(label), 'MMM dd, yyyy')}
                      />
                      <Bar dataKey="newCases" fill="#0088FE" name="New Cases" />
                      <Bar dataKey="resolvedCases" fill="#00C49F" name="Resolved Cases" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Performance Summary</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded bg-blue-50 border border-blue-100">
                    <p className="text-sm text-blue-800">Cases per month: <span className="font-bold">8</span></p>
                    <div className="w-full bg-blue-200 rounded-full h-1.5 mt-1">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded bg-green-50 border border-green-100">
                    <p className="text-sm text-green-800">Resolution rate: <span className="font-bold">92%</span></p>
                    <div className="w-full bg-green-200 rounded-full h-1.5 mt-1">
                      <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded bg-purple-50 border border-purple-100">
                    <p className="text-sm text-purple-800">Client satisfaction: <span className="font-bold">89%</span></p>
                    <div className="w-full bg-purple-200 rounded-full h-1.5 mt-1">
                      <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '89%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="cases" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Case Types</h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={caseTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {caseTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Case Priorities</h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={casePriorities}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {casePriorities.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Case Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-lg font-bold text-blue-800">{member.activeCases}</p>
                  <p className="text-sm text-blue-600">Active Cases</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-lg font-bold text-green-800">{Math.floor(member.activeCases * 0.8)}</p>
                  <p className="text-sm text-green-600">Resolved this month</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-lg font-bold text-purple-800">{Math.floor(member.activeCases * 1.2)}</p>
                  <p className="text-sm text-purple-600">Total cases handled</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="mt-4">
            <div className="bg-white rounded-lg border">
              <h3 className="text-sm font-medium text-gray-700 p-4 border-b">Recent Case Activity</h3>
              <div className="divide-y">
                {recentCases.map((caseItem) => (
                  <div key={caseItem.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{caseItem.id}</p>
                        <p className="text-sm text-gray-500">{caseItem.type}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${getPriorityColor(caseItem.priority)}`}>
                          {caseItem.priority}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(caseItem.status)}`}>
                          {caseItem.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {format(caseItem.date, 'MMM dd, yyyy')}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <Button variant="outline" className="w-full">View All Cases</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button onClick={onEdit} className="gap-1">
            <UserCog className="h-4 w-4" />
            Edit Member
          </Button>
          <Button onClick={onAssignCase} className="gap-1">
            <UserPlus className="h-4 w-4" />
            Assign Case
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TeamMemberDetails;
