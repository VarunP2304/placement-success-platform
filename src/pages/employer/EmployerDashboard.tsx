
import {
  BarChart,
  Building2,
  FileText,
  Users,
  Search,
  CheckCircle,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const applicationData = [
  { name: "Submitted", value: 120, color: "#0ea5e9" },
  { name: "Shortlisted", value: 75, color: "#a855f7" },
  { name: "Interviewed", value: 40, color: "#eab308" },
  { name: "Offered", value: 25, color: "#22c55e" },
];

const EmployerDashboard = () => {
  return (
    <Layout userType="employer">
      <div className="animate-fade-in space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Employer Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Google. Here's an overview of your recruitment activities.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Job Postings"
            value="5"
            icon={FileText}
            trend={{ value: 2, isPositive: true }}
          />
          <StatCard
            title="Total Applications"
            value="256"
            icon={Users}
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard
            title="Interviews Scheduled"
            value="42"
            icon={Building2}
            description="18 pending, 24 completed"
          />
          <StatCard
            title="Offers Extended"
            value="12"
            icon={CheckCircle}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Application Pipeline</CardTitle>
              <CardDescription>Current application status</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={applicationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {applicationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [value, name]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Top Job Postings</CardTitle>
              <CardDescription>Most active positions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Software Engineer</span>
                    <span className="text-sm text-muted-foreground">120 applications</span>
                  </div>
                  <Progress value={85} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Product Manager</span>
                    <span className="text-sm text-muted-foreground">85 applications</span>
                  </div>
                  <Progress value={60} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Data Scientist</span>
                    <span className="text-sm text-muted-foreground">45 applications</span>
                  </div>
                  <Progress value={35} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">UX Designer</span>
                    <span className="text-sm text-muted-foreground">35 applications</span>
                  </div>
                  <Progress value={25} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Postings
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recommended Candidates</CardTitle>
              <CardDescription>
                Top matches for your open positions
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Search className="mr-2 h-4 w-4" />
              Advanced Search
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Skills Match</TableHead>
                  <TableHead>Education</TableHead>
                  <TableHead>For Position</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">John Doe</p>
                        <p className="text-xs text-muted-foreground">
                          B.Tech, Computer Science
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={95} className="w-24" />
                      <span>95%</span>
                    </div>
                  </TableCell>
                  <TableCell>Stanford University</TableCell>
                  <TableCell>Software Engineer</TableCell>
                  <TableCell>
                    <Button size="sm">View Profile</Button>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Jane Smith</p>
                        <p className="text-xs text-muted-foreground">
                          M.S., Data Science
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={90} className="w-24" />
                      <span>90%</span>
                    </div>
                  </TableCell>
                  <TableCell>MIT</TableCell>
                  <TableCell>Data Scientist</TableCell>
                  <TableCell>
                    <Button size="sm">View Profile</Button>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>RJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Robert Johnson</p>
                        <p className="text-xs text-muted-foreground">
                          MBA, Product Management
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={85} className="w-24" />
                      <span>85%</span>
                    </div>
                  </TableCell>
                  <TableCell>Harvard Business School</TableCell>
                  <TableCell>Product Manager</TableCell>
                  <TableCell>
                    <Button size="sm">View Profile</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Candidates
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default EmployerDashboard;
