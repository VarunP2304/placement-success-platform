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
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, Calendar, Building2, Users, FileText } from "lucide-react";
import AddDriveForm from "@/components/placement/AddDriveForm";
import { placementService } from "@/services/api";
import { toast } from "sonner";

const PlacementDrives = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: drivesData, isLoading } = useQuery({
    queryKey: ["drives"],
    queryFn: placementService.getDrives
  });

  const drives = drivesData?.data || [];

  const filteredDrives = drives.filter(
    (drive) =>
      drive.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drive.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drive.roles?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Upcoming":
        return "default";
      case "Ongoing":
        return "secondary";
      case "Completed":
        return "outline";
      default:
        return "outline";
    }
  };

  const handleAddDriveSuccess = () => {
    setDialogOpen(false);
    toast.success("Drive added successfully");
  };

  return (
    <Layout userType="placement">
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Placement Drives</h1>
            <p className="text-muted-foreground">
              Manage recruitment drives and events
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Drive
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Placement Drive</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <AddDriveForm onSuccess={handleAddDriveSuccess} />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search drives by company, title or roles..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Drives</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Drive List</CardTitle>
                <CardDescription>
                  {isLoading ? "Loading..." : `Showing ${filteredDrives.length} out of ${drives.length} placement drives`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center p-8">Loading drives...</div>
                ) : (
                  <div className="space-y-6">
                    {filteredDrives.map((drive) => (
                      <Card key={drive.id} className="overflow-hidden">
                        <CardHeader className="bg-muted/50 pb-4">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{drive.company}</h3>
                                <Badge variant={getStatusColor(drive.status)}>
                                  {drive.status}
                                </Badge>
                              </div>
                              <CardTitle className="mt-1.5">{drive.title || drive.position}</CardTitle>
                            </div>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                Drive Date: <span className="font-medium">{drive.date || drive.driveDate}</span>
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                Roles: <span className="font-medium">{drive.roles || drive.position}</span>
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                Registered: <span className="font-medium">{drive.studentsRegistered || 0} students</span>
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                Package: <span className="font-medium">{drive.package}</span>
                              </span>
                            </div>
                            <div className="col-span-1 md:col-span-2 lg:col-span-1">
                              <span className="text-sm">
                                Eligibility: <span className="font-medium">{drive.eligibility}</span>
                              </span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="bg-muted/30 flex justify-between">
                          <div className="text-sm text-muted-foreground">
                            Registration Deadline: {drive.registrationDeadline || "N/A"}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Manage
                            </Button>
                            <Button size="sm">Send Notice</Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upcoming">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {filteredDrives
                    .filter((drive) => drive.status === "Upcoming")
                    .map((drive) => (
                      <Card key={drive.id} className="overflow-hidden">
                        <CardHeader className="bg-muted/50 pb-4">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold">{drive.company}</h3>
                              <CardTitle className="mt-1.5">{drive.title}</CardTitle>
                            </div>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                Drive Date: <span className="font-medium">{drive.driveDate}</span>
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                Roles: <span className="font-medium">{drive.roles}</span>
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                Package: <span className="font-medium">{drive.package}</span>
                              </span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="bg-muted/30 flex justify-between">
                          <div className="text-sm text-muted-foreground">
                            Registration Deadline: {drive.registrationDeadline}
                          </div>
                          <Button size="sm">Publish</Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ongoing">
            <Card>
              <CardContent className="pt-6">
                {filteredDrives.filter(drive => drive.status === "Ongoing").length > 0 ? (
                  <div className="space-y-6">
                    {filteredDrives
                      .filter((drive) => drive.status === "Ongoing")
                      .map((drive) => (
                        <Card key={drive.id} className="overflow-hidden">
                          <CardHeader className="bg-muted/50 pb-4">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold">{drive.company}</h3>
                                  <Badge variant={getStatusColor(drive.status)}>
                                    {drive.status}
                                  </Badge>
                                </div>
                                <CardTitle className="mt-1.5">{drive.title}</CardTitle>
                              </div>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-6">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                  Drive Date: <span className="font-medium">{drive.driveDate}</span>
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                  Roles: <span className="font-medium">{drive.roles}</span>
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                  Registered: <span className="font-medium">{drive.studentsRegistered} students</span>
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                  Package: <span className="font-medium">{drive.package}</span>
                                </span>
                              </div>
                              <div className="col-span-1 md:col-span-2 lg:col-span-1">
                                <span className="text-sm">
                                  Eligibility: <span className="font-medium">{drive.eligibility}</span>
                                </span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="bg-muted/30 flex justify-between">
                            <div className="text-sm text-muted-foreground">
                              Registration Deadline: {drive.registrationDeadline}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Manage
                              </Button>
                              <Button size="sm">Send Notice</Button>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                ) : (
                  <p className="text-center py-6 text-muted-foreground">No ongoing drives at the moment</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed">
            <Card>
              <CardContent className="pt-6">
                {filteredDrives.filter(drive => drive.status === "Completed").length > 0 ? (
                  <div className="space-y-6">
                    {filteredDrives
                      .filter((drive) => drive.status === "Completed")
                      .map((drive) => (
                        <Card key={drive.id} className="overflow-hidden">
                          <CardHeader className="bg-muted/50 pb-4">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold">{drive.company}</h3>
                                  <Badge variant={getStatusColor(drive.status)}>
                                    {drive.status}
                                  </Badge>
                                </div>
                                <CardTitle className="mt-1.5">{drive.title}</CardTitle>
                              </div>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-6">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                  Drive Date: <span className="font-medium">{drive.driveDate}</span>
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                  Roles: <span className="font-medium">{drive.roles}</span>
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                  Registered: <span className="font-medium">{drive.studentsRegistered} students</span>
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                  Package: <span className="font-medium">{drive.package}</span>
                                </span>
                              </div>
                              <div className="col-span-1 md:col-span-2 lg:col-span-1">
                                <span className="text-sm">
                                  Eligibility: <span className="font-medium">{drive.eligibility}</span>
                                </span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="bg-muted/30 flex justify-between">
                            <div className="text-sm text-muted-foreground">
                              Registration Deadline: {drive.registrationDeadline}
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                ) : (
                  <p className="text-center py-6 text-muted-foreground">No completed drives to display</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PlacementDrives;
