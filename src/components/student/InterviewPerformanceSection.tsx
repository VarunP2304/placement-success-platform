
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, CheckCircle2, XCircle, AlertCircle, FileText, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";

type InterviewType = {
  id: string;
  company: string;
  position: string;
  date: string;
  type: "mock" | "actual";
  status: "passed" | "failed" | "pending";
  feedback: {
    technical: number;
    communication: number;
    problemSolving: number;
    overall: number;
    strengths: string[];
    improvements: string[];
    comments: string;
  };
};

const InterviewPerformanceSection = () => {
  const [expandedInterview, setExpandedInterview] = useState<string | null>(null);
  
  const interviews: InterviewType[] = [
    {
      id: "int1",
      company: "Google",
      position: "Software Engineer",
      date: "April 15, 2024",
      type: "actual",
      status: "pending",
      feedback: {
        technical: 85,
        communication: 80,
        problemSolving: 90,
        overall: 85,
        strengths: [
          "Strong understanding of algorithms",
          "Good code quality",
          "Clear explanation of approach"
        ],
        improvements: [
          "Consider edge cases more thoroughly",
          "Work on time management"
        ],
        comments: "Good performance overall. The candidate demonstrated strong technical skills and was able to solve the problem efficiently. Some improvements needed in handling edge cases."
      }
    },
    {
      id: "int2",
      company: "Microsoft",
      position: "Software Developer",
      date: "March 20, 2024",
      type: "mock",
      status: "passed",
      feedback: {
        technical: 90,
        communication: 85,
        problemSolving: 95,
        overall: 90,
        strengths: [
          "Excellent problem-solving approach",
          "Strong CS fundamentals",
          "Good communication skills"
        ],
        improvements: [
          "Work on explaining thought process more clearly",
          "Improve time complexity analysis"
        ],
        comments: "Excellent mock interview performance. The candidate demonstrated strong technical knowledge and problem-solving skills. They were able to communicate their approach effectively."
      }
    },
    {
      id: "int3",
      company: "Amazon",
      position: "SDE Intern",
      date: "February 10, 2024",
      type: "mock",
      status: "failed",
      feedback: {
        technical: 65,
        communication: 70,
        problemSolving: 60,
        overall: 65,
        strengths: [
          "Good communication skills",
          "Positive attitude",
          "Asked clarifying questions"
        ],
        improvements: [
          "Review fundamental data structures",
          "Practice more algorithmic problems",
          "Work on optimization techniques"
        ],
        comments: "The candidate struggled with the algorithm problem. They had a good approach initially but couldn't implement it correctly. Need to practice more algorithmic problems and review data structures."
      }
    }
  ];
  
  const toggleExpandInterview = (id: string) => {
    if (expandedInterview === id) {
      setExpandedInterview(null);
    } else {
      setExpandedInterview(id);
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "passed":
        return <Badge className="bg-green-500"><CheckCircle2 className="h-3 w-3 mr-1" /> Passed</Badge>;
      case "failed":
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Failed</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-amber-500 border-amber-500"><AlertCircle className="h-3 w-3 mr-1" /> Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const getTypeBadge = (type: string) => {
    switch (type) {
      case "mock":
        return <Badge variant="outline">Mock</Badge>;
      case "actual":
        return <Badge variant="default">Actual</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Interview Performance</CardTitle>
          <CardDescription>
            Review your interview performances and feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-4xl font-bold">{interviews.length}</div>
                    <p className="text-sm text-muted-foreground">
                      Total Interviews
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-4xl font-bold text-green-500">
                      {interviews.filter(i => i.status === "passed").length}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Interviews Passed
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-4xl font-bold">
                      {Math.round(interviews.reduce((sum, interview) => sum + interview.feedback.overall, 0) / interviews.length)}%
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Average Performance
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Interview History</h3>
              <div className="space-y-4">
                {interviews.map((interview) => (
                  <Card key={interview.id} className={expandedInterview === interview.id ? "border-primary" : ""}>
                    <div 
                      className="p-4 cursor-pointer"
                      onClick={() => toggleExpandInterview(interview.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div>
                            <h4 className="font-medium">{interview.company}</h4>
                            <p className="text-sm text-muted-foreground">{interview.position}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getTypeBadge(interview.type)}
                          {getStatusBadge(interview.status)}
                          {expandedInterview === interview.id ? 
                            <ChevronUp className="h-5 w-5 text-muted-foreground" /> : 
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          }
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-sm text-muted-foreground">
                          Date: {interview.date}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Overall: </span>
                          <Progress value={interview.feedback.overall} className="h-2 w-24" />
                          <span className="text-sm">{interview.feedback.overall}%</span>
                        </div>
                      </div>
                    </div>
                    
                    {expandedInterview === interview.id && (
                      <CardContent className="pt-0 border-t">
                        <div className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Technical Skills</span>
                                <span>{interview.feedback.technical}%</span>
                              </div>
                              <Progress value={interview.feedback.technical} className="h-2" />
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Communication</span>
                                <span>{interview.feedback.communication}%</span>
                              </div>
                              <Progress value={interview.feedback.communication} className="h-2" />
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Problem Solving</span>
                                <span>{interview.feedback.problemSolving}%</span>
                              </div>
                              <Progress value={interview.feedback.problemSolving} className="h-2" />
                            </div>
                          </div>
                          
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <h5 className="font-medium flex items-center gap-2 mb-2">
                                <ThumbsUp className="h-4 w-4 text-green-500" /> Strengths
                              </h5>
                              <ul className="space-y-1 text-sm">
                                {interview.feedback.strengths.map((strength, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                                    <span>{strength}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h5 className="font-medium flex items-center gap-2 mb-2">
                                <ThumbsDown className="h-4 w-4 text-amber-500" /> Areas for Improvement
                              </h5>
                              <ul className="space-y-1 text-sm">
                                {interview.feedback.improvements.map((improvement, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                                    <span>{improvement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-medium flex items-center gap-2 mb-2">
                              <FileText className="h-4 w-4" /> Interviewer Comments
                            </h5>
                            <p className="text-sm border rounded-md p-3 bg-muted/50">
                              {interview.feedback.comments}
                            </p>
                          </div>
                          
                          <div className="flex justify-end">
                            <Button variant="outline">
                              View Detailed Report
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewPerformanceSection;
