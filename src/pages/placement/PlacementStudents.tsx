import Layout from "@/components/layout/Layout";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { placementService } from "@/services/api";

interface Student {
  usn: string;
  name: string;
  branch: string;
  company_names?: string;
  number_of_offers?: number;
  email?: string;
  contact_number?: string;
  year_of_passing?: string;
  be_cgpa?: number;
  tenth_percentage?: number;
  twelfth_percentage?: number;
  permanent_address?: string;
  has_internship?: string;
  internship_count?: number;
  has_projects?: string;
  project_count?: number;
  has_work_experience?: string;
  work_experience_months?: number;
  sem1_marks?: number; sem2_marks?: number; sem3_marks?: number; sem4_marks?: number;
  sem5_marks?: number; sem6_marks?: number; sem7_marks?: number; sem8_marks?: number;
  diploma_sem1?: number; diploma_sem2?: number; diploma_sem3?: number;
  diploma_sem4?: number; diploma_sem5?: number; diploma_sem6?: number;
  resume_file?: string; video_resume_file?: string;
}

const PlacementStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Student | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await placementService.getAllStudentsData();
        if (res.success) setStudents(res.data);
      } catch (e) {
        console.error("Failed to load students", e);
      }
    };
    fetchStudents();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return students.filter(s =>
      s.name?.toLowerCase().includes(q) ||
      s.usn?.toLowerCase().includes(q) ||
      s.branch?.toLowerCase().includes(q)
    );
  }, [students, query]);

  return (
    <Layout userType="placement">
      <div className="animate-fade-in space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Student Analytics</h1>
          <p className="text-muted-foreground">Search and view complete student information</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Students</CardTitle>
            <CardDescription>Consolidated student profiles with placement details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-4 mb-4">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, USN, or branch"
              />
            </div>
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>USN</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead>Offers</TableHead>
                    <TableHead>CGPA</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((s) => (
                    <TableRow key={s.usn}>
                      <TableCell className="font-medium">{s.usn}</TableCell>
                      <TableCell>{s.name}</TableCell>
                      <TableCell>{s.branch}</TableCell>
                      <TableCell>{s.number_of_offers ?? 0}</TableCell>
                      <TableCell>{s.be_cgpa ?? '-'}</TableCell>
                      <TableCell>{s.email}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => { setSelected(s); setOpen(true); }}>View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Student Details - {selected?.name}</DialogTitle>
            </DialogHeader>
            {selected && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Core</h3>
                  <ul className="space-y-1 text-sm">
                    <li><strong>USN:</strong> {selected.usn}</li>
                    <li><strong>Branch:</strong> {selected.branch}</li>
                    <li><strong>Year of Passing:</strong> {selected.year_of_passing}</li>
                    <li><strong>Email:</strong> {selected.email}</li>
                    <li><strong>Phone:</strong> {selected.contact_number}</li>
                    <li><strong>Address:</strong> {selected.permanent_address}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Academics</h3>
                  <ul className="space-y-1 text-sm">
                    <li><strong>CGPA:</strong> {selected.be_cgpa}</li>
                    <li><strong>10th %:</strong> {selected.tenth_percentage}</li>
                    <li><strong>12th %:</strong> {selected.twelfth_percentage}</li>
                    <li><strong>BE Semesters:</strong> {[selected.sem1_marks,selected.sem2_marks,selected.sem3_marks,selected.sem4_marks,selected.sem5_marks,selected.sem6_marks,selected.sem7_marks,selected.sem8_marks].filter(v=>v!==undefined&&v!==null).join(', ') || '-'}</li>
                    <li><strong>Diploma Semesters:</strong> {[selected.diploma_sem1,selected.diploma_sem2,selected.diploma_sem3,selected.diploma_sem4,selected.diploma_sem5,selected.diploma_sem6].filter(v=>v!==undefined&&v!==null).join(', ') || '-'}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Experience</h3>
                  <ul className="space-y-1 text-sm">
                    <li><strong>Internships:</strong> {selected.has_internship} {selected.internship_count ? `(${selected.internship_count})` : ''}</li>
                    <li><strong>Projects:</strong> {selected.has_projects} {selected.project_count ? `(${selected.project_count})` : ''}</li>
                    <li><strong>Work Experience:</strong> {selected.has_work_experience} {selected.work_experience_months ? `(${selected.work_experience_months} months)` : ''}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Placement</h3>
                  <ul className="space-y-1 text-sm">
                    <li><strong>Companies:</strong> {selected.company_names || '-'}</li>
                    <li><strong>Number of Offers:</strong> {selected.number_of_offers ?? 0}</li>
                    <li className="truncate"><strong>Resume:</strong> {selected.resume_file ? selected.resume_file : '-'}</li>
                    <li className="truncate"><strong>Video Resume:</strong> {selected.video_resume_file ? selected.video_resume_file : '-'}</li>
                  </ul>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default PlacementStudents;
