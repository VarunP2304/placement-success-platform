
import { BarChart, BookOpen, Calendar, FileText, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import StatCard from "@/components/dashboard/StatCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const StudentDashboard = () => {
  return (
    <Layout userType="student">
      <div className="animate-fade-in space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, John. Here's an overview of your placement journey.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Profile Completion"
            value="85%"
            icon={FileText}
            description="Complete your profile to increase visibility"
          />
          <StatCard
            title="Active Applications"
            value="3"
            icon={Calendar}
            trend={{ value: 20, isPositive: true }}
          />
          <StatCard
            title="Upcoming Interviews"
            value="2"
            icon={Users}
            description="Next: Google on May 10"
          />
          <StatCard
            title="Resources Completed"
            value="12"
            icon={BookOpen}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Latest Placement Drives</CardTitle>
              <CardDescription>Recently posted opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Google</TableCell>
                    <TableCell>Software Engineer</TableCell>
                    <TableCell>May 15, 2024</TableCell>
                    <TableCell>
                      <Button size="sm">Apply</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Microsoft</TableCell>
                    <TableCell>Product Manager</TableCell>
                    <TableCell>May 18, 2024</TableCell>
                    <TableCell>
                      <Button size="sm">Apply</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Amazon</TableCell>
                    <TableCell>Data Scientist</TableCell>
                    <TableCell>May 20, 2024</TableCell>
                    <TableCell>
                      <Button size="sm">Apply</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills Assessment</CardTitle>
              <CardDescription>Your proficiency in key skills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Programming</span>
                  <span className="text-sm font-medium">80%</span>
                </div>
                <Progress value={80} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Problem Solving</span>
                  <span className="text-sm font-medium">75%</span>
                </div>
                <Progress value={75} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Communication</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <Progress value={65} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Teamwork</span>
                  <span className="text-sm font-medium">90%</span>
                </div>
                <Progress value={90} />
              </div>
              <Button variant="outline" className="w-full mt-2">
                View Detailed Analysis
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
            <CardDescription>
              Your scheduled interviews and preparation status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Preparation</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Google</TableCell>
                  <TableCell>Software Engineer</TableCell>
                  <TableCell>May 10, 2024 • 10:00 AM</TableCell>
                  <TableCell>Virtual</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={60} className="w-24" />
                      <span className="text-xs">60%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      Prepare
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Amazon</TableCell>
                  <TableCell>SDE Intern</TableCell>
                  <TableCell>May 15, 2024 • 2:00 PM</TableCell>
                  <TableCell>On-Campus</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={30} className="w-24" />
                      <span className="text-xs">30%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      Prepare
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
