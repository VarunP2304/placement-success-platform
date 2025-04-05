
import {
  BarChart,
  Building2,
  Calendar,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { department: "CSE", placed: 85, total: 100 },
  { department: "ECE", placed: 70, total: 90 },
  { department: "ME", placed: 50, total: 75 },
  { department: "CE", placed: 40, total: 60 },
  { department: "EE", placed: 45, total: 65 },
];

const PlacementDashboard = () => {
  return (
    <Layout userType="placement">
      <div className="animate-fade-in space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Placement Department Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Admin. Here's an overview of the placement activities.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Students"
            value="450"
            icon={Users}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Companies Registered"
            value="32"
            icon={Building2}
            trend={{ value: 10, isPositive: true }}
          />
          <StatCard
            title="Ongoing Drives"
            value="8"
            icon={Calendar}
            description="3 closing this week"
          />
          <StatCard
            title="Placement Rate"
            value="78%"
            icon={TrendingUp}
            trend={{ value: 12, isPositive: true }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Drives</CardTitle>
              <CardDescription>Scheduled placement activities</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Eligible Students</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Google</TableCell>
                    <TableCell>May 10, 2024</TableCell>
                    <TableCell>120</TableCell>
                    <TableCell>
                      <Button size="sm">Manage</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Microsoft</TableCell>
                    <TableCell>May 15, 2024</TableCell>
                    <TableCell>85</TableCell>
                    <TableCell>
                      <Button size="sm">Manage</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Amazon</TableCell>
                    <TableCell>May 20, 2024</TableCell>
                    <TableCell>150</TableCell>
                    <TableCell>
                      <Button size="sm">Manage</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-secondary p-2">
                    <Building2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">New company registered</p>
                    <p className="text-sm text-muted-foreground">
                      Apple Inc. has registered for campus recruitment
                    </p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-secondary p-2">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Drive completed</p>
                    <p className="text-sm text-muted-foreground">
                      IBM drive completed with 28 offers
                    </p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-secondary p-2">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Report generated</p>
                    <p className="text-sm text-muted-foreground">
                      Monthly placement report for April 2024 generated
                    </p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Department-wise Placement Statistics</CardTitle>
            <CardDescription>
              Current placement status across departments
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => {
                    return [
                      value,
                      name === "placed" ? "Placed Students" : "Total Students",
                    ];
                  }}
                />
                <Bar dataKey="total" name="Total Students" fill="#d1d5db" />
                <Bar dataKey="placed" name="Placed Students" fill="#0ea5e9" />
              </ReBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PlacementDashboard;
