
import React, { useState, useMemo } from 'react';
import { TeamMember } from './TeamMemberForm';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { ChartLine, ChartBar, Gauge, Activity } from 'lucide-react';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { format, subDays, subMonths, isWithinInterval } from 'date-fns';

interface TeamPerformanceMetricsProps {
  members: TeamMember[];
}

// Sample historical data generator
const generateHistoricalData = (days: number, baseline: number, variance: number) => {
  const data = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = subDays(today, i);
    const value = baseline + Math.random() * variance - variance / 2;
    data.push({
      date,
      value: Math.max(0, Math.round(value * 10) / 10),
    });
  }
  
  return data;
};

const TeamPerformanceMetrics = ({ members }: TeamPerformanceMetricsProps) => {
  const today = new Date();
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(today, 7),
    to: today
  });
  
  // Historical data for trends
  const [historicalCases] = useState(generateHistoricalData(90, 25, 10));
  const [historicalResolution] = useState(generateHistoricalData(90, 8.3, 3));
  
  // Filter historical data based on selected date range
  const filteredCasesData = useMemo(() => {
    if (!dateRange.from || !dateRange.to) return historicalCases;
    
    return historicalCases.filter(item => 
      isWithinInterval(item.date, { start: dateRange.from, end: dateRange.to })
    );
  }, [historicalCases, dateRange]);
  
  const filteredResolutionData = useMemo(() => {
    if (!dateRange.from || !dateRange.to) return historicalResolution;
    
    return historicalResolution.filter(item => 
      isWithinInterval(item.date, { start: dateRange.from, end: dateRange.to })
    );
  }, [historicalResolution, dateRange]);
  
  // Calculate performance metrics
  const totalCases = members.reduce((sum, member) => sum + member.activeCases, 0);
  const avgCasesPerMember = members.length > 0 ? totalCases / members.length : 0;
  
  // Calculate case change based on historical data
  const calculateCaseChange = () => {
    if (filteredCasesData.length < 2) return { value: 0, isPositive: true };
    
    const currentValue = filteredCasesData[filteredCasesData.length - 1].value;
    const previousValue = filteredCasesData[0].value;
    const percentChange = previousValue > 0 ? ((currentValue - previousValue) / previousValue) * 100 : 0;
    
    return {
      value: percentChange,
      isPositive: percentChange >= 0
    };
  };
  
  // Calculate resolution time change based on historical data
  const calculateResolutionChange = () => {
    if (filteredResolutionData.length < 2) return { value: 0, isPositive: true };
    
    const currentValue = filteredResolutionData[filteredResolutionData.length - 1].value;
    const previousValue = filteredResolutionData[0].value;
    const percentChange = ((previousValue - currentValue) / previousValue) * 100;
    
    return {
      value: percentChange,
      isPositive: percentChange >= 0
    };
  };

  const caseChange = calculateCaseChange();
  const resolutionChange = calculateResolutionChange();
  
  // Current resolution time (latest value from historical data)
  const currentResolutionTime = filteredResolutionData.length > 0 
    ? filteredResolutionData[filteredResolutionData.length - 1].value 
    : 8.3;
  
  // Department distribution data
  const departmentDistribution = members.reduce((acc: Record<string, number>, member) => {
    acc[member.department] = (acc[member.department] || 0) + 1;
    return acc;
  }, {});
  
  const departmentData = Object.entries(departmentDistribution).map(([name, value]) => ({
    name,
    value
  }));
  
  // Role distribution data
  const roleDistribution = members.reduce((acc: Record<string, number>, member) => {
    acc[member.role] = (acc[member.role] || 0) + 1;
    return acc;
  }, {});
  
  const roleData = Object.entries(roleDistribution).map(([name, value]) => ({
    name: name === 'admin' ? 'Admin' : 
          name === 'manager' ? 'Manager' : 
          name === 'case-worker' ? 'Case Worker' : 'Viewer',
    value
  }));

  // Case distribution by department
  const casesData = Object.entries(
    members.reduce((acc: Record<string, number>, member) => {
      acc[member.department] = (acc[member.department] || 0) + member.activeCases;
      return acc;
    }, {})
  ).map(([name, value]) => ({
    name,
    cases: value
  }));

  // Colors for pie charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Format date for display
  const formatDateForDisplay = (date: Date | undefined) => {
    return date ? format(date, 'MMM dd, yyyy') : '';
  };

  return (
    <div className="space-y-8">
      {/* Time range selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-sm font-medium text-gray-700">
          {dateRange.from && dateRange.to 
            ? `Showing data from ${formatDateForDisplay(dateRange.from)} to ${formatDateForDisplay(dateRange.to)}`
            : 'Select a date range'
          }
        </h3>
        <DateRangePicker
          from={dateRange.from}
          to={dateRange.to}
          onSelect={(range) => setDateRange({
            from: range.from || subDays(today, 7),
            to: range.to || today
          })}
        />
      </div>

      {/* KPI metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <ChartBar className="h-5 w-5 text-blue-600" />
            <h3 className="text-sm font-medium text-gray-700">Total Cases</h3>
          </div>
          <p className="text-2xl font-bold">{totalCases}</p>
          <p className={`text-xs ${caseChange.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {caseChange.isPositive ? '↑' : '↓'} {Math.abs(caseChange.value).toFixed(1)}% from previous period
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <ChartLine className="h-5 w-5 text-green-600" />
            <h3 className="text-sm font-medium text-gray-700">Avg. Resolution Time</h3>
          </div>
          <p className="text-2xl font-bold">{currentResolutionTime.toFixed(1)} days</p>
          <p className={`text-xs ${resolutionChange.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {resolutionChange.isPositive ? '↓' : '↑'} {Math.abs(resolutionChange.value).toFixed(1)}% from previous period
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="h-5 w-5 text-purple-600" />
            <h3 className="text-sm font-medium text-gray-700">Avg. Cases per Member</h3>
          </div>
          <p className="text-2xl font-bold">{avgCasesPerMember.toFixed(1)}</p>
          <p className="text-xs text-gray-500">
            Total of {members.length} active members
          </p>
        </div>
      </div>

      {/* Historical trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Case Load Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredCasesData}>
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => format(new Date(date), 'MM/dd')}
                  minTickGap={30}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(label) => format(new Date(label), 'MMM dd, yyyy')}
                  formatter={(value) => [`${value} cases`, 'Case Load']}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0088FE" 
                  name="Case Load"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Resolution Time Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredResolutionData}>
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => format(new Date(date), 'MM/dd')}
                  minTickGap={30}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(label) => format(new Date(label), 'MMM dd, yyyy')}
                  formatter={(value) => [`${value} days`, 'Resolution Time']}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#00C49F" 
                  name="Resolution Time"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cases by department chart */}
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Cases by Department</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={casesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cases" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Team composition by role */}
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Team Composition by Role</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roleData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {roleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department distribution */}
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Team Distribution by Department</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance metrics card */}
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-blue-600" />
            <h3 className="text-sm font-medium text-gray-700">Performance Highlights</h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-3 rounded bg-blue-50 border border-blue-100">
              <p className="text-sm text-blue-800">Client satisfaction rate: <span className="font-bold">94%</span></p>
              <div className="w-full bg-blue-200 rounded-full h-1.5 mt-1">
                <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
            
            <div className="p-3 rounded bg-green-50 border border-green-100">
              <p className="text-sm text-green-800">Case resolution success rate: <span className="font-bold">87%</span></p>
              <div className="w-full bg-green-200 rounded-full h-1.5 mt-1">
                <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            
            <div className="p-3 rounded bg-purple-50 border border-purple-100">
              <p className="text-sm text-purple-800">Team efficiency score: <span className="font-bold">82%</span></p>
              <div className="w-full bg-purple-200 rounded-full h-1.5 mt-1">
                <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPerformanceMetrics;
