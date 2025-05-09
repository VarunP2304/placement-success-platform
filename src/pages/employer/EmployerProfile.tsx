
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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Mail, Globe, MapPin, Phone, Users, Calendar } from "lucide-react";

const EmployerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Sample employer data
  const employerData = {
    name: "Google Inc.",
    description: "Google LLC is an American multinational technology company that specializes in Internet-related services and products, including online advertising technologies, a search engine, cloud computing, software, and hardware.",
    industry: "Technology",
    website: "https://www.google.com",
    headquarters: "Mountain View, California, USA",
    founded: "1998",
    employees: "135,000+",
    contactPerson: "John Smith",
    email: "john.smith@google.com",
    phone: "+1 (123) 456-7890",
    address: "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
    logo: "https://via.placeholder.com/150",
    recruitmentHistory: [
      {
        year: "2024",
        positions: ["Software Engineer", "UX Designer", "Product Manager"],
        hired: 15,
        offers: 18,
        interviewed: 40,
      },
      {
        year: "2023",
        positions: ["Data Scientist", "Software Engineer", "Cloud Architect"],
        hired: 12,
        offers: 15,
        interviewed: 35,
      },
    ],
    campusRelations: {
      relationshipManager: "Emily Johnson",
      email: "emily.johnson@google.com",
      phone: "+1 (123) 456-7891",
      lastVisit: "2025-03-15",
      nextVisit: "2025-06-10",
      feedback: "Excellent talent pool, would like to increase hiring numbers next year.",
    },
  };
  
  return (
    <Layout userType="employer">
      <div className="animate-fade-in space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Company Profile</h1>
          <p className="text-muted-foreground">
            Manage your company information and recruitment preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="profile">Company Profile</TabsTrigger>
            <TabsTrigger value="history">Recruitment History</TabsTrigger>
            <TabsTrigger value="contact">Contact Information</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Company Information</CardTitle>
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </div>
                <CardDescription>
                  Update your company details and profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={employerData.logo} alt={employerData.name} />
                      <AvatarFallback>{employerData.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        Change Logo
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-6">
                    <div className="space-y-4">
                      {isEditing ? (
                        <div className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Company Name</label>
                              <Input defaultValue={employerData.name} />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Industry</label>
                              <Input defaultValue={employerData.industry} />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Company Description</label>
                            <Textarea
                              defaultValue={employerData.description}
                              className="min-h-[100px]"
                            />
                          </div>
                          
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Website</label>
                              <Input defaultValue={employerData.website} />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Year Founded</label>
                              <Input defaultValue={employerData.founded} />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Headquarters</label>
                              <Input defaultValue={employerData.headquarters} />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Number of Employees</label>
                              <Input defaultValue={employerData.employees} />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <h2 className="text-xl font-semibold">{employerData.name}</h2>
                            <Badge className="mt-1">{employerData.industry}</Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground">
                            {employerData.description}
                          </p>
                          
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-muted-foreground" />
                              <a
                                href={employerData.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline"
                              >
                                {employerData.website.replace(/(^\w+:|^)\/\//, "")}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{employerData.headquarters}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Founded: {employerData.founded}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{employerData.employees} employees</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Recruitment History</CardTitle>
                <CardDescription>
                  Past recruitment activities and statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {employerData.recruitmentHistory.map((history, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-medium">Recruitment Year: {history.year}</h3>
                      <Separator className="my-4" />
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Positions Recruited</h4>
                          <div className="flex flex-wrap gap-2">
                            {history.positions.map((position, idx) => (
                              <Badge key={idx} variant="outline">
                                {position}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Statistics</h4>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col items-center rounded-md border p-2">
                              <span className="text-2xl font-bold text-primary">{history.hired}</span>
                              <span className="text-xs text-muted-foreground">Hired</span>
                            </div>
                            <div className="flex flex-col items-center rounded-md border p-2">
                              <span className="text-2xl font-bold text-primary">{history.offers}</span>
                              <span className="text-xs text-muted-foreground">Offers</span>
                            </div>
                            <div className="flex flex-col items-center rounded-md border p-2">
                              <span className="text-2xl font-bold text-primary">{history.interviewed}</span>
                              <span className="text-xs text-muted-foreground">Interviews</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline">Download History</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Contact Information</CardTitle>
                  <Button variant="outline">Edit Contacts</Button>
                </div>
                <CardDescription>
                  Primary contact details for recruitment communications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Primary Contact</h3>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{employerData.contactPerson.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{employerData.contactPerson}</p>
                          <p className="text-sm text-muted-foreground">Recruitment Manager</p>
                        </div>
                      </div>
                      
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{employerData.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{employerData.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium">Campus Relations</h3>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {employerData.campusRelations.relationshipManager.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {employerData.campusRelations.relationshipManager}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Campus Relationship Manager
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{employerData.campusRelations.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{employerData.campusRelations.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Last Visit: {employerData.campusRelations.lastVisit}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Next Visit: {employerData.campusRelations.nextVisit}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default EmployerProfile;
