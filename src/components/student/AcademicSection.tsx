
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const AcademicSection = () => {
  const semesters = [
    {
      semester: 1,
      year: "2021-22",
      sgpa: 8.7,
      status: "Completed",
      subjects: [
        { name: "Engineering Mathematics I", grade: "A", credits: 4 },
        { name: "Programming Fundamentals", grade: "A+", credits: 4 },
        { name: "Digital Electronics", grade: "B+", credits: 3 },
        { name: "Engineering Physics", grade: "A", credits: 4 },
        { name: "Communication Skills", grade: "A", credits: 2 }
      ]
    },
    {
      semester: 2,
      year: "2021-22",
      sgpa: 8.9,
      status: "Completed",
      subjects: [
        { name: "Engineering Mathematics II", grade: "A", credits: 4 },
        { name: "Data Structures", grade: "A", credits: 4 },
        { name: "Computer Organization", grade: "B+", credits: 3 },
        { name: "Engineering Chemistry", grade: "A", credits: 4 },
        { name: "Technical Writing", grade: "A+", credits: 2 }
      ]
    },
    {
      semester: 3,
      year: "2022-23",
      sgpa: 9.1,
      status: "Completed",
      subjects: [
        { name: "Discrete Mathematics", grade: "A", credits: 4 },
        { name: "Object Oriented Programming", grade: "A+", credits: 4 },
        { name: "Database Management Systems", grade: "A", credits: 4 },
        { name: "Computer Networks", grade: "B+", credits: 3 },
        { name: "Economics for Engineers", grade: "A", credits: 3 }
      ]
    },
    {
      semester: 4,
      year: "2022-23",
      sgpa: 8.8,
      status: "Completed",
      subjects: [
        { name: "Probability and Statistics", grade: "B+", credits: 4 },
        { name: "Operating Systems", grade: "A", credits: 4 },
        { name: "Algorithms", grade: "A", credits: 4 },
        { name: "Software Engineering", grade: "A", credits: 3 },
        { name: "Professional Ethics", grade: "A+", credits: 2 }
      ]
    },
    {
      semester: 5,
      year: "2023-24",
      sgpa: 9.2,
      status: "Completed",
      subjects: [
        { name: "Artificial Intelligence", grade: "A+", credits: 4 },
        { name: "Web Technologies", grade: "A", credits: 4 },
        { name: "Computer Graphics", grade: "B+", credits: 3 },
        { name: "Theory of Computation", grade: "A", credits: 4 },
        { name: "Minor Project", grade: "A+", credits: 2 }
      ]
    },
    {
      semester: 6,
      year: "2023-24",
      sgpa: 9.3,
      status: "Completed",
      subjects: [
        { name: "Machine Learning", grade: "A+", credits: 4 },
        { name: "Cloud Computing", grade: "A", credits: 4 },
        { name: "Information Security", grade: "A", credits: 3 },
        { name: "Compiler Design", grade: "B+", credits: 4 },
        { name: "Technical Seminar", grade: "A+", credits: 2 }
      ]
    }
  ];

  const calculateCgpa = (semesters: any[]) => {
    const totalSgpa = semesters.reduce((sum, sem) => sum + sem.sgpa, 0);
    return (totalSgpa / semesters.length).toFixed(2);
  };

  const cgpa = calculateCgpa(semesters);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Academic Performance</CardTitle>
          <CardDescription>
            Your semester-wise academic records and CGPA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Card className="flex-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">CGPA</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{cgpa}</div>
                  <Progress value={(parseFloat(cgpa) / 10) * 100} className="h-2 mt-2" />
                </CardContent>
              </Card>
              <Card className="flex-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Semesters Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{semesters.length} / 8</div>
                  <Progress value={(semesters.length / 8) * 100} className="h-2 mt-2" />
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Semester-wise Performance</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Semester</TableHead>
                    <TableHead>Academic Year</TableHead>
                    <TableHead>SGPA</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {semesters.map((sem) => (
                    <TableRow key={sem.semester}>
                      <TableCell className="font-medium">{sem.semester}</TableCell>
                      <TableCell>{sem.year}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {sem.sgpa}
                          <Progress value={(sem.sgpa / 10) * 100} className="h-2 w-24" />
                        </div>
                      </TableCell>
                      <TableCell>{sem.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcademicSection;
