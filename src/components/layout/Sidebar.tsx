
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  User,
  Building2,
  BookOpen,
  FileText,
  Calendar,
  BarChart,
  Settings,
  Shield,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  isOpen: boolean;
  userType: string;
  onClose: () => void;
}

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
  active?: boolean;
}

const SidebarItem = ({ icon: Icon, label, path, active }: SidebarItemProps) => {
  return (
    <Link
      to={path}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        active
          ? "bg-sidebar-primary text-sidebar-primary-foreground"
          : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};

export default function Sidebar({ isOpen, userType, onClose }: SidebarProps) {
  const location = useLocation();
  const isMobile = useIsMobile();

  const studentLinks = [
    { icon: Home, label: "Dashboard", path: "/student-dashboard" },
    { icon: User, label: "My Profile", path: "/student-profile" },
    { icon: FileText, label: "Applications", path: "/student-applications" },
    { icon: Calendar, label: "Interviews", path: "/student-interviews" },
    { icon: BookOpen, label: "Resources", path: "/student-resources" },
    { icon: BarChart, label: "Analytics", path: "/student-analytics" },
  ];

  const placementDeptLinks = [
    { icon: Home, label: "Dashboard", path: "/placement-dashboard" },
    { icon: Building2, label: "Companies", path: "/placement-companies" },
    { icon: Users, label: "Students", path: "/placement-students" },
    { icon: Calendar, label: "Drives", path: "/placement-drives" },
    { icon: BarChart, label: "Reports", path: "/placement-reports" },
  ];

  const employerLinks = [
    { icon: Home, label: "Dashboard", path: "/employer-dashboard" },
    { icon: Building2, label: "Company Profile", path: "/employer-profile" },
    { icon: FileText, label: "Job Postings", path: "/employer-jobs" },
    { icon: Users, label: "Candidates", path: "/employer-candidates" },
    { icon: BarChart, label: "Analytics", path: "/employer-analytics" },
  ];

  const adminLinks = [
    { icon: Home, label: "Dashboard", path: "/admin-dashboard" },
    { icon: Users, label: "User Management", path: "/admin-users" },
    { icon: Shield, label: "Permissions", path: "/admin-permissions" },
    { icon: FileText, label: "System Logs", path: "/admin-logs" },
    { icon: Settings, label: "Settings", path: "/admin-settings" },
  ];

  let links;
  switch (userType) {
    case "student":
      links = studentLinks;
      break;
    case "placement":
      links = placementDeptLinks;
      break;
    case "employer":
      links = employerLinks;
      break;
    case "admin":
      links = adminLinks;
      break;
    default:
      links = [];
  }

  const sidebarClass = cn(
    "fixed inset-y-0 left-0 z-10 w-64 transform bg-sidebar transition-transform duration-300 ease-in-out",
    isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"
  );

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-[5] bg-black/50"
          onClick={onClose}
        ></div>
      )}
      <aside className={sidebarClass}>
        <ScrollArea className="h-full">
          <div className="px-3 py-4">
            <div className="mb-8 px-4">
              <h2 className="text-lg font-semibold">PlaceSuccess</h2>
              <p className="text-sm text-sidebar-foreground/70">
                Placement Management System
              </p>
            </div>
            <div className="space-y-1">
              {links.map((link) => (
                <SidebarItem
                  key={link.path}
                  icon={link.icon}
                  label={link.label}
                  path={link.path}
                  active={location.pathname === link.path}
                />
              ))}
            </div>

            <div className="mt-8 space-y-1">
              <SidebarItem
                icon={Settings}
                label="Settings"
                path="/settings"
                active={location.pathname === "/settings"}
              />
            </div>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
}
