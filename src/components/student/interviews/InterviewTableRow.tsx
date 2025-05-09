
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { Interview } from "./InterviewCard";

interface InterviewTableRowProps {
  interview: Interview;
}

const InterviewTableRow = ({ interview }: InterviewTableRowProps) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{interview.company}</TableCell>
      <TableCell>{interview.position}</TableCell>
      <TableCell>{interview.date}</TableCell>
      <TableCell>{interview.round}</TableCell>
      <TableCell>
        <Badge
          variant={
            interview.result === "Selected"
              ? "default"
              : interview.result?.includes("Shortlisted")
              ? "secondary"
              : "destructive"
          }
        >
          {interview.result}
        </Badge>
      </TableCell>
      <TableCell>
        <Button variant="outline" size="sm">
          View Feedback
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default InterviewTableRow;
