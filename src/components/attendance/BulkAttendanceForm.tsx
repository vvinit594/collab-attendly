import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  Search, 
  Check, 
  XCircle, 
  Save,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  status: 'present' | 'absent' | 'late';
}

const BulkAttendanceForm = () => {
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState<Student[]>([
    { id: "1", name: "Alice Johnson", rollNumber: "10A001", class: "10th A", status: "present" },
    { id: "2", name: "Bob Smith", rollNumber: "10A002", class: "10th A", status: "present" },
    { id: "3", name: "Charlie Brown", rollNumber: "10A003", class: "10th A", status: "present" },
    { id: "4", name: "Diana Prince", rollNumber: "10A004", class: "10th A", status: "present" },
    { id: "5", name: "Edward Norton", rollNumber: "10A005", class: "10th A", status: "present" },
    { id: "6", name: "Fiona Green", rollNumber: "10A006", class: "10th A", status: "present" },
    { id: "7", name: "George Wilson", rollNumber: "10A007", class: "10th A", status: "present" },
    { id: "8", name: "Hannah Davis", rollNumber: "10A008", class: "10th A", status: "present" },
  ]);

  const classes = [
    { value: "10a", label: "10th A" },
    { value: "10b", label: "10th B" },
    { value: "11a", label: "11th A" },
    { value: "11b", label: "11th B" },
    { value: "12a", label: "12th A" },
    { value: "12b", label: "12th B" },
  ];

  const subjects = [
    { value: "math", label: "Mathematics" },
    { value: "physics", label: "Physics" },
    { value: "chemistry", label: "Chemistry" },
    { value: "english", label: "English" },
    { value: "computer", label: "Computer Science" },
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateStudentStatus = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setStudents(prev => prev.map(student => 
      student.id === studentId ? { ...student, status } : student
    ));
  };

  const markAllPresent = () => {
    setStudents(prev => prev.map(student => ({ ...student, status: 'present' as const })));
  };

  const markAllAbsent = () => {
    setStudents(prev => prev.map(student => ({ ...student, status: 'absent' as const })));
  };

  const handleSaveAttendance = () => {
    // In real app, this would make an API call
    toast({
      title: "Attendance Saved",
      description: `Attendance has been marked for ${students.length} students.`,
    });
  };

  const getStatusStats = () => {
    const present = students.filter(s => s.status === 'present').length;
    const absent = students.filter(s => s.status === 'absent').length;
    const late = students.filter(s => s.status === 'late').length;
    return { present, absent, late, total: students.length };
  };

  const stats = getStatusStats();

  return (
    <div className="space-y-6">
      {/* Class and Subject Selection */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Bulk Attendance Marking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="class-select">Select Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose class" />
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
              <Label htmlFor="subject-select">Select Subject</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose subject" />
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
            <div className="flex items-end">
              <Button className="w-full" disabled={!selectedClass || !selectedSubject}>
                Load Students
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Students</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-present">{stats.present}</div>
            <p className="text-sm text-muted-foreground">Present</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-absent">{stats.absent}</div>
            <p className="text-sm text-muted-foreground">Absent</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-late">{stats.late}</div>
            <p className="text-sm text-muted-foreground">Late</p>
          </CardContent>
        </Card>
      </div>

      {/* Bulk Actions and Search */}
      <Card className="shadow-medium">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              <Button variant="outline" onClick={markAllPresent} className="text-present border-present/30">
                <Check className="h-4 w-4 mr-2" />
                Mark All Present
              </Button>
              <Button variant="outline" onClick={markAllAbsent} className="text-absent border-absent/30">
                <XCircle className="h-4 w-4 mr-2" />
                Mark All Absent
              </Button>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>Students Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-primary">
                      {student.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Roll: {student.rollNumber}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant={student.status === 'present' ? 'default' : 'outline'}
                    onClick={() => updateStudentStatus(student.id, 'present')}
                    className={student.status === 'present' ? 'bg-present hover:bg-present/90' : 'border-present/30 text-present'}
                  >
                    Present
                  </Button>
                  <Button
                    size="sm"
                    variant={student.status === 'absent' ? 'default' : 'outline'}
                    onClick={() => updateStudentStatus(student.id, 'absent')}
                    className={student.status === 'absent' ? 'bg-absent hover:bg-absent/90' : 'border-absent/30 text-absent'}
                  >
                    Absent
                  </Button>
                  <Button
                    size="sm"
                    variant={student.status === 'late' ? 'default' : 'outline'}
                    onClick={() => updateStudentStatus(student.id, 'late')}
                    className={student.status === 'late' ? 'bg-late hover:bg-late/90' : 'border-late/30 text-late'}
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    Late
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSaveAttendance}
          className="bg-gradient-primary hover:opacity-90"
          size="lg"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Attendance
        </Button>
      </div>
    </div>
  );
};

export default BulkAttendanceForm;