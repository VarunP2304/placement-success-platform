import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { studentService } from "@/services/api";

const StudentDataEntryForm = () => {
  const [formData, setFormData] = useState({
    // Personal Details
    usn: "",
    yearOfAdmission: "",
    department: "",
    fullName: "",
    email: "",
    phone: "",
    
    // Academic Details
    tenthMarks: "",
    twelfthMarks: "",
    
    // University Marks (8 semesters)
    sem1: "", sem2: "", sem3: "", sem4: "",
    sem5: "", sem6: "", sem7: "", sem8: "",
    
    // Additional Details
    hasInternship: "",
    internshipCount: "",
    hasProjects: "",
    projectCount: "",
    hasWorkExperience: "",
    workExperienceMonths: "",
    
    // Address
    permanentAddress: "",
    
    // Resume
    resumeFile: null,
    videoResumeFile: null
  });

  const [uploading, setUploading] = useState(false);

  const departments = [
    { code: "CS", name: "CSE", usnPrefix: "4SFYYCS" },
    { code: "CI", name: "CSE AIML", usnPrefix: "4SFYYCI" },
    { code: "IS", name: "ISE", usnPrefix: "4SFYYIS" },
    { code: "CD", name: "CSE DS", usnPrefix: "4SFYYCD" },
    { code: "ME", name: "ME", usnPrefix: "4SFYYME" },
    { code: "RA", name: "RA", usnPrefix: "4SFYYRA" },
    { code: "EC", name: "ECE", usnPrefix: "4SFYYEC" },
    { code: "BA", name: "MBA", usnPrefix: "4SFYYBA" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      
      // Add all text fields
      Object.keys(formData).forEach(key => {
        if (key !== 'resumeFile' && key !== 'videoResumeFile') {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Add files if present
      if (formData.resumeFile) {
        formDataToSend.append('resumeFile', formData.resumeFile);
      }
      if (formData.videoResumeFile) {
        formDataToSend.append('videoResumeFile', formData.videoResumeFile);
      }

      const response = await studentService.updateProfile(formDataToSend);
      
      if (response.success) {
        toast.success("Student data and files uploaded successfully!");
      } else {
        toast.error(response.message || "Failed to submit data");
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error("Failed to submit student data");
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field, file) => {
    // Validate file type and size
    if (field === 'resumeFile') {
      if (file && !['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        toast.error("Resume must be PDF or DOCX format");
        return;
      }
      if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Resume file size must be less than 5MB");
        return;
      }
    }
    
    if (field === 'videoResumeFile') {
      if (file && !['video/mp4', 'video/avi', 'video/mov'].includes(file.type)) {
        toast.error("Video resume must be MP4, AVI, or MOV format");
        return;
      }
      if (file && file.size > 50 * 1024 * 1024) { // 50MB limit
        toast.error("Video resume file size must be less than 50MB");
        return;
      }
    }

    setFormData(prev => ({ ...prev, [field]: file }));
    if (file) {
      toast.success(`${file.name} selected for upload`);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Student Data Entry</CardTitle>
          <CardDescription>
            Please fill in all your academic and personal details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="usn">USN (University Seat Number)</Label>
                  <Input
                    id="usn"
                    value={formData.usn}
                    onChange={(e) => handleInputChange("usn", e.target.value)}
                    placeholder="e.g., 4SF22CS001"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="yearOfAdmission">Year of Admission</Label>
                  <Input
                    id="yearOfAdmission"
                    value={formData.yearOfAdmission}
                    onChange={(e) => handleInputChange("yearOfAdmission", e.target.value)}
                    placeholder="e.g., 22 for 2022"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select onValueChange={(value) => handleInputChange("department", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.code} value={dept.code}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="permanentAddress">Permanent Address</Label>
                <Textarea
                  id="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={(e) => handleInputChange("permanentAddress", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Academic Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Academic Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tenthMarks">10th Grade Marks (%)</Label>
                  <Input
                    id="tenthMarks"
                    type="number"
                    value={formData.tenthMarks}
                    onChange={(e) => handleInputChange("tenthMarks", e.target.value)}
                    min="0"
                    max="100"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="twelfthMarks">12th Grade Marks (%)</Label>
                  <Input
                    id="twelfthMarks"
                    type="number"
                    value={formData.twelfthMarks}
                    onChange={(e) => handleInputChange("twelfthMarks", e.target.value)}
                    min="0"
                    max="100"
                    required
                  />
                </div>
              </div>

              {/* Semester Marks */}
              <h4 className="font-medium">University Semester Marks (CGPA - 10 Point Scale)</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <div key={sem} className="space-y-2">
                    <Label htmlFor={`sem${sem}`}>Semester {sem}</Label>
                    <Input
                      id={`sem${sem}`}
                      type="number"
                      value={formData[`sem${sem}`]}
                      onChange={(e) => handleInputChange(`sem${sem}`, e.target.value)}
                      min="0"
                      max="10"
                      step="0.01"
                      placeholder="0.00"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Experience & Skills</h3>
              
              {/* Internships */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hasInternship">Have you done any internships?</Label>
                  <Select onValueChange={(value) => handleInputChange("hasInternship", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {formData.hasInternship === "yes" && (
                  <div className="space-y-2">
                    <Label htmlFor="internshipCount">Number of Internships</Label>
                    <Input
                      id="internshipCount"
                      type="number"
                      value={formData.internshipCount}
                      onChange={(e) => handleInputChange("internshipCount", e.target.value)}
                      min="1"
                    />
                  </div>
                )}
              </div>

              {/* Projects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hasProjects">Have you worked on projects?</Label>
                  <Select onValueChange={(value) => handleInputChange("hasProjects", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {formData.hasProjects === "yes" && (
                  <div className="space-y-2">
                    <Label htmlFor="projectCount">Number of Projects</Label>
                    <Input
                      id="projectCount"
                      type="number"
                      value={formData.projectCount}
                      onChange={(e) => handleInputChange("projectCount", e.target.value)}
                      min="1"
                    />
                  </div>
                )}
              </div>

              {/* Work Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hasWorkExperience">Do you have work experience?</Label>
                  <Select onValueChange={(value) => handleInputChange("hasWorkExperience", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {formData.hasWorkExperience === "yes" && (
                  <div className="space-y-2">
                    <Label htmlFor="workExperienceMonths">Work Experience (in months)</Label>
                    <Input
                      id="workExperienceMonths"
                      type="number"
                      value={formData.workExperienceMonths}
                      onChange={(e) => handleInputChange("workExperienceMonths", e.target.value)}
                      min="1"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* File Uploads */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Document Uploads</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="resumeFile">Upload Resume (PDF/DOCX - Max 5MB)</Label>
                  <Input
                    id="resumeFile"
                    type="file"
                    accept=".pdf,.docx"
                    onChange={(e) => handleFileUpload("resumeFile", e.target.files[0])}
                    required
                  />
                  {formData.resumeFile && (
                    <p className="text-sm text-green-600">Selected: {formData.resumeFile.name}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="videoResumeFile">Upload Video Resume (MP4/AVI/MOV - Max 50MB)</Label>
                  <Input
                    id="videoResumeFile"
                    type="file"
                    accept=".mp4,.avi,.mov"
                    onChange={(e) => handleFileUpload("videoResumeFile", e.target.files[0])}
                  />
                  {formData.videoResumeFile && (
                    <p className="text-sm text-green-600">Selected: {formData.videoResumeFile.name}</p>
                  )}
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={uploading}>
              {uploading ? "Uploading..." : "Submit Student Data"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDataEntryForm;
