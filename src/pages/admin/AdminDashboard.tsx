
import {
  Activity,
  AlertCircle,
  BarChart,
  Bell,
  Shield,
  Users,
  Settings,
  Server,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const activityData = [
  { name: "Mon", users: 15, actions: 45 },
  { name: "Tue", users: 20, actions: 60 },
  { name: "Wed", users: 25, actions: 75 },
  { name: "Thu", users: 22, actions: 65 },
  { name: "Fri", users: 30, actions: 90 },
  { name: "Sat", users: 10, actions: 30 },
  { name: "Sun", users: 5, actions: 15 },
];

const AdminDashboard = () => {
  return (
    <Layout userType="admin">
      <div className="animate-fade-in space-y-6">
        <div>
          <h1 className="text-3xl font-bold">System Administration</h1>
          <p className="text-muted-foreground">
            Welcome back, Admin. Here's an overview of the system status.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value="1,250"
            icon={Users}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="System Status"
            value="Healthy"
            icon={Server}
            description="All services operational"
          />
          <StatCard
            title="Security Alerts"
            value="0"
            icon={Shield}
            trend={{ value: 2, isPositive: true }}
          />
          <StatCard
            title="Pending Approvals"
            value="12"
            icon={Bell}
            description="8 user registrations, 4 role changes"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>System Activity</CardTitle>
              <CardDescription>User activity over the last week</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="users"
                    name="Active Users"
                    stroke="#0ea5e9"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="actions"
                    name="User Actions"
                    stroke="#a855f7"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
              <CardDescription>Users by role</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Students</span>
                    <span className="text-sm text-muted-foreground">850 users</span>
                  </div>
                  <Progress value={68} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Placement Department</span>
                    <span className="text-sm text-muted-foreground">50 users</span>
                  </div>
                  <Progress value={4} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Employers</span>
                    <span className="text-sm text-muted-foreground">345 users</span>
                  </div>
                  <Progress value={27.6} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Administrators</span>
                    <span className="text-sm text-muted-foreground">5 users</span>
                  </div>
                  <Progress value={0.4} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Manage Users
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>System Logs</CardTitle>
            <CardDescription>Recent system activities and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="whitespace-nowrap">
                    Today, 09:42 AM
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-blue-500" />
                      <span>Info</span>
                    </div>
                  </TableCell>
                  <TableCell>User login successful</TableCell>
                  <TableCell>john.doe@example.com</TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost">
                      Details
                    </Button>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="whitespace-nowrap">
                    Today, 08:30 AM
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>Security</span>
                    </div>
                  </TableCell>
                  <TableCell>Password changed</TableCell>
                  <TableCell>admin@placesuccess.com</TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost">
                      Details
                    </Button>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="whitespace-nowrap">
                    Yesterday, 11:15 PM
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      <span>Warning</span>
                    </div>
                  </TableCell>
                  <TableCell>Failed login attempt (3rd try)</TableCell>
                  <TableCell>jane.smith@example.com</TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost">
                      Details
                    </Button>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="whitespace-nowrap">
                    Yesterday, 10:05 AM
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-violet-500" />
                      <span>Config</span>
                    </div>
                  </TableCell>
                  <TableCell>System settings updated</TableCell>
                  <TableCell>admin@placesuccess.com</TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost">
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Logs
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
