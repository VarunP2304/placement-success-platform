
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
    // Basic Details
    name: "",
    usn: "",
    branch: "",
    companyNames: "",
    numberOfOffers: "",
    email: "",
    contactNumber: "",
    yearOfPassing: "",
    beCgpa: "",
    tenthPercentage: "",
    twelfthPercentage: "",
    
    // Additional Details
    permanentAddress: "",
    hasInternship: "",
    internshipCount: "",
    hasProjects: "",
    projectCount: "",
    hasWorkExperience: "",
    workExperienceMonths: "",
    
    // Semester Marks (BE)
    sem1: "", sem2: "", sem3: "", sem4: "",
    sem5: "", sem6: "", sem7: "", sem8: "",
    
    // Diploma Marks (if applicable)
    diplomaSem1: "", diplomaSem2: "", diplomaSem3: "",
    diplomaSem4: "", diplomaSem5: "", diplomaSem6: "",
    
    // Files
    resumeFile: null,
    videoResumeFile: null
  });

  const [uploading, setUploading] = useState(false);

  const branches = [
    { code: "CSE-DS", name: "CSE - DS", prefix: "4SFYYCD" },
    { code: "CSE-AIML", name: "CSE - AIML", prefix: "4SFYYCI" },
    { code: "CSE", name: "CSE", prefix: "4SFYYCS" },
    { code: "CSE-CY", name: "CSE - CY", prefix: "4SFYYCY" },
    { code: "ECE", name: "ECE", prefix: "4SFYYEC" },
    { code: "AI-DS", name: "AI & DS", prefix: "4SFYYAD" },
    { code: "ISE", name: "ISE", prefix: "4SFYYIS" },
    { code: "ME", name: "ME", prefix: "4SFYYME" },
    { code: "RA", name: "RA", prefix: "4SFYYRA" }
  ];

  const generateUSNExample = (branch, yearOfPassing) => {
    if (!branch || !yearOfPassing) return "";
    const branchData = branches.find(b => b.code === branch);
    if (!branchData) return "";
    
    const yoa = String(parseInt(yearOfPassing) - 4).slice(-2);
    return branchData.prefix.replace('YY', yoa) + 'XXX';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
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
        toast.success("Student data submitted successfully!");
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
    if (field === 'resumeFile') {
      if (file && !['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        toast.error("Resume must be PDF or DOCX format");
        return;
      }
      if (file && file.size > 5 * 1024 * 1024) {
        toast.error("Resume file size must be less than 5MB");
        return;
      }
    }
    
    if (field === 'videoResumeFile') {
      if (file && !['video/mp4', 'video/avi', 'video/mov'].includes(file.type)) {
        toast.error("Video resume must be MP4, AVI, or MOV format");
        return;
      }
      if (file && file.size > 50 * 1024 * 1024) {
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
          <CardTitle>Student Registration Form</CardTitle>
          <CardDescription>
            Please fill in all your details accurately
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g., ALOK Y ILLUR"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email ID</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="e.g., alokillur99@gmail.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                    placeholder="e.g., 9740735456"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="yearOfPassing">Year of Passing</Label>
                  <Input
                    id="yearOfPassing"
                    value={formData.yearOfPassing}
                    onChange={(e) => handleInputChange("yearOfPassing", e.target.value)}
                    placeholder="e.g., 2025"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Select onValueChange={(value) => handleInputChange("branch", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map((branch) => (
                        <SelectItem key={branch.code} value={branch.code}>
                          {branch.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formData.branch && formData.yearOfPassing && (
                    <p className="text-sm text-muted-foreground">
                      USN Format: {generateUSNExample(formData.branch, formData.yearOfPassing)}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="usn">USN (University Seat Number)</Label>
                  <Input
                    id="usn"
                    value={formData.usn}
                    onChange={(e) => handleInputChange("usn", e.target.value)}
                    placeholder="e.g., 4SF21CD003"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Academic Performance */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Academic Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="beCgpa">BE CGPA</Label>
                  <Input
                    id="beCgpa"
                    type="number"
                    value={formData.beCgpa}
                    onChange={(e) => handleInputChange("beCgpa", e.target.value)}
                    placeholder="e.g., 9.2"
                    min="0"
                    max="10"
                    step="0.01"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tenthPercentage">10th Percentage</Label>
                  <Input
                    id="tenthPercentage"
                    type="number"
                    value={formData.tenthPercentage}
                    onChange={(e) => handleInputChange("tenthPercentage", e.target.value)}
                    placeholder="e.g., 93.76"
                    min="0"
                    max="100"
                    step="0.01"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="twelfthPercentage">12th Percentage</Label>
                  <Input
                    id="twelfthPercentage"
                    type="number"
                    value={formData.twelfthPercentage}
                    onChange={(e) => handleInputChange("twelfthPercentage", e.target.value)}
                    placeholder="e.g., 95"
                    min="0"
                    max="100"
                    step="0.01"
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

              {/* Diploma Marks (Optional) */}
              <h4 className="font-medium">Diploma Marks (If Applicable)</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((sem) => (
                  <div key={sem} className="space-y-2">
                    <Label htmlFor={`diplomaSem${sem}`}>Diploma Sem {sem}</Label>
                    <Input
                      id={`diplomaSem${sem}`}
                      type="number"
                      value={formData[`diplomaSem${sem}`]}
                      onChange={(e) => handleInputChange(`diplomaSem${sem}`, e.target.value)}
                      min="0"
                      max="100"
                      step="0.01"
                      placeholder="0.00"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Placement Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Placement Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyNames">Company Name(s)</Label>
                  <Input
                    id="companyNames"
                    value={formData.companyNames}
                    onChange={(e) => handleInputChange("companyNames", e.target.value)}
                    placeholder="e.g., Semnox Solutions, LTI Mindtree"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="numberOfOffers">Number of Offers</Label>
                  <Input
                    id="numberOfOffers"
                    type="number"
                    value={formData.numberOfOffers}
                    onChange={(e) => handleInputChange("numberOfOffers", e.target.value)}
                    placeholder="e.g., 2"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Additional Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="permanentAddress">Permanent Address</Label>
                <Textarea
                  id="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={(e) => handleInputChange("permanentAddress", e.target.value)}
                  placeholder="Enter your complete permanent address"
                  required
                />
              </div>

              {/* Experience Details */}
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
              {uploading ? "Submitting..." : "Submit Student Data"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDataEntryForm;
