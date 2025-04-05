
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Clock, BookOpen, FileText, Video, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const PlacementResourcesSection = () => {
  const [resourceType, setResourceType] = useState("aptitude");
  
  const aptitudeTopics = [
    {
      id: "apt1",
      title: "Quantitative Aptitude",
      description: "Number System, Percentages, Profit & Loss, Time & Distance, etc.",
      progress: 75,
      resources: 24,
      completed: 18,
      status: "in-progress"
    },
    {
      id: "apt2",
      title: "Logical Reasoning",
      description: "Puzzles, Syllogisms, Binary Logic, Data Arrangement, etc.",
      progress: 60,
      resources: 20,
      completed: 12,
      status: "in-progress"
    },
    {
      id: "apt3",
      title: "Verbal Ability",
      description: "Reading Comprehension, Grammar, Vocabulary, etc.",
      progress: 40,
      resources: 15,
      completed: 6,
      status: "in-progress"
    },
    {
      id: "apt4",
      title: "Data Interpretation",
      description: "Charts, Graphs, Tables, Data Analysis, etc.",
      progress: 30,
      resources: 12,
      completed: 4,
      status: "in-progress"
    }
  ];
  
  const technicalTopics = [
    {
      id: "tech1",
      title: "Data Structures & Algorithms",
      description: "Arrays, Linked Lists, Trees, Graphs, Sorting, Searching, etc.",
      progress: 80,
      resources: 30,
      completed: 24,
      status: "in-progress"
    },
    {
      id: "tech2",
      title: "Operating Systems",
      description: "Process Management, Memory Management, File Systems, etc.",
      progress: 65,
      resources: 20,
      completed: 13,
      status: "in-progress"
    },
    {
      id: "tech3",
      title: "Database Management Systems",
      description: "SQL, Normalization, Transactions, Indexing, etc.",
      progress: 70,
      resources: 18,
      completed: 13,
      status: "in-progress"
    },
    {
      id: "tech4",
      title: "Computer Networks",
      description: "OSI Model, TCP/IP, Routing, Network Security, etc.",
      progress: 45,
      resources: 22,
      completed: 10,
      status: "in-progress"
    }
  ];
  
  const interviewTopics = [
    {
      id: "int1",
      title: "HR Interview Preparation",
      description: "Common HR questions, Company research, Behavioral questions, etc.",
      progress: 85,
      resources: 15,
      completed: 13,
      status: "in-progress"
    },
    {
      id: "int2",
      title: "Technical Interview Preparation",
      description: "Coding interviews, System Design, Problem solving, etc.",
      progress: 70,
      resources: 25,
      completed: 18,
      status: "in-progress"
    },
    {
      id: "int3",
      title: "Group Discussion",
      description: "GD topics, Do's and Don'ts, Performance tips, etc.",
      progress: 60,
      resources: 10,
      completed: 6,
      status: "in-progress"
    },
    {
      id: "int4",
      title: "Mock Interviews",
      description: "Practice interviews, Feedback sessions, etc.",
      progress: 50,
      resources: 8,
      completed: 4,
      status: "in-progress"
    }
  ];
  
  const getTopics = () => {
    switch (resourceType) {
      case "aptitude":
        return aptitudeTopics;
      case "technical":
        return technicalTopics;
      case "interview":
        return interviewTopics;
      default:
        return aptitudeTopics;
    }
  };
  
  const getStatusBadge = (status: string, progress: number) => {
    if (progress === 100) {
      return <Badge className="bg-green-500"><CheckCircle2 className="h-3 w-3 mr-1" /> Completed</Badge>;
    } else if (progress > 0) {
      return <Badge variant="outline" className="text-amber-500 border-amber-500"><Clock className="h-3 w-3 mr-1" /> In Progress</Badge>;
    } else {
      return <Badge variant="outline">Not Started</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Placement Learning Resources</CardTitle>
          <CardDescription>
            Study materials to help you prepare for placement tests and interviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="aptitude" value={resourceType} onValueChange={setResourceType} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="aptitude">Aptitude</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="interview">Interview Prep</TabsTrigger>
            </TabsList>
            
            <TabsContent value={resourceType} className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                {getTopics().map((topic) => (
                  <Card key={topic.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{topic.title}</CardTitle>
                        {getStatusBadge(topic.status, topic.progress)}
                      </div>
                      <CardDescription>{topic.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{topic.progress}%</span>
                          </div>
                          <Progress value={topic.progress} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            {topic.completed} of {topic.resources} resources completed
                          </p>
                        </div>
                        
                        <div className="flex justify-between">
                          <Button variant="outline" className="gap-2">
                            <BookOpen className="h-4 w-4" /> Study Materials
                          </Button>
                          <Button className="gap-2">
                            Continue <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recommended Resources</CardTitle>
          <CardDescription>
            Personalized recommendations based on your learning progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <FileText className="h-8 w-8 text-primary" />
                    <h3 className="font-medium">Aptitude Practice Test</h3>
                    <p className="text-sm text-muted-foreground">100 questions to prepare for quantitative aptitude</p>
                    <Button variant="outline" className="w-full">Open Resource</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <Video className="h-8 w-8 text-primary" />
                    <h3 className="font-medium">Interview Techniques</h3>
                    <p className="text-sm text-muted-foreground">Video series on mastering technical interviews</p>
                    <Button variant="outline" className="w-full">Watch Videos</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <BookOpen className="h-8 w-8 text-primary" />
                    <h3 className="font-medium">DSA Problem Set</h3>
                    <p className="text-sm text-muted-foreground">Collection of most frequently asked DSA problems</p>
                    <Button variant="outline" className="w-full">Start Practice</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlacementResourcesSection;
