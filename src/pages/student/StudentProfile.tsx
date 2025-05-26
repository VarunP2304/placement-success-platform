
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import StudentDataEntryForm from "@/components/student/StudentDataEntryForm";
import DocumentsSection from "@/components/student/DocumentsSection";

const StudentProfile = () => {
  const [activeTab, setActiveTab] = useState("data-entry");

  return (
    <Layout userType="student">
      <div className="animate-fade-in space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Student Portal</h1>
          <p className="text-muted-foreground">
            Complete your profile and upload required documents
          </p>
        </div>

        <Tabs defaultValue="data-entry" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="data-entry">Data Entry</TabsTrigger>
            <TabsTrigger value="documents">My Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="data-entry" className="mt-6">
            <StudentDataEntryForm />
          </TabsContent>
          
          <TabsContent value="documents" className="mt-6">
            <DocumentsSection />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StudentProfile;
