
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUp, FileText, Trash2, Eye, FileCheck, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { studentService } from "@/services/api";

type DocumentType = {
  id: string;
  document_name: string;
  document_type: "resume" | "marksheet" | "certificate" | "other";
  upload_date: string;
  status: "verified" | "pending" | "rejected";
  file_path: string;
};

const DocumentsSection = () => {
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await studentService.getDocuments();
      if (response.success) {
        setDocuments(response.data);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (type: "resume" | "marksheet" | "certificate") => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'resume' ? '.pdf,.docx' : '.pdf,.jpg,.png';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      setUploading(true);
      try {
        const formData = new FormData();
        formData.append('document', file);
        formData.append('documentType', type);
        formData.append('documentName', file.name);

        const response = await studentService.uploadDocument(formData);
        if (response.success) {
          toast.success("Document uploaded successfully!");
          fetchDocuments(); // Refresh the list
        } else {
          toast.error(response.message || "Upload failed");
        }
      } catch (error) {
        console.error('Upload error:', error);
        toast.error("Failed to upload document");
      } finally {
        setUploading(false);
      }
    };

    input.click();
  };

  const handleDeleteDocument = async (documentId: string) => {
    try {
      const response = await studentService.deleteDocument(documentId);
      if (response.success) {
        toast.success("Document deleted successfully");
        fetchDocuments(); // Refresh the list
      } else {
        toast.error(response.message || "Delete failed");
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error("Failed to delete document");
    }
  };

  const handleViewDocument = (documentPath: string) => {
    // Open document in new tab
    window.open(`/api/documents/view/${documentPath}`, '_blank');
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "resume":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "marksheet":
        return <FileText className="h-5 w-5 text-amber-500" />;
      case "certificate":
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
    const count = documents.filter(doc => doc.document_type === type).length;
    const required = type === "resume" ? 1 : type === "marksheet" ? 6 : 1;
    return {
      count,
      required,
      completed: count >= required
    };
  };

  const resumeStatus = getRequirementStatus("resume");
  const marksheetStatus = getRequirementStatus("marksheet");
  const certificateStatus = getRequirementStatus("certificate");

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading documents...</div>;
  }

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
                      <h4 className="font-medium">Certificates</h4>
                      {certificateStatus.completed ? 
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Complete</Badge> :
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Optional</Badge>
                      }
                    </div>
                    <Progress value={(certificateStatus.count / Math.max(certificateStatus.required, 1)) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {certificateStatus.count} uploaded (Optional certificates)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Separator />

            {/* Upload Buttons */}
            <div className="grid gap-4 md:grid-cols-3">
              <Button 
                onClick={() => handleFileUpload("resume")} 
                className="gap-2"
                disabled={uploading}
              >
                <FileUp className="h-4 w-4" /> 
                {uploading ? "Uploading..." : "Upload Resume"}
              </Button>
              <Button 
                onClick={() => handleFileUpload("marksheet")} 
                className="gap-2"
                disabled={uploading}
              >
                <FileUp className="h-4 w-4" /> 
                {uploading ? "Uploading..." : "Upload Marksheet"}
              </Button>
              <Button 
                onClick={() => handleFileUpload("certificate")} 
                className="gap-2"
                disabled={uploading}
              >
                <FileUp className="h-4 w-4" /> 
                {uploading ? "Uploading..." : "Upload Certificate"}
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
            {documents.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No documents uploaded yet. Start by uploading your resume.
              </p>
            ) : (
              documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    {getDocumentIcon(doc.document_type)}
                    <div>
                      <p className="font-medium">{doc.document_name}</p>
                      <p className="text-sm text-muted-foreground">
                        Uploaded on {new Date(doc.upload_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(doc.status)}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      title="View Document"
                      onClick={() => handleViewDocument(doc.file_path)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive" 
                      title="Delete Document"
                      onClick={() => handleDeleteDocument(doc.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsSection;
