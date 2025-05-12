
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, BarChart } from "lucide-react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { placementService } from "@/services/api";
import { toast } from "sonner";

const PlacementReports = () => {
  const [reportYear, setReportYear] = useState("2025");
  
  const { data: chartData, isLoading } = useQuery({
    queryKey: ["departmentChartData"],
    queryFn: placementService.getDepartmentChartData
  });

  const departmentData = chartData?.data || [];

  const packageData = [
    {
      name: "< 5 LPA",
      value: 35,
      color: "#8884d8",
    },
    {
      name: "5-10 LPA",
      value: 65,
      color: "#83a6ed",
    },
    {
      name: "10-15 LPA",
      value: 45,
      color: "#8dd1e1",
    },
    {
      name: "15-20 LPA",
      value: 30,
      color: "#82ca9d",
    },
    {
      name: "20+ LPA",
      value: 20,
      color: "#a4de6c",
    },
  ];

  const companyWiseData = [
    { name: "Google", value: 12 },
    { name: "Microsoft", value: 8 },
    { name: "Amazon", value: 15 },
    { name: "IBM", value: 10 },
    { name: "TCS", value: 25 },
    { name: "Infosys", value: 20 },
    { name: "Wipro", value: 18 },
    { name: "Other", value: 87 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d"];
  
  const availableReports = [
    {
      id: 1,
      title: "Annual Placement Report 2024-25",
      description: "Complete placement statistics for the academic year 2024-25",
      date: "2025-08-15",
      type: "Annual",
      format: "PDF",
      size: "2.5 MB",
    },
    {
      id: 2,
      title: "Department-wise Placement Analysis",
      description: "Placement statistics broken down by academic departments",
      date: "2025-08-01",
      type: "Analytical",
      format: "PDF",
      size: "1.8 MB",
    },
    {
      id: 3,
      title: "Company Participation Report",
      description: "Analysis of companies that participated in campus recruitment",
      date: "2025-07-20",
      type: "Analytical",
      format: "PDF",
      size: "1.2 MB",
    },
    {
      id: 4,
      title: "Salary Package Analysis",
      description: "Breakdown of salary packages offered to students",
      date: "2025-07-15",
      type: "Analytical",
      format: "PDF",
      size: "1.5 MB",
    },
  ];

  const handleDownloadChart = async (chartType) => {
    try {
      const response = await placementService.downloadChart(chartType, 'pdf');
      if (response.success) {
        toast.success(response.message);
        
        // In a real application, we'd use the response URL to download the file
        // For this mock, we'll just simulate the download
        const link = document.createElement('a');
        link.href = response.url;
        link.download = `${chartType}-chart.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error downloading chart:", error);
      toast.error("Failed to download chart");
    }
  };

  const handleReportDownload = (reportId) => {
    toast.success(`Downloading report #${reportId}`);
  };

  const handleGenerateReport = () => {
    toast.success("Report generation initiated. You will be notified when it's ready.");
  };

  return (
    <Layout userType="placement">
      <div className="animate-fade-in space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Placement Reports</h1>
          <p className="text-muted-foreground">
            Generate and view detailed placement statistics and reports
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Placement Overview</CardTitle>
              <CardDescription>Academic Year 2024-25</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col items-center justify-center space-y-1 rounded-md border p-4">
                  <span className="text-3xl font-bold text-primary">85%</span>
                  <span className="text-sm text-muted-foreground">Overall Placement</span>
                </div>
                <div className="flex flex-col items-center justify-center space-y-1 rounded-md border p-4">
                  <span className="text-3xl font-bold text-primary">195</span>
                  <span className="text-sm text-muted-foreground">Companies Visited</span>
                </div>
                <div className="flex flex-col items-center justify-center space-y-1 rounded-md border p-4">
                  <span className="text-3xl font-bold text-primary">12.5 LPA</span>
                  <span className="text-sm text-muted-foreground">Average Package</span>
                </div>
                <div className="flex flex-col items-center justify-center space-y-1 rounded-md border p-4">
                  <span className="text-3xl font-bold text-primary">38 LPA</span>
                  <span className="text-sm text-muted-foreground">Highest Package</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="analytics">Analytics Dashboard</TabsTrigger>
            <TabsTrigger value="reports">Available Reports</TabsTrigger>
            <TabsTrigger value="generate">Generate Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Department-wise Placement Rate</CardTitle>
                  <CardDescription>
                    Comparison of placement statistics across departments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex h-80 items-center justify-center">Loading chart data...</div>
                  ) : (
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart
                          data={departmentData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="placementRate" name="Placement Rate (%)" fill="#8884d8" />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleDownloadChart('department-placement-rate')}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Chart
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Salary Package Distribution</CardTitle>
                  <CardDescription>
                    Breakdown of salary packages offered to students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={packageData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {packageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleDownloadChart('salary-distribution')}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Chart
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Available Reports</CardTitle>
                <CardDescription>
                  Download previously generated placement reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex flex-wrap items-center justify-between gap-4 rounded-md border p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="rounded-md bg-primary/10 p-2">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{report.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {report.description}
                          </p>
                          <div className="mt-1 flex gap-2">
                            <span className="text-xs text-muted-foreground">
                              Generated: {report.date}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Type: {report.type}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Size: {report.size}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button onClick={() => handleReportDownload(report.id)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="generate">
            <Card>
              <CardHeader>
                <CardTitle>Generate New Report</CardTitle>
                <CardDescription>
                  Create customized placement reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Report Type</label>
                    <Select defaultValue="annual">
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="annual">Annual Placement Report</SelectItem>
                        <SelectItem value="department">Department-wise Analysis</SelectItem>
                        <SelectItem value="company">Company Participation Report</SelectItem>
                        <SelectItem value="salary">Salary Package Analysis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Academic Year</label>
                    <Select
                      value={reportYear}
                      onValueChange={setReportYear}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select academic year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2025">2024-25</SelectItem>
                        <SelectItem value="2024">2023-24</SelectItem>
                        <SelectItem value="2023">2022-23</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Department</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="cs">Computer Science</SelectItem>
                        <SelectItem value="ec">Electronics</SelectItem>
                        <SelectItem value="me">Mechanical</SelectItem>
                        <SelectItem value="cv">Civil</SelectItem>
                        <SelectItem value="ee">Electrical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Format</label>
                    <Select defaultValue="pdf">
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Preview</Button>
                <Button onClick={handleGenerateReport}>
                  <BarChart className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PlacementReports;
