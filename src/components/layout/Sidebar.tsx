
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
    { icon: User, label: "My Profile", path: "/student-profile" },
    { icon: FileText, label: "My Documents", path: "/student-documents" },
  ];

  const placementDeptLinks = [
    { icon: Home, label: "Dashboard", path: "/placement-dashboard" },
    { icon: Users, label: "Student Analytics", path: "/placement-students" },
    { icon: BarChart, label: "Reports", path: "/placement-reports" },
  ];

  let links;
  switch (userType) {
    case "student":
      links = studentLinks;
      break;
    case "placement":
      links = placementDeptLinks;
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
          </div>
        </ScrollArea>
      </aside>
    </>
  );
}
