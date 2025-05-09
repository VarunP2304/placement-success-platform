
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import InterviewTableRow from "./InterviewTableRow";
import { Interview } from "./InterviewCard";

interface PastInterviewsTabProps {
  interviews: Interview[];
}

const PastInterviewsTab = ({ interviews }: PastInterviewsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview History</CardTitle>
        <CardDescription>
          Review your past interviews and feedback
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Round</TableHead>
              <TableHead>Result</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {interviews.map((interview) => (
              <InterviewTableRow key={interview.id} interview={interview} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Download Interview History
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PastInterviewsTab;
