import { useState } from "react";
import Layout from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Plus, Calendar, FileText, Building2, Users } from "lucide-react";

const EmployerJobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      department: "Engineering",
      type: "Full-time",
      location: "Bangalore",
      positions: 5,
      package: "18-24 LPA",
      description: "We are looking for Software Engineers to design and implement reliable, scalable, and maintainable software systems.",
      requirements: ["B.Tech/M.Tech in Computer Science", "Strong problem-solving skills", "Experience with Java, Python or C++", "Knowledge of data structures and algorithms"],
      process: ["Online Assessment", "Technical Interview", "HR Interview"],
      applicationDeadline: "2025-06-15",
      status: "Active",
      applicants: 85,
      shortlisted: 20,
    },
    {
      id: 2,
      title: "UX Designer",
      department: "Design",
      type: "Full-time",
      location: "Bangalore",
      positions: 2,
      package: "16-20 LPA",
      description: "Join our design team to create exceptional user experiences for our products.",
      requirements: ["Bachelor's degree in Design or related field", "Portfolio demonstrating UX projects", "3+ years of experience", "Proficiency in design tools"],
      process: ["Portfolio Review", "Design Challenge", "Panel Interview"],
      applicationDeadline: "2025-06-01",
      status: "Active",
      applicants: 40,
      shortlisted: 8,
    },
    {
      id: 3,
      title: "Product Manager",
      department: "Product",
      type: "Full-time",
      location: "Bangalore",
      positions: 3,
      package: "20-26 LPA",
      description: "We're seeking Product Managers to drive the vision, strategy, and execution of our products.",
      requirements: ["MBA/MS with technical background", "5+ years of product management experience", "Strong analytical and communication skills"],
      process: ["Case Study", "Technical Interview", "Product Leader Interview", "HR Interview"],
      applicationDeadline: "2025-05-25",
      status: "Active",
      applicants: 60,
      shortlisted: 15,
    },
    {
      id: 4,
      title: "Data Analyst Intern",
      department: "Data",
      type: "Internship",
      location: "Remote",
      positions: 8,
      package: "40,000/month",
      description: "Internship opportunity for students interested in data analysis and business intelligence.",
      requirements: ["Currently pursuing B.Tech/M.Tech", "Knowledge of SQL and Python", "Strong analytical skills"],
      process: ["Aptitude Test", "Technical Interview", "HR Discussion"],
      applicationDeadline: "2025-05-15",
      status: "Closed",
      applicants: 120,
      shortlisted: 30,
    },
  ];

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getJobStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return <Badge>Active</Badge>;
      case "Closed":
        return <Badge variant="outline">Closed</Badge>;
      case "Draft":
        return <Badge variant="secondary">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Layout userType="employer">
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Job Postings</h1>
            <p className="text-muted-foreground">
              Manage your company's job and internship listings
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Job
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Job Posting</DialogTitle>
                <DialogDescription>
                  Fill in the job details to post a new opening for students.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Job Title</label>
                    <Input placeholder="e.g., Software Engineer" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Department</label>
                    <Input placeholder="e.g., Engineering" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Job Type</label>
                    <Input placeholder="e.g., Full-time" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input placeholder="e.g., Bangalore" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Number of Positions</label>
                    <Input type="number" placeholder="e.g., 5" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Package Offered</label>
                    <Input placeholder="e.g., 18-24 LPA" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Job Description</label>
                  <textarea
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Describe the job role and responsibilities..."
                  ></textarea>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline">Save as Draft</Button>
                <Button>Create & Publish</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search jobs..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Jobs</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/50 pb-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{job.title}</h3>
                          {getJobStatusBadge(job.status)}
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                          <span>{job.department}</span>
                          <span>•</span>
                          <span>{job.type}</span>
                          <span>•</span>
                          <span>{job.location}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button size="sm">View Applicants</Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-6">
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="md:col-span-2">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Job Description</h4>
                            <p className="mt-1">{job.description}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Requirements</h4>
                            <ul className="mt-1 ml-4 list-disc space-y-1">
                              {job.requirements.map((req, index) => (
                                <li key={index} className="text-sm">{req}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Selection Process</h4>
                            <div className="mt-1 flex flex-wrap gap-2">
                              {job.process.map((step, index) => (
                                <Badge key={index} variant="outline">
                                  {index + 1}. {step}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="rounded-md border p-4 space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Job Details</h4>
                            <div className="mt-2 space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm">Positions:</span>
                                <span className="text-sm font-medium">{job.positions}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Package:</span>
                                <span className="text-sm font-medium">{job.package}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Deadline:</span>
                                <span className="text-sm font-medium">{job.applicationDeadline}</span>
                              </div>
                              <Separator className="my-2" />
                              <div className="flex justify-between">
                                <span className="text-sm">Applicants:</span>
                                <span className="text-sm font-medium">{job.applicants}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Shortlisted:</span>
                                <span className="text-sm font-medium">{job.shortlisted}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="bg-muted/30 flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      {job.status === "Active" ? (
                        <>Application Deadline: {job.applicationDeadline}</>
                      ) : (
                        <>Posted on: {job.applicationDeadline}</>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {job.status === "Active" ? (
                        <Button variant="outline" size="sm">Close Job</Button>
                      ) : job.status === "Closed" ? (
                        <Button size="sm">Reopen</Button>
                      ) : (
                        <Button size="sm">Publish</Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="active">
            <div className="space-y-6">
              {filteredJobs
                .filter((job) => job.status === "Active")
                .map((job) => (
                  <Card key={job.id} className="overflow-hidden">
                    <CardHeader className="bg-muted/50">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-semibold">{job.title}</h3>
                          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                            <span>{job.department}</span>
                            <span>•</span>
                            <span>{job.location}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-6">
                      <p className="line-clamp-2">{job.description}</p>
                    </CardContent>
                    
                    <CardFooter className="flex justify-between">
                      <div className="text-sm text-muted-foreground">
                        Applicants: {job.applicants}
                      </div>
                      <Button size="sm">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          {/* Other tabs would have similar structure */}
          <TabsContent value="closed">
            <div className="space-y-6">
              {filteredJobs.filter(job => job.status === "Closed").length > 0 ? (
                filteredJobs
                  .filter(job => job.status === "Closed")
                  .map(job => (
                    <Card key={job.id} className="overflow-hidden">
                      {/* Similar content structure as above */}
                      <CardHeader>
                        <CardTitle>{job.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Closed job details</p>
                      </CardContent>
                    </Card>
                  ))
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center py-6 text-muted-foreground">No closed jobs to display</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="draft">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center py-6 text-muted-foreground">No draft jobs to display</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default EmployerJobs;
