
import axios from 'axios';

// Get API URL from environment or use fallback URL
const API_URL = import.meta.env.VITE_API_URL || 'https://placesuccess-backend-render-1.onrender.com';

// Create an axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  // Add timeout to avoid hanging requests
  timeout: 10000,
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check for network error
    if (!error.response) {
      console.error('Server connection error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: async (username: string, password: string, role: string) => {
    try {
      const response = await api.post('/auth/login', { username, password, role });
      return response.data;
    } catch (error: any) {
      console.error('Login error details:', error);
      throw error;
    }
  },
  register: async (username: string, password: string, role: string, name: string) => {
    const response = await api.post('/auth/register', { username, password, role, name });
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getCurrentUser: async () => {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
};

// Student services
export const studentService = {
  getProfile: async () => {
    const response = await api.get('/students/profile');
    return response.data;
  },
  updateProfile: async (profileData: any) => {
    const response = await api.put('/students/profile', profileData);
    return response.data;
  },
  getInterviews: async () => {
    const response = await api.get('/students/interviews');
    return response.data;
  },
  getApplications: async () => {
    const response = await api.get('/students/applications');
    return response.data;
  },
  getDocuments: async () => {
    const response = await api.get('/students/documents');
    return response.data;
  }
};

// Employer services
export const employerService = {
  getJobs: async () => {
    const response = await api.get('/employers/jobs');
    return response.data;
  }
};

// Placement services
export const placementService = {
  getDrives: async () => {
    const response = await api.get('/placements/drives');
    return response.data;
  },
  addDrive: async (driveData: any) => {
    const response = await api.post('/placements/drives', driveData);
    return response.data;
  },
  getCompanies: async () => {
    const response = await api.get('/placements/companies');
    return response.data;
  },
  addCompany: async (companyData: any) => {
    const response = await api.post('/placements/companies', companyData);
    return response.data;
  },
  getDepartmentChartData: async () => {
    const response = await api.get('/placements/charts/department');
    return response.data;
  },
  downloadChart: async (chartType: string, format: string = 'pdf') => {
    // In a real application, this would hit an endpoint that returns a file
    // For this mock implementation, we'll simulate a file download
    return {
      success: true,
      message: `Chart ${chartType} downloaded as ${format}`,
      url: "data:application/pdf;base64,JVBERi0xLjMKJcTl8uXrp/Og0MTGCjQgMCBvYmoKPDwgL0xlbmd0aCA1IDAgUiAvRmlsdGVyIC9GbGF0ZURlY29kZSA+PgpzdHJlYW0KeAFLFErrecUYn1ViLekcq8eLiYGBgYkEYUYGJqYczwIFBgBQFwRyqIvD8UM7rvwvPnXuRxWTRwNuMns1PTPp09jy/Lnq87t0ut9HW3b8efmtcVL38Vq+7x3PXQsFXLQ8XVRcctHS38yu14Ji8mfPeh478Ng96uPl+KG3SxoXL99oCAH7ao0r7WSqpXCCugO0M6S5LFV7X66asnrMot0CgN0bRgplbmRzdHJlYW0KZW5kb2JqCjUgMCBvYmoKMTU0CmVuZG9iagoyIDAgb2JqCjw8IC9UeXBlIC9QYWdlIC9QYXJlbnQgMyAwIFIgL1Jlc291cmNlcyA2IDAgUiAvQ29udGVudHMgNCAwIFIgL01lZGlhQm94IFswIDAgNTk1IDg0Ml0KPj4KZW5kb2JqCjYgMCBvYmoKPDwgL1Byb2NTZXQgWyAvUERGIC9UZXh0IC9JbWFnZUIgL0ltYWdlQyAvSW1hZ2VJIF0gL0NvbG9yU3BhY2UgPDwgL0NzNQo3IDAgUiA+PiAvRm9udCA8PCAvVFQxIDggMCBSID4+IC9YT2JqZWN0IDw8ID4+ID4+CmVuZG9iagozIDAgb2JqCjw8IC9UeXBlIC9Gb250RGVzY3JpcHRvciAvRm9udE5hbWUgL0FBQUFBQStDYWxpYnJpIC9GbGFncyA0IC9Gb250QkJveCBbLTUwMyAtMzA3CjEyNDAgOTY0XSAvSXRhbGljQW5nbGUgMCAvQXNjZW50IDk1MiAvRGVzY2VudCAtMjY5IC9DYXBIZWlnaHQgNjQ0IC9TdGVtVgowIC9MZWFkaW5nIDIwOCAvWEhlaWdodCA0NzYgL0F2Z1dpZHRoIDUyMSAvTWF4V2lkdGggMTMyOCAvRm9udEZpbGUyIDEzIDAgUgo+PgplbmRvYmoKOCAwIG9iago8PCAvVGl0bGUgKCkgL0F1dGhvciAoKSAvU3ViamVjdCAoKSAvS2V5d29yZHMgKCkgL0NyZWF0b3IgKEFjcm9iYXQgUERGTWFrZXIKMTAuMCBmb3IgV29yZCkgL1Byb2R1Y2VyIChBZG9iZSBQREYgTGlicmFyeSAxMC4wKSAvQ3JlYXRpb25EYXRlIChEOjIwMTcwMjI0MTgxNDI3LSAKMDgnMDAnKSAvTW9kRGF0ZSAoRDoyMDE3MDIyNDE4MTQyNy0gMDgnMDAnKSA+PgplbmRvYmoKMTIgMCBvYmoKMTc0CmVuZG9iagoxMyAwIG9iago8PCAvTGVuZ3RoIDE1IDAgUiAvRmlsdGVyIC9GbGF0ZURlY29kZSAvTGVuZ3RoMSAzNzEyIC9Mb2FkIFRydWUgPj4Kc3RyZWFtCngBXZA7jsQwCIZ7nYIblJb8EvGcZnfaGe0FsI2TQgmBop23X8B2NqM2/BJ8P2SbMGUu6ac8JZtw5syzzcGOuOIWkmUE48x0pYJ0Qd5t6wtn8UNfqSq1wAMxVASdMTuvTQ/M59PXWQOF9EnQzkx21A3u9ua+g77sMWRfUS+IL4yI0slXw+hokQtVs0gPm3D3HWIJe1LfI3yMX0bFeuc4DC5GcjhJNXohq5WfkrfKD99pyacjW70C5Apk"
    };
  }
};

export default api;
