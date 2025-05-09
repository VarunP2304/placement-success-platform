
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { FileText, Briefcase } from "lucide-react";

const StudentApplications = () => {
  // Mock data for jobs and internships
  const jobApplications = [
    {
      id: 1,
      companyName: "Google",
      position: "Software Engineer",
      appliedDate: "2023-04-15",
      location: "Bangalore",
      status: "Interview Scheduled",
      package: "₹18 LPA",
    },
    {
      id: 2,
      companyName: "Microsoft",
      position: "Product Manager",
      appliedDate: "2023-04-10",
      location: "Hyderabad",
      status: "Application Under Review",
      package: "₹16 LPA",
    },
    {
      id: 3,
      companyName: "Amazon",
      position: "Data Scientist",
      appliedDate: "2023-04-05",
      location: "Pune",
      status: "Shortlisted",
      package: "₹15 LPA",
    },
    {
      id: 4,
      companyName: "Apple",
      position: "iOS Developer",
      appliedDate: "2023-03-25",
      location: "Bangalore",
      status: "Rejected",
      package: "₹17 LPA",
    },
    {
      id: 5,
      companyName: "Netflix",
      position: "UI/UX Designer",
      appliedDate: "2023-03-20",
      location: "Mumbai",
      status: "Offer Received",
      package: "₹14 LPA",
    }
  ];

  const internshipApplications = [
    {
      id: 1,
      companyName: "IBM",
      position: "Software Development Intern",
      appliedDate: "2023-04-18",
      duration: "6 months",
      location: "Remote",
      status: "Application Under Review",
      stipend: "₹25,000/month",
    },
    {
      id: 2,
      companyName: "Adobe",
      position: "UX Research Intern",
      appliedDate: "2023-04-12",
      duration: "3 months",
      location: "Noida",
      status: "Interview Scheduled",
      stipend: "₹20,000/month",
    },
    {
      id: 3,
      companyName: "Flipkart",
      position: "Data Analytics Intern",
      appliedDate: "2023-04-08",
      duration: "4 months",
      location: "Bangalore",
      status: "Selected",
      stipend: "₹18,000/month",
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Offer Received":
      case "Selected":
        return <Badge className="bg-green-500 hover:bg-green-600">Success</Badge>;
      case "Interview Scheduled":
      case "Shortlisted":
        return <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>;
      case "Application Under Review":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Pending</Badge>;
      case "Rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Layout userType="student">
      <div className="animate-fade-in space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Applications</h1>
          <p className="text-muted-foreground">
            Track all your job and internship applications in one place
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{jobApplications.length + internshipApplications.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Job Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-muted-foreground" />
                <div className="text-3xl font-bold">{jobApplications.length}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Internship Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
                <div className="text-3xl font-bold">{internshipApplications.length}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="jobs" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="jobs">Job Applications</TabsTrigger>
            <TabsTrigger value="internships">Internship Applications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="jobs" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Applications</CardTitle>
                <CardDescription>
                  Track the status of your job applications across companies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Package</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell className="font-medium">{application.companyName}</TableCell>
                        <TableCell>{application.position}</TableCell>
                        <TableCell>{application.appliedDate}</TableCell>
                        <TableCell>{application.location}</TableCell>
                        <TableCell>{application.package}</TableCell>
                        <TableCell>{getStatusBadge(application.status)}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="internships" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Internship Applications</CardTitle>
                <CardDescription>
                  Track the status of your internship applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Stipend</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {internshipApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell className="font-medium">{application.companyName}</TableCell>
                        <TableCell>{application.position}</TableCell>
                        <TableCell>{application.appliedDate}</TableCell>
                        <TableCell>{application.duration}</TableCell>
                        <TableCell>{application.location}</TableCell>
                        <TableCell>{application.stipend}</TableCell>
                        <TableCell>{getStatusBadge(application.status)}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StudentApplications;
