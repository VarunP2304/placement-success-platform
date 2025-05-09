
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import StudentApplications from "./pages/student/StudentApplications";
import StudentInterviews from "./pages/student/StudentInterviews";
import PlacementDashboard from "./pages/placement/PlacementDashboard";
import PlacementCompanies from "./pages/placement/PlacementCompanies";
import PlacementDrives from "./pages/placement/PlacementDrives";
import PlacementReports from "./pages/placement/PlacementReports";
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import EmployerProfile from "./pages/employer/EmployerProfile";
import EmployerJobs from "./pages/employer/EmployerJobs";
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Student Routes */}
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/student-applications" element={<StudentApplications />} />
          <Route path="/student-interviews" element={<StudentInterviews />} />
          
          {/* Placement Department Routes */}
          <Route path="/placement-dashboard" element={<PlacementDashboard />} />
          <Route path="/placement-companies" element={<PlacementCompanies />} />
          <Route path="/placement-drives" element={<PlacementDrives />} />
          <Route path="/placement-reports" element={<PlacementReports />} />
          
          {/* Employer Routes */}
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="/employer-profile" element={<EmployerProfile />} />
          <Route path="/employer-jobs" element={<EmployerJobs />} />
          
          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
