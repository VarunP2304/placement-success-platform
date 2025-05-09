
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpcomingInterviewsTab from "@/components/student/interviews/UpcomingInterviewsTab";
import PastInterviewsTab from "@/components/student/interviews/PastInterviewsTab";
import { upcomingInterviewsData, pastInterviewsData } from "@/components/student/interviews/InterviewData";

const StudentInterviews = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  
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

          <TabsContent value="upcoming">
            <UpcomingInterviewsTab interviews={upcomingInterviewsData} />
          </TabsContent>

          <TabsContent value="past">
            <PastInterviewsTab interviews={pastInterviewsData} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StudentInterviews;
