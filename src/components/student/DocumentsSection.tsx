
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUp, FileText, Trash2, Eye, FileCheck, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

type DocumentType = {
  id: string;
  name: string;
  type: "resume" | "marksheet" | "internship";
  date: string;
  status: "verified" | "pending" | "rejected";
  url: string;
};

const DocumentsSection = () => {
  const [documents, setDocuments] = useState<DocumentType[]>([
    {
      id: "1",
      name: "Resume_John_Doe.pdf",
      type: "resume",
      date: "Feb 10, 2024",
      status: "verified",
      url: "#"
    },
    {
      id: "2",
      name: "Semester5_Marksheet.pdf",
      type: "marksheet",
      date: "Jan 15, 2024",
      status: "verified",
      url: "#"
    },
    {
      id: "3",
      name: "Semester6_Marksheet.pdf",
      type: "marksheet",
      date: "Mar 01, 2024",
      status: "pending",
      url: "#"
    },
    {
      id: "4",
      name: "Google_Internship_Certificate.pdf",
      type: "internship",
      date: "Dec 20, 2023",
      status: "verified",
      url: "#"
    }
  ]);

  const handleFileUpload = (type: "resume" | "marksheet" | "internship") => {
    console.log(`Uploading ${type} document`);
    // Implement file upload logic here
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "resume":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "marksheet":
        return <FileText className="h-5 w-5 text-amber-500" />;
      case "internship":
        return <FileText className="h-5 w-5 text-green-500" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge variant="default" className="bg-green-500"><FileCheck className="h-3 w-3 mr-1" /> Verified</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-amber-500 border-amber-500"><AlertCircle className="h-3 w-3 mr-1" /> Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getRequirementStatus = (type: string) => {
    const count = documents.filter(doc => doc.type === type).length;
    const required = type === "resume" ? 1 : type === "marksheet" ? 6 : 1;
    return {
      count,
      required,
      completed: count >= required
    };
  };

  const resumeStatus = getRequirementStatus("resume");
  const marksheetStatus = getRequirementStatus("marksheet");
  const internshipStatus = getRequirementStatus("internship");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Required Documents</CardTitle>
          <CardDescription>
            Upload the necessary documents for placement verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Requirements Progress */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Resume</h4>
                      {resumeStatus.completed ? 
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Complete</Badge> :
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Required</Badge>
                      }
                    </div>
                    <Progress value={(resumeStatus.count / resumeStatus.required) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {resumeStatus.count} of {resumeStatus.required} uploaded
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Marksheets</h4>
                      {marksheetStatus.completed ? 
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Complete</Badge> :
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Required</Badge>
                      }
                    </div>
                    <Progress value={(marksheetStatus.count / marksheetStatus.required) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {marksheetStatus.count} of {marksheetStatus.required} uploaded (All 6 semesters)
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Internship</h4>
                      {internshipStatus.completed ? 
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Complete</Badge> :
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Required</Badge>
                      }
                    </div>
                    <Progress value={(internshipStatus.count / internshipStatus.required) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {internshipStatus.count} of {internshipStatus.required} uploaded (Min. 1 required)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Separator />

            {/* Upload Buttons */}
            <div className="grid gap-4 md:grid-cols-3">
              <Button onClick={() => handleFileUpload("resume")} className="gap-2">
                <FileUp className="h-4 w-4" /> Upload Resume
              </Button>
              <Button onClick={() => handleFileUpload("marksheet")} className="gap-2">
                <FileUp className="h-4 w-4" /> Upload Marksheet
              </Button>
              <Button onClick={() => handleFileUpload("internship")} className="gap-2">
                <FileUp className="h-4 w-4" /> Upload Internship Certificate
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Documents</CardTitle>
          <CardDescription>
            Review and manage your uploaded documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center gap-3">
                  {getDocumentIcon(doc.type)}
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">Uploaded on {doc.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(doc.status)}
                  <Button variant="ghost" size="icon" title="View Document">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive" title="Delete Document">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsSection;
