
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PersonalInfoSection from "@/components/student/PersonalInfoSection";
import DocumentsSection from "@/components/student/DocumentsSection";
import AcademicSection from "@/components/student/AcademicSection";
import PlacementResourcesSection from "@/components/student/PlacementResourcesSection";
import InterviewPerformanceSection from "@/components/student/InterviewPerformanceSection";

const StudentProfile = () => {
  const [activeTab, setActiveTab] = useState("personal-info");

  return (
    <Layout userType="student">
      <div className="animate-fade-in space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Student Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile, documents, and track your placement journey
          </p>
        </div>

        <Tabs defaultValue="personal-info" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="academics">Academics</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal-info" className="mt-6">
            <PersonalInfoSection />
          </TabsContent>
          
          <TabsContent value="documents" className="mt-6">
            <DocumentsSection />
          </TabsContent>
          
          <TabsContent value="academics" className="mt-6">
            <AcademicSection />
          </TabsContent>
          
          <TabsContent value="resources" className="mt-6">
            <PlacementResourcesSection />
          </TabsContent>
          
          <TabsContent value="interviews" className="mt-6">
            <InterviewPerformanceSection />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StudentProfile;
