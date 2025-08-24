import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Download,
  FileText,
  Calendar,
  TrendingDown,
  TrendingUp,
  Users,
  BarChart3
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AttendanceReports = () => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [reportType, setReportType] = useState("");

  // Mock data for reports
  const reportData = {
    summary: {
      totalStudents: 150,
      averageAttendance: 87.5,
      totalClasses: 45,
      lowAttendanceCount: 12
    },
    classWiseStats: [
      { class: "10th A", students: 30, attendance: 92.3, trend: "up" },
      { class: "10th B", students: 28, attendance: 89.1, trend: "down" },
      { class: "11th A", students: 32, attendance: 85.7, trend: "up" },
      { class: "11th B", students: 30, attendance: 90.2, trend: "up" },
      { class: "12th A", students: 30, attendance: 84.3, trend: "down" },
    ],
    subjectWiseStats: [
      { subject: "Mathematics", attendance: 88.5, classes: 12 },
      { subject: "Physics", attendance: 85.2, classes: 10 },
      { subject: "Chemistry", attendance: 87.8, classes: 8 },
      { subject: "English", attendance: 91.3, classes: 8 },
      { subject: "Computer Science", attendance: 89.7, classes: 7 },
    ],
    lowAttendanceStudents: [
      { name: "Alex Brown", class: "10th A", attendance: 68, trend: "critical" },
      { name: "Lisa Chen", class: "10th B", attendance: 72, trend: "warning" },
      { name: "David Wilson", class: "12th A", attendance: 74, trend: "warning" },
      { name: "Maria Garcia", class: "11th A", attendance: 69, trend: "critical" },
      { name: "James Miller", class: "10th A", attendance: 71, trend: "warning" },
    ]
  };

  const classes = [
    { value: "all", label: "All Classes" },
    { value: "10a", label: "10th A" },
    { value: "10b", label: "10th B" },
    { value: "11a", label: "11th A" },
    { value: "11b", label: "11th B" },
    { value: "12a", label: "12th A" },
  ];

  const subjects = [
    { value: "all", label: "All Subjects" },
    { value: "math", label: "Mathematics" },
    { value: "physics", label: "Physics" },
    { value: "chemistry", label: "Chemistry" },
    { value: "english", label: "English" },
    { value: "computer", label: "Computer Science" },
  ];

  const reportTypes = [
    { value: "summary", label: "Summary Report" },
    { value: "detailed", label: "Detailed Report" },
    { value: "monthly", label: "Monthly Report" },
    { value: "student-wise", label: "Student-wise Report" },
    { value: "class-wise", label: "Class-wise Report" },
  ];

  const handleGenerateReport = (format: 'pdf' | 'excel') => {
    toast({
      title: `${format.toUpperCase()} Report Generated`,
      description: `Your attendance report has been generated and will download shortly.`,
    });
    // In real app, this would trigger file download
  };

  const getAttendanceTrend = (attendance: number) => {
    if (attendance >= 90) return { color: "present", label: "Excellent", icon: TrendingUp };
    if (attendance >= 80) return { color: "leave", label: "Good", icon: TrendingUp };
    if (attendance >= 75) return { color: "late", label: "Fair", icon: TrendingDown };
    return { color: "absent", label: "Poor", icon: TrendingDown };
  };

  return (
    <div className="space-y-6">
      {/* Report Filters */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Generate Attendance Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="report-type">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="class-filter">Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map(cls => (
                    <SelectItem key={cls.value} value={cls.value}>
                      {cls.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="subject-filter">Subject</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subject => (
                    <SelectItem key={subject.value} value={subject.value}>
                      {subject.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date-from">From Date</Label>
              <Input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="date-to">To Date</Label>
              <Input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={() => handleGenerateReport('pdf')} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Generate PDF
            </Button>
            <Button variant="outline" onClick={() => handleGenerateReport('excel')} className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Generate Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-3xl font-bold text-primary">{reportData.summary.totalStudents}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Attendance</p>
                <p className="text-3xl font-bold text-primary">{reportData.summary.averageAttendance}%</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-present/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-present" />
              </div>
            </div>
            <Progress value={reportData.summary.averageAttendance} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Classes</p>
                <p className="text-3xl font-bold text-primary">{reportData.summary.totalClasses}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-leave/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-leave" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Low Attendance</p>
                <p className="text-3xl font-bold text-absent">{reportData.summary.lowAttendanceCount}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-absent/10 flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-absent" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Students below 75%</p>
          </CardContent>
        </Card>
      </div>

      {/* Class-wise Performance */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>Class-wise Attendance Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportData.classWiseStats.map((classData, index) => {
              const trend = getAttendanceTrend(classData.attendance);
              const TrendIcon = trend.icon;
              
              return (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-primary">{classData.class.split(' ')[0]}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{classData.class}</h4>
                      <p className="text-sm text-muted-foreground">{classData.students} students</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold">{classData.attendance}%</p>
                      <Badge variant="secondary" className={`text-${trend.color} bg-${trend.color}/10`}>
                        {trend.label}
                      </Badge>
                    </div>
                    <TrendIcon className={`h-5 w-5 text-${classData.trend === 'up' ? 'present' : 'absent'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Subject-wise and Low Attendance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Subject-wise Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reportData.subjectWiseStats.map((subject, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium text-sm">{subject.subject}</p>
                    <p className="text-xs text-muted-foreground">{subject.classes} classes</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{subject.attendance}%</p>
                    <Progress value={subject.attendance} className="w-16 h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-absent">Students Needing Attention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reportData.lowAttendanceStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-absent/5 border border-absent/20">
                  <div>
                    <p className="font-medium text-sm">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.class}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-absent">{student.attendance}%</p>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${student.trend === 'critical' ? 'text-absent bg-absent/10' : 'text-late bg-late/10'}`}
                    >
                      {student.trend}
                    </Badge>
                  </div>
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

export default AttendanceReports;