
import React from 'react';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  
  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const startDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  
  const formatMonth = (date: Date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };
  
  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const renderCalendarDays = () => {
    const days = [];
    const monthDays = daysInMonth(currentMonth);
    const startDay = startDayOfMonth(currentMonth);
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border bg-gray-50"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= monthDays; day++) {
      const isToday = new Date().getDate() === day && 
                    new Date().getMonth() === currentMonth.getMonth() && 
                    new Date().getFullYear() === currentMonth.getFullYear();
      
      days.push(
        <div 
          key={day} 
          className={`h-24 border p-1 relative ${isToday ? 'bg-blue-50 border-blue-200' : ''}`}
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : ''}`}>{day}</span>
            {day % 5 === 0 && (
              <button className="text-gray-400 hover:text-gray-600">
                <Plus className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* Sample events - just for demonstration */}
          {day === 15 && (
            <div className="mt-1 text-xs bg-blue-100 text-blue-800 p-1 rounded">
              Team Meeting (10:00 AM)
            </div>
          )}
          {day === 22 && (
            <div className="mt-1 text-xs bg-green-100 text-green-800 p-1 rounded">
              Client Interview (2:30 PM)
            </div>
          )}
          {day === 7 && (
            <div className="mt-1 text-xs bg-purple-100 text-purple-800 p-1 rounded">
              Training Session (9:00 AM)
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  return (
    <AdminDashboardLayout>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
          <div className="flex items-center gap-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Event
            </button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                <span>{formatMonth(currentMonth)}</span>
              </CardTitle>
              <div className="flex items-center gap-2">
                <button 
                  onClick={previousMonth}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date())}
                  className="px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
                >
                  Today
                </button>
                <button 
                  onClick={nextMonth}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-px mb-px">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center py-2 bg-gray-50 font-medium text-sm">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-px">
              {renderCalendarDays()}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Team Meeting", date: "Today, 10:00 AM", location: "Conference Room A" },
                { title: "Client Interview - Johnson Family", date: "Tomorrow, 2:30 PM", location: "Meeting Room 1" },
                { title: "Monthly Department Review", date: "March 25, 9:00 AM", location: "Main Office" },
                { title: "Training Session: New Case Management System", date: "March 28, 11:00 AM", location: "Training Center" },
                { title: "Community Outreach Planning", date: "April 2, 3:00 PM", location: "Virtual Meeting" },
              ].map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <CalendarIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-500">{event.date} • {event.location}</p>
                    </div>
                  </div>
                  <button className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded">
                    Details
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
};

export default Calendar;
