
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, Building2, Calendar, Users } from "lucide-react";

const PlacementCompanies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const companies = [
    {
      id: 1,
      name: "Google",
      industry: "Technology",
      location: "Bangalore",
      lastVisit: "2025-01-15",
      status: "Active",
      offers: 12,
      visits: 3,
      contact: "John Doe",
      email: "john.doe@google.com",
      logo: "https://via.placeholder.com/40",
    },
    {
      id: 2,
      name: "Microsoft",
      industry: "Technology",
      location: "Hyderabad",
      lastVisit: "2025-02-10",
      status: "Active",
      offers: 8,
      visits: 2,
      contact: "Jane Smith",
      email: "jane.smith@microsoft.com",
      logo: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      name: "Amazon",
      industry: "E-commerce",
      location: "Bangalore",
      lastVisit: "2025-03-05",
      status: "Active",
      offers: 15,
      visits: 4,
      contact: "Mike Johnson",
      email: "mike@amazon.com",
      logo: "https://via.placeholder.com/40",
    },
    {
      id: 4,
      name: "IBM",
      industry: "Technology",
      location: "Pune",
      lastVisit: "2024-12-20",
      status: "Inactive",
      offers: 5,
      visits: 1,
      contact: "Sarah Williams",
      email: "sarah@ibm.com",
      logo: "https://via.placeholder.com/40",
    },
  ];

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout userType="placement">
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Companies</h1>
            <p className="text-muted-foreground">
              Manage company relationships and recruitment activities
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Company
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Company</DialogTitle>
                <DialogDescription>
                  Enter the details of the new company to add to the system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Form fields would go here */}
                <p className="text-sm text-muted-foreground">Form implementation coming soon</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search companies..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Companies</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Company List</CardTitle>
                <CardDescription>
                  Showing {filteredCompanies.length} out of {companies.length} companies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Offers Made</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCompanies.map((company) => (
                      <TableRow key={company.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={company.logo} alt={company.name} />
                              <AvatarFallback>{company.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{company.name}</p>
                              <p className="text-xs text-muted-foreground">{company.contact}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{company.industry}</TableCell>
                        <TableCell>{company.location}</TableCell>
                        <TableCell>
                          <Badge variant={company.status === "Active" ? "default" : "outline"}>
                            {company.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{company.offers}</TableCell>
                        <TableCell>{company.lastVisit}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Export List</Button>
                <Button variant="outline">Import Companies</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="active">
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Offers Made</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCompanies
                      .filter((company) => company.status === "Active")
                      .map((company) => (
                        <TableRow key={company.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={company.logo} alt={company.name} />
                                <AvatarFallback>{company.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{company.name}</p>
                                <p className="text-xs text-muted-foreground">{company.contact}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{company.industry}</TableCell>
                          <TableCell>{company.location}</TableCell>
                          <TableCell>{company.offers}</TableCell>
                          <TableCell>{company.lastVisit}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inactive">
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Last Contact</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCompanies
                      .filter((company) => company.status === "Inactive")
                      .map((company) => (
                        <TableRow key={company.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={company.logo} alt={company.name} />
                                <AvatarFallback>{company.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{company.name}</p>
                                <p className="text-xs text-muted-foreground">{company.contact}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{company.industry}</TableCell>
                          <TableCell>{company.location}</TableCell>
                          <TableCell>{company.lastVisit}</TableCell>
                          <TableCell>
                            <Button size="sm">Reactivate</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PlacementCompanies;
