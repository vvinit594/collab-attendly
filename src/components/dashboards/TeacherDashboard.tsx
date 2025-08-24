import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users,
  Calendar,
  ClipboardCheck,
  AlertCircle,
  TrendingUp,
  Clock,
  BookOpen
} from "lucide-react";

const TeacherDashboard = () => {
  // Mock data - in real app, this would come from props or API
  const teacherData = {
    todaysClasses: [
      { time: "09:00 AM", subject: "Mathematics", class: "10th A", room: "Room 101", marked: true },
      { time: "11:00 AM", subject: "Mathematics", class: "10th B", room: "Room 102", marked: false },
      { time: "02:00 PM", subject: "Advanced Math", class: "12th A", room: "Room 103", marked: false },
    ],
    pendingTasks: [
      { type: "attendance", count: 2, label: "Classes pending attendance marking" },
      { type: "leave", count: 5, label: "Leave requests awaiting approval" },
      { type: "reports", count: 1, label: "Weekly reports to submit" },
    ],
    classStats: {
      totalStudents: 150,
      presentToday: 142,
      attendanceRate: 94.7,
      averageAttendance: 87.5
    },
    recentActivity: [
      { action: "Marked attendance", class: "10th A Mathematics", time: "2 hours ago" },
      { action: "Approved leave request", student: "John Doe", time: "4 hours ago" },
      { action: "Generated report", class: "10th B Mathematics", time: "1 day ago" },
      { action: "Updated timetable", subject: "Advanced Math", time: "2 days ago" },
    ],
    topPerformers: [
      { name: "Sarah Wilson", attendance: 98, class: "10th A" },
      { name: "Mike Johnson", attendance: 96, class: "10th B" },
      { name: "Emma Davis", attendance: 95, class: "12th A" },
    ],
    lowAttendanceStudents: [
      { name: "Alex Brown", attendance: 68, class: "10th A" },
      { name: "Lisa Chen", attendance: 72, class: "10th B" },
      { name: "David Wilson", attendance: 74, class: "12th A" },
    ]
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Classes</p>
                <p className="text-3xl font-bold text-primary">{teacherData.todaysClasses.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              {teacherData.todaysClasses.filter(c => c.marked).length} marked, {teacherData.todaysClasses.filter(c => !c.marked).length} pending
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-3xl font-bold text-primary">{teacherData.classStats.totalStudents}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-present/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-present" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              {teacherData.classStats.presentToday} present today
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Attendance</p>
                <p className="text-3xl font-bold text-primary">{teacherData.classStats.averageAttendance}%</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-leave/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-leave" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={teacherData.classStats.averageAttendance} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Tasks</p>
                <p className="text-3xl font-bold text-primary">
                  {teacherData.pendingTasks.reduce((sum, task) => sum + task.count, 0)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-absent/10 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-absent" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Requires your attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teacherData.todaysClasses.map((class_, index) => (
                <div key={index} className={`p-4 rounded-lg border ${class_.marked ? 'bg-present/5 border-present/20' : 'bg-absent/5 border-absent/20'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-sm">{class_.subject} - {class_.class}</p>
                      <p className="text-xs text-muted-foreground">{class_.room}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs">
                        {class_.time}
                      </Badge>
                      {class_.marked ? (
                        <Badge variant="secondary" className="text-present bg-present/10 ml-2">
                          Marked
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-absent bg-absent/10 ml-2">
                          Pending
                        </Badge>
                      )}
                    </div>
                  </div>
                  {!class_.marked && (
                    <Button size="sm" className="w-full mt-2">
                      Mark Attendance
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5" />
              Pending Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teacherData.pendingTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium text-sm">{task.label}</p>
                    <p className="text-xs text-muted-foreground">Requires action</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive" className="text-xs">
                      {task.count}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View All Tasks
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="shadow-medium lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teacherData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.class || activity.student || activity.subject}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <ClipboardCheck className="h-4 w-4 mr-2" />
              Mark Attendance
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              View Students
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Class Schedule
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Student Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-present">Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teacherData.topPerformers.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-present/5 border border-present/20">
                  <div>
                    <p className="font-medium text-sm">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.class}</p>
                  </div>
                  <Badge variant="secondary" className="text-present bg-present/10">
                    {student.attendance}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-absent">Needs Attention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teacherData.lowAttendanceStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-absent/5 border border-absent/20">
                  <div>
                    <p className="font-medium text-sm">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.class}</p>
                  </div>
                  <Badge variant="secondary" className="text-absent bg-absent/10">
                    {student.attendance}%
                  </Badge>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              Contact Parents
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;