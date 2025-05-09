
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Building2, Calendar as CalendarIcon } from "lucide-react";

const StudentInterviews = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  const upcomingInterviews = [
    {
      id: 1,
      company: "Google",
      position: "Software Engineer",
      date: "2025-05-12",
      time: "10:00 AM",
      mode: "Online",
      round: "Technical",
      status: "Scheduled",
    },
    {
      id: 2,
      company: "Microsoft",
      position: "Backend Developer",
      date: "2025-05-15",
      time: "2:00 PM",
      mode: "In-person",
      round: "HR",
      status: "Scheduled",
    },
  ];

  const pastInterviews = [
    {
      id: 3,
      company: "Amazon",
      position: "Frontend Developer",
      date: "2025-05-01",
      time: "11:00 AM",
      mode: "Online",
      round: "Technical",
      status: "Completed",
      feedback: "Good performance on algorithms, needs improvement on system design.",
      result: "Shortlisted for next round",
    },
    {
      id: 4,
      company: "Apple",
      position: "iOS Developer",
      date: "2025-04-28",
      time: "3:00 PM",
      mode: "In-person",
      round: "Technical + HR",
      status: "Completed",
      feedback: "Excellent communication skills, good technical knowledge.",
      result: "Selected",
    },
  ];

  return (
    <Layout userType="student">
      <div className="animate-fade-in space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Interviews</h1>
          <p className="text-muted-foreground">
            Track all your interviews and prepare accordingly
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="upcoming" onClick={() => setActiveTab("upcoming")}>
              Upcoming Interviews
            </TabsTrigger>
            <TabsTrigger value="past" onClick={() => setActiveTab("past")}>
              Past Interviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingInterviews.length > 0 ? (
              upcomingInterviews.map((interview) => (
                <Card key={interview.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{interview.company}</CardTitle>
                        <CardDescription>{interview.position}</CardDescription>
                      </div>
                      <Badge>{interview.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <span>Date: {interview.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <span>Time: {interview.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-muted-foreground" />
                        <span>Mode: {interview.mode}</span>
                      </div>
                      <div>
                        <span className="font-medium">Round: {interview.round}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">View Details</Button>
                    <Button>Prepare</Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p>No upcoming interviews scheduled.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Interview History</CardTitle>
                <CardDescription>
                  Review your past interviews and feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Round</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastInterviews.map((interview) => (
                      <TableRow key={interview.id}>
                        <TableCell className="font-medium">{interview.company}</TableCell>
                        <TableCell>{interview.position}</TableCell>
                        <TableCell>{interview.date}</TableCell>
                        <TableCell>{interview.round}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              interview.result === "Selected"
                                ? "default"
                                : interview.result.includes("Shortlisted")
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {interview.result}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Feedback
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Download Interview History
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StudentInterviews;
