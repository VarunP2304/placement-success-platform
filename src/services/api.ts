
import axios from 'axios';

// Get API URL from environment or use fallback URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create an axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
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
  getProfile: async (usn?: string) => {
    const response = await api.get(`/students/profile${usn ? `/${usn}` : ''}`);
    return response.data;
  },
  updateProfile: async (profileData: any) => {
    const response = await api.post('/students/profile', profileData);
    return response.data;
  },
  getDocuments: async () => {
    const response = await api.get('/students/documents');
    return response.data;
  },
  getAllStudents: async () => {
    const response = await api.get('/students/analytics');
    return response.data;
  },
  getInterviews: async () => {
    const response = await api.get('/students/interviews');
    return response.data;
  }
};

// Placement services
export const placementService = {
  getAllStudentsData: async () => {
    const response = await api.get('/students/analytics');
    return response.data;
  },
  getDepartmentChartData: async () => {
    const response = await api.get('/placements/charts/department');
    return response.data;
  },
  downloadChart: async (chartType: string, format: string = 'pdf') => {
    return {
      success: true,
      message: `Chart ${chartType} downloaded as ${format}`,
      url: "data:application/pdf;base64,JVBERi0xLjMKJcTl8uXrp..."
    };
  },
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
  updateCompany: async (id: number, companyData: any) => {
    const response = await api.put(`/placements/companies/${id}`, companyData);
    return response.data;
  },
  deleteCompany: async (id: number) => {
    const response = await api.delete(`/placements/companies/${id}`);
    return response.data;
  }
};

export default api;
