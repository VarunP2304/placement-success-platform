
import { Calendar, Clock, Building2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Interview {
  id: number;
  company: string;
  position: string;
  date: string;
  time: string;
  mode: string;
  round: string;
  status: string;
  feedback?: string;
  result?: string;
}

interface InterviewCardProps {
  interview: Interview;
}

const InterviewCard = ({ interview }: InterviewCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{interview.company}</CardTitle>
            <CardDescription>{interview.position}</CardDescription>
          </div>
          <Badge>{interview.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span>Date: {interview.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <span>Time: {interview.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <span>Mode: {interview.mode}</span>
          </div>
          <div>
            <span className="font-medium">Round: {interview.round}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">View Details</Button>
        <Button>Prepare</Button>
      </CardFooter>
    </Card>
  );
};

export default InterviewCard;
