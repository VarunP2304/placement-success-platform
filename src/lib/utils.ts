
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validateUsername(username: string, role: string): boolean {
  const patterns = {
    student: /^4SF\d{2}(CS|CI|IS|CD|ME|RA|EC|BA)\d{3}$/,
    placement: /^FA\d{3}$/,
  };
  
  const pattern = patterns[role as keyof typeof patterns];
  return pattern ? pattern.test(username) : false;
}

export function extractDepartmentFromUSN(usn: string): string {
  const deptMap = {
    'CS': 'CSE',
    'CI': 'CSE AIML', 
    'IS': 'ISE',
    'CD': 'CSE DS',
    'ME': 'ME',
    'RA': 'RA',
    'EC': 'ECE',
    'BA': 'MBA'
  };
  
  const deptCode = usn.substring(5, 7);
  return deptMap[deptCode as keyof typeof deptMap] || 'Unknown';
}

export function extractYearFromUSN(usn: string): string {
  return '20' + usn.substring(3, 5);
}
