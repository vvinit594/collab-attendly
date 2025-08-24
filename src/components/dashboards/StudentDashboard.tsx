import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  TrendingUp,
  Award,
  AlertTriangle,
  Clock,
  CheckCircle2
} from "lucide-react";

const StudentDashboard = () => {
  // Mock data - in real app, this would come from props or API
  const studentData = {
    overallAttendance: 78,
    totalClasses: 120,
    attendedClasses: 94,
    recentAttendance: [
      { date: "2024-01-22", subject: "Mathematics", status: "present" },
      { date: "2024-01-22", subject: "Physics", status: "present" },
      { date: "2024-01-21", subject: "Chemistry", status: "absent" },
      { date: "2024-01-21", subject: "English", status: "present" },
      { date: "2024-01-20", subject: "Computer Science", status: "late" },
    ],
    upcomingClasses: [
      { time: "10:00 AM", subject: "Mathematics", room: "Room 101" },
      { time: "2:00 PM", subject: "Physics Lab", room: "Lab 203" },
      { time: "4:00 PM", subject: "English", room: "Room 105" },
    ],
    rewards: {
      points: 450,
      badges: ["Perfect Week", "Early Bird", "Consistent Learner"],
      currentStreak: 7
    },
    subjectWiseAttendance: [
      { subject: "Mathematics", attendance: 85, total: 25 },
      { subject: "Physics", attendance: 72, total: 25 },
      { subject: "Chemistry", attendance: 80, total: 20 },
      { subject: "English", attendance: 90, total: 20 },
      { subject: "Computer Science", attendance: 65, total: 30 },
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present": return "present";
      case "absent": return "absent";
      case "late": return "late";
      default: return "muted";
    }
  };

  const getAttendanceStatus = (percentage: number) => {
    if (percentage >= 85) return { color: "present", label: "Excellent" };
    if (percentage >= 75) return { color: "leave", label: "Good" };
    return { color: "absent", label: "Needs Improvement" };
  };

  const overallStatus = getAttendanceStatus(studentData.overallAttendance);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Attendance</p>
                <p className="text-3xl font-bold text-primary">{studentData.overallAttendance}%</p>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-${overallStatus.color}/10 flex items-center justify-center`}>
                <TrendingUp className={`h-6 w-6 text-${overallStatus.color}`} />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={studentData.overallAttendance} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {studentData.attendedClasses}/{studentData.totalClasses} classes attended
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reward Points</p>
                <p className="text-3xl font-bold text-primary">{studentData.rewards.points}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-leave/10 flex items-center justify-center">
                <Award className="h-6 w-6 text-leave" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              {studentData.rewards.currentStreak} day streak
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Classes Today</p>
                <p className="text-3xl font-bold text-primary">{studentData.upcomingClasses.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Next: {studentData.upcomingClasses[0]?.time || "No more classes"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <Badge variant="secondary" className={`text-${overallStatus.color} bg-${overallStatus.color}/10`}>
                  {overallStatus.label}
                </Badge>
              </div>
              <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center">
                {studentData.overallAttendance >= 75 ? (
                  <CheckCircle2 className="h-6 w-6 text-present" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-absent" />
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              {studentData.overallAttendance >= 75 ? "Above minimum requirement" : "Below 75% threshold"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Attendance */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {studentData.recentAttendance.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium text-sm">{record.subject}</p>
                    <p className="text-xs text-muted-foreground">{record.date}</p>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`text-${getStatusColor(record.status)} bg-${getStatusColor(record.status)}/10 capitalize`}
                  >
                    {record.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
              {studentData.upcomingClasses.map((class_, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <div>
                    <p className="font-medium text-sm">{class_.subject}</p>
                    <p className="text-xs text-muted-foreground">{class_.room}</p>
                  </div>
                  <Badge variant="outline" className="text-primary border-primary/30">
                    {class_.time}
                  </Badge>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View Full Schedule
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Subject-wise Attendance */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>Subject-wise Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studentData.subjectWiseAttendance.map((subject, index) => (
              <div key={index} className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{subject.subject}</h4>
                  <span className="text-sm font-semibold">{subject.attendance}%</span>
                </div>
                <Progress value={subject.attendance} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">
                  {Math.round(subject.attendance * subject.total / 100)}/{subject.total} classes
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rewards Section */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements & Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Your Badges</h4>
              <div className="flex flex-wrap gap-2">
                {studentData.rewards.badges.map((badge, index) => (
                  <Badge key={index} variant="secondary" className="bg-leave/10 text-leave">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Current Streak</h4>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-gradient-success flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{studentData.rewards.currentStreak}</span>
                </div>
                <div>
                  <p className="font-medium">Perfect Attendance Days</p>
                  <p className="text-sm text-muted-foreground">Keep it up!</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;