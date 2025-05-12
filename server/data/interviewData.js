
// Mock interview data copied from the frontend
const upcomingInterviewsData = [
  {
    id: 1,
    company: "Google",
    position: "Software Engineer",
    date: "2024-05-10T10:00:00",
    mode: "Virtual",
    location: "Google Meet",
    preparation: 60,
    round: "Technical",
    status: "Scheduled",
    contactPerson: "Sarah Johnson",
    contactEmail: "sarah.j@google.com",
    notes: "Focus on algorithms and system design"
  },
  {
    id: 2,
    company: "Amazon",
    position: "SDE Intern",
    date: "2024-05-15T14:00:00",
    mode: "On-Campus",
    location: "Interview Room 4",
    preparation: 30,
    round: "Coding",
    status: "Confirmed",
    contactPerson: "Michael Chen",
    contactEmail: "m.chen@amazon.com",
    notes: "Prepare for leadership principles questions"
  },
];

const pastInterviewsData = [
  {
    id: 3,
    company: "Microsoft",
    position: "Software Developer",
    date: "2024-04-20T11:00:00",
    mode: "Virtual",
    location: "Microsoft Teams",
    round: "Technical + HR",
    status: "Selected",
    feedback: "Strong problem solving skills, good cultural fit",
    notes: "Offer letter expected within a week"
  },
  {
    id: 4,
    company: "Adobe",
    position: "Frontend Engineer",
    date: "2024-04-15T09:30:00",
    mode: "On-Campus",
    location: "Seminar Hall",
    round: "Technical",
    status: "Rejected",
    feedback: "Need to improve on system design concepts",
    notes: "Will try again next year"
  },
  {
    id: 5,
    company: "IBM",
    position: "Associate Developer",
    date: "2024-04-10T15:00:00",
    mode: "Virtual",
    location: "Zoom",
    round: "Final",
    status: "Pending Result",
    feedback: "Awaiting final decision",
    notes: "Follow up by email next week"
  }
];

module.exports = {
  upcomingInterviewsData,
  pastInterviewsData
};
