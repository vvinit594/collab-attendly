import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  ClipboardList, 
  BarChart3, 
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  userRole: 'student' | 'teacher' | 'hod' | 'admin';
  userName: string;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Layout = ({ children, userRole, userName, currentPage, onPageChange }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = {
    student: [
      { icon: LayoutDashboard, label: "Dashboard", page: "dashboard" },
      { icon: Calendar, label: "My Attendance", page: "calendar" },
      { icon: ClipboardList, label: "Leave Requests", page: "leave" },
      { icon: BarChart3, label: "Reports", page: "reports" },
    ],
    teacher: [
      { icon: LayoutDashboard, label: "Dashboard", page: "dashboard" },
      { icon: Users, label: "Mark Attendance", page: "mark-attendance" },
      { icon: Calendar, label: "Class Schedule", page: "schedule" },
      { icon: ClipboardList, label: "Leave Approvals", page: "approvals" },
      { icon: BarChart3, label: "Reports", page: "reports" },
    ],
    hod: [
      { icon: LayoutDashboard, label: "Dashboard", page: "dashboard" },
      { icon: Users, label: "Department Overview", page: "department" },
      { icon: Calendar, label: "Attendance Calendar", page: "calendar" },
      { icon: ClipboardList, label: "Leave Management", page: "leave-management" },
      { icon: BarChart3, label: "Analytics", page: "analytics" },
    ],
    admin: [
      { icon: LayoutDashboard, label: "Dashboard", page: "dashboard" },
      { icon: Users, label: "User Management", page: "users" },
      { icon: Calendar, label: "System Calendar", page: "calendar" },
      { icon: ClipboardList, label: "All Requests", page: "all-requests" },
      { icon: BarChart3, label: "System Reports", page: "system-reports" },
      { icon: Settings, label: "Settings", page: "settings" },
    ]
  };

  const currentMenuItems = menuItems[userRole];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b bg-gradient-primary">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-primary-foreground">
                AttendEase
              </h1>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-primary-foreground hover:bg-white/20"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-sm text-primary-foreground/80 mt-1 capitalize">
              {userRole} Portal
            </p>
          </div>

          {/* User Info */}
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium text-sm">{userName}</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {currentMenuItems.map((item) => (
              <Button
                key={item.page}
                variant={currentPage === item.page ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  onPageChange(item.page);
                  setSidebarOpen(false);
                }}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <Button variant="outline" className="w-full justify-start">
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Top Bar */}
        <header className="bg-card border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h2 className="text-xl font-semibold capitalize">
                {currentPage.replace('-', ' ')}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;