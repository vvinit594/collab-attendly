import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

const AttendanceCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Mock attendance data
  const attendanceData = {
    "2024-01-15": "present",
    "2024-01-16": "present", 
    "2024-01-17": "absent",
    "2024-01-18": "present",
    "2024-01-19": "late",
    "2024-01-22": "present",
    "2024-01-23": "present",
    "2024-01-24": "leave",
    "2024-01-25": "present",
    "2024-01-26": "present",
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const getDateKey = (day: number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month, day).toISOString().split('T')[0];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present": return "bg-present text-present-foreground";
      case "absent": return "bg-absent text-absent-foreground";
      case "late": return "bg-late text-late-foreground";
      case "leave": return "bg-leave text-leave-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const attendanceStats = {
    present: Object.values(attendanceData).filter(status => status === "present").length,
    absent: Object.values(attendanceData).filter(status => status === "absent").length,
    late: Object.values(attendanceData).filter(status => status === "late").length,
    leave: Object.values(attendanceData).filter(status => status === "leave").length,
  };

  const totalDays = Object.keys(attendanceData).length;
  const attendancePercentage = totalDays > 0 ? Math.round((attendanceStats.present / totalDays) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Calendar Header with Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Attendance Calendar
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => navigateMonth(-1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="text-lg font-semibold min-w-[160px] text-center">
                  {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <Button variant="outline" size="sm" onClick={() => navigateMonth(1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Day headers */}
              {daysOfWeek.map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
              
              {/* Calendar days */}
              {getDaysInMonth(currentDate).map((day, index) => {
                if (!day) {
                  return <div key={index} className="p-2"></div>;
                }

                const dateKey = getDateKey(day);
                const status = attendanceData[dateKey];
                const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

                return (
                  <div
                    key={day}
                    className={`
                      relative p-2 text-center text-sm rounded-lg border cursor-pointer transition-colors
                      ${isToday ? 'ring-2 ring-primary' : ''}
                      ${status ? getStatusColor(status) : 'bg-background hover:bg-muted'}
                    `}
                  >
                    <span className={status ? 'font-semibold' : ''}>{day}</span>
                    {status && (
                      <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-lg opacity-60"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Stats Sidebar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{attendancePercentage}%</div>
              <p className="text-sm text-muted-foreground">Overall Attendance</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-present"></div>
                  <span className="text-sm">Present</span>
                </div>
                <Badge variant="secondary" className="text-present bg-present/10">
                  {attendanceStats.present}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-absent"></div>
                  <span className="text-sm">Absent</span>
                </div>
                <Badge variant="secondary" className="text-absent bg-absent/10">
                  {attendanceStats.absent}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-late"></div>
                  <span className="text-sm">Late</span>
                </div>
                <Badge variant="secondary" className="text-late bg-late/10">
                  {attendanceStats.late}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-leave"></div>
                  <span className="text-sm">Leave</span>
                </div>
                <Badge variant="secondary" className="text-leave bg-leave/10">
                  {attendanceStats.leave}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-present flex items-center justify-center">
                <span className="text-xs font-semibold text-present-foreground">P</span>
              </div>
              <span className="text-sm">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-absent flex items-center justify-center">
                <span className="text-xs font-semibold text-absent-foreground">A</span>
              </div>
              <span className="text-sm">Absent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-late flex items-center justify-center">
                <span className="text-xs font-semibold text-late-foreground">L</span>
              </div>
              <span className="text-sm">Late</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-leave flex items-center justify-center">
                <span className="text-xs font-semibold text-leave-foreground">V</span>
              </div>
              <span className="text-sm">Leave</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceCalendar;