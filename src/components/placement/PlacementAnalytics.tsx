import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
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
  ScatterChart,
  Scatter
} from "recharts";
import { placementService } from "@/services/api";

const PlacementAnalytics = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [cgpaFilter, setCgpaFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const response = await placementService.getAllStudentsData();
        if (response.success) {
          setStudentData(response.data);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  const departments = [
    { code: "all", name: "All Departments" },
    { code: "CSE", name: "CSE" },
    { code: "CSE AIML", name: "CSE AIML" },
    { code: "ISE", name: "ISE" },
    { code: "CSE DS", name: "CSE DS" },
    { code: "ME", name: "ME" },
    { code: "RA", name: "RA" },
    { code: "ECE", name: "ECE" },
    { code: "MBA", name: "MBA" }
  ];

  const cgpaRanges = [
    { value: "all", label: "All CGPA" },
    { value: "9-10", label: "9.0 - 10.0" },
    { value: "8-9", label: "8.0 - 8.9" },
    { value: "7-8", label: "7.0 - 7.9" },
    { value: "6-7", label: "6.0 - 6.9" },
    { value: "5-6", label: "5.0 - 5.9" },
    { value: "below-5", label: "Below 5.0" }
  ];

  // Filter and sort data
  const filteredData = useMemo(() => {
    let filtered = studentData;

    // Department filter
    if (selectedDepartment !== "all") {
      filtered = filtered.filter(student => student.department === selectedDepartment);
    }

    // CGPA filter
    if (cgpaFilter !== "all") {
      filtered = filtered.filter(student => {
        const cgpa = student.cgpa || 0;
        switch (cgpaFilter) {
          case "9-10": return cgpa >= 9.0 && cgpa <= 10.0;
          case "8-9": return cgpa >= 8.0 && cgpa < 9.0;
          case "7-8": return cgpa >= 7.0 && cgpa < 8.0;
          case "6-7": return cgpa >= 6.0 && cgpa < 7.0;
          case "5-6": return cgpa >= 5.0 && cgpa < 6.0;
          case "below-5": return cgpa < 5.0;
          default: return true;
        }
      });
    }

    // Sort by CGPA
    filtered.sort((a, b) => {
      return sortOrder === "desc" ? (b.cgpa || 0) - (a.cgpa || 0) : (a.cgpa || 0) - (b.cgpa || 0);
    });

    return filtered;
  }, [studentData, selectedDepartment, cgpaFilter, sortOrder]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = filteredData.length;
    const placed = filteredData.filter(s => s.placed).length;
    const placementRate = total > 0 ? ((placed / total) * 100).toFixed(1) : 0;
    const avgPackage = filteredData
      .filter(s => s.placed && s.package_offered)
      .reduce((sum, s) => sum + (s.package_offered || 0), 0) / (placed || 1);
    const maxPackage = Math.max(...filteredData.map(s => s.package_offered || 0));

    return {
      total,
      placed,
      placementRate,
      avgPackage: avgPackage.toFixed(1),
      maxPackage
    };
  }, [filteredData]);

  // Department-wise placement data
  const departmentWiseData = useMemo(() => {
    const deptData = departments
      .filter(d => d.code !== "all")
      .map(dept => {
        const deptStudents = studentData.filter(s => s.department === dept.code);
        const placed = deptStudents.filter(s => s.placed).length;
        const total = deptStudents.length;
        const placementRate = total > 0 ? (placed / total) * 100 : 0;
        
        return {
          department: dept.name,
          placed,
          total,
          placementRate: parseFloat(placementRate.toFixed(1))
        };
      })
      .filter(d => d.total > 0);

    return deptData;
  }, [studentData]);

  // CGPA vs Job Offers correlation data
  const cgpaJobOffersData = useMemo(() => {
    return filteredData.map(student => ({
      cgpa: student.cgpa || 0,
      jobOffers: student.job_offers_count || 0,
      name: student.full_name
    }));
  }, [filteredData]);

  // Package distribution pie chart data
  const packageDistribution = useMemo(() => {
    const placedStudents = filteredData.filter(s => s.placed && s.package_offered);
    const ranges = [
      { name: "0-5 LPA", min: 0, max: 5, count: 0, color: "#8884d8" },
      { name: "5-10 LPA", min: 5, max: 10, count: 0, color: "#82ca9d" },
      { name: "10-15 LPA", min: 10, max: 15, count: 0, color: "#ffc658" },
      { name: "15-20 LPA", min: 15, max: 20, count: 0, color: "#ff7300" },
      { name: "20+ LPA", min: 20, max: Infinity, count: 0, color: "#00ff00" }
    ];

    placedStudents.forEach(student => {
      const range = ranges.find(r => student.package_offered >= r.min && student.package_offered < r.max);
      if (range) range.count++;
    });

    return ranges.filter(r => r.count > 0);
  }, [filteredData]);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00ff00"];

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Placement Analytics Dashboard</CardTitle>
          <CardDescription>
            Comprehensive placement insights with filtering options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Department</Label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept.code} value={dept.code}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>CGPA Range</Label>
              <Select value={cgpaFilter} onValueChange={setCgpaFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cgpaRanges.map(range => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Sort by CGPA</Label>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Descending</SelectItem>
                  <SelectItem value="asc">Ascending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Applied Filters</Label>
              <div className="flex flex-wrap gap-1">
                {selectedDepartment !== "all" && (
                  <Badge variant="secondary">{selectedDepartment}</Badge>
                )}
                {cgpaFilter !== "all" && (
                  <Badge variant="secondary">CGPA: {cgpaRanges.find(r => r.value === cgpaFilter)?.label}</Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Students</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.placed}</div>
              <div className="text-sm text-muted-foreground">Students Placed</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.placementRate}%</div>
              <div className="text-sm text-muted-foreground">Placement Rate</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">₹{stats.avgPackage}L</div>
              <div className="text-sm text-muted-foreground">Avg Package</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department-wise Placement Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Department-wise Placement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentWiseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="placementRate" name="Placement Rate (%)" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* CGPA vs Job Offers Correlation */}
        <Card>
          <CardHeader>
            <CardTitle>CGPA vs Job Offers Correlation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={cgpaJobOffersData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="cgpa" name="CGPA" />
                  <YAxis dataKey="jobOffers" name="Job Offers" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter fill="#82ca9d" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Package Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Package Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={packageDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="count"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {packageDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Student List */}
        <Card>
          <CardHeader>
            <CardTitle>Filtered Student List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-80 overflow-y-auto">
              <div className="space-y-2">
                {filteredData.map(student => (
                  <div key={student.id} className="flex justify-between items-center p-2 border rounded">
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {student.usn} | {student.department} | CGPA: {student.cgpa}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={student.placed ? "default" : "destructive"}>
                        {student.placed ? `₹${student.packageOffered}L` : "Not Placed"}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        {student.jobOffers} offers
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlacementAnalytics;
