
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import InterviewCard, { Interview } from "./InterviewCard";
import { studentService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface UpcomingInterviewsTabProps {
  interviews: Interview[];
}

const UpcomingInterviewsTab = ({ interviews: propInterviews }: UpcomingInterviewsTabProps) => {
  const [interviews, setInterviews] = useState<Interview[]>(propInterviews);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        setIsLoading(true);
        const response = await studentService.getInterviews();
        if (response.success) {
          setInterviews(response.data.upcoming);
        }
      } catch (error) {
        console.error("Error fetching interviews:", error);
        // Fallback to prop data if API fails
        setInterviews(propInterviews);
        toast({
          title: "Failed to load interviews",
          description: "Using cached data instead. Please check your network connection.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterviews();
  }, [propInterviews, toast]);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p>Loading interviews...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {interviews.length > 0 ? (
        interviews.map((interview) => (
          <InterviewCard key={interview.id} interview={interview} />
        ))
      ) : (
        <Card>
          <CardContent className="pt-6 text-center">
            <p>No upcoming interviews scheduled.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UpcomingInterviewsTab;
