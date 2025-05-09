
import { Interview } from "./InterviewCard";

export const upcomingInterviewsData: Interview[] = [
  {
    id: 1,
    company: "Google",
    position: "Software Engineer",
    date: "2025-05-12",
    time: "10:00 AM",
    mode: "Online",
    round: "Technical",
    status: "Scheduled",
  },
  {
    id: 2,
    company: "Microsoft",
    position: "Backend Developer",
    date: "2025-05-15",
    time: "2:00 PM",
    mode: "In-person",
    round: "HR",
    status: "Scheduled",
  },
];

export const pastInterviewsData: Interview[] = [
  {
    id: 3,
    company: "Amazon",
    position: "Frontend Developer",
    date: "2025-05-01",
    time: "11:00 AM",
    mode: "Online",
    round: "Technical",
    status: "Completed",
    feedback: "Good performance on algorithms, needs improvement on system design.",
    result: "Shortlisted for next round",
  },
  {
    id: 4,
    company: "Apple",
    position: "iOS Developer",
    date: "2025-04-28",
    time: "3:00 PM",
    mode: "In-person",
    round: "Technical + HR",
    status: "Completed",
    feedback: "Excellent communication skills, good technical knowledge.",
    result: "Selected",
  },
];
