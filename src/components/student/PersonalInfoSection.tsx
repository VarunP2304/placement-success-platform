
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, GraduationCap, Building } from "lucide-react";
import { studentService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const PersonalInfoSection = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    regNumber: "",
    batch: "",
    bio: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await studentService.getProfile();
        if (response.success) {
          setProfileData(response.data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        // In development, use mock data if API fails
        setProfileData({
          fullName: "John Doe",
          email: "john.doe@university.edu",
          phone: "+1 234 567 8901",
          department: "Computer Science",
          regNumber: "CS2020135",
          batch: "2024",
          bio: "Computer Science student with a passion for AI and web development. Looking for opportunities in software engineering roles."
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      setIsLoading(true);
      const response = await studentService.updateProfile(profileData);
      
      if (response.success) {
        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Your basic profile information visible to placement department and employers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="flex items-center gap-2">
                  <User className="text-muted-foreground h-4 w-4" />
                  <Input 
                    id="fullName" 
                    placeholder="Enter your full name" 
                    value={profileData.fullName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex items-center gap-2">
                  <Mail className="text-muted-foreground h-4 w-4" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    value={profileData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex items-center gap-2">
                  <Phone className="text-muted-foreground h-4 w-4" />
                  <Input 
                    id="phone" 
                    placeholder="Your phone number" 
                    value={profileData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <div className="flex items-center gap-2">
                  <GraduationCap className="text-muted-foreground h-4 w-4" />
                  <Input 
                    id="department" 
                    placeholder="Your department" 
                    value={profileData.department}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="regNumber">Registration Number</Label>
                <div className="flex items-center gap-2">
                  <Building className="text-muted-foreground h-4 w-4" />
                  <Input 
                    id="regNumber" 
                    placeholder="Registration number" 
                    value={profileData.regNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="batch">Batch Year</Label>
                <div className="flex items-center gap-2">
                  <GraduationCap className="text-muted-foreground h-4 w-4" />
                  <Input 
                    id="batch" 
                    placeholder="Graduation year" 
                    value={profileData.batch}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid gap-4">
            <Label htmlFor="bio">Bio / About Me</Label>
            <textarea 
              id="bio" 
              className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Write a brief introduction about yourself"
              value={profileData.bio}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleSaveChanges} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInfoSection;
