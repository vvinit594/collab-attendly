import { useState } from "react";
import Layout from "@/components/Layout";
import StudentDashboard from "@/components/dashboards/StudentDashboard";
import TeacherDashboard from "@/components/dashboards/TeacherDashboard";
import AttendanceCalendar from "@/components/attendance/AttendanceCalendar";
import BulkAttendanceForm from "@/components/attendance/BulkAttendanceForm";
import AttendanceReports from "@/components/reports/AttendanceReports";

const Index = () => {
  const [currentUser] = useState<{
    name: string;
    role: 'student' | 'teacher' | 'hod' | 'admin';
    id: string;
  }>({
    name: "Prof. Michael Chen",
    role: "teacher", // Change this to test different roles: 'student' | 'teacher' | 'hod' | 'admin'
    id: "teacher_001"
  });
  
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPageContent = () => {
    switch (currentPage) {
      case "dashboard":
        if (currentUser.role === "student") {
          return <StudentDashboard />;
        } else {
          return <TeacherDashboard />;
        }
      
      case "calendar":
      case "my-attendance":
        return <AttendanceCalendar />;
      
      case "mark-attendance":
        return <BulkAttendanceForm />;
      
      case "reports":
      case "analytics":
        return <AttendanceReports />;
      
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Coming Soon</h2>
              <p className="text-muted-foreground">This feature is under development.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <Layout
      userRole={currentUser.role}
      userName={currentUser.name}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    >
      {renderPageContent()}
    </Layout>
  );
};

export default Index;
