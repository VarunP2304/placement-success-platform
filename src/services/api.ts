
import axios from 'axios';

// Get API URL from environment or use fallback URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
      url: `data:application/pdf;base64,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
`,
    };
  }
};

export default api;
