
import { Card, CardContent } from "@/components/ui/card";
import InterviewCard, { Interview } from "./InterviewCard";

interface UpcomingInterviewsTabProps {
  interviews: Interview[];
}

const UpcomingInterviewsTab = ({ interviews }: UpcomingInterviewsTabProps) => {
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
