
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StudentProfile from "./pages/student/StudentProfile";
import PlacementDashboard from "./pages/placement/PlacementDashboard";
import PlacementReports from "./pages/placement/PlacementReports";
import PlacementStudents from "./pages/placement/PlacementStudents";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-sans antialiased">
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Student Routes */}
          <Route path="/student-profile" element={<StudentProfile />} />
          
          {/* Placement Department Routes */}
          <Route path="/placement-dashboard" element={<PlacementDashboard />} />
          <Route path="/placement-reports" element={<PlacementReports />} />
          <Route path="/placement-students" element={<PlacementStudents />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
