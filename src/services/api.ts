
import axios from 'axios';

// Create an axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth services
export const authService = {
  login: async (username: string, password: string) => {
    const response = await api.post('/auth/login', { username, password });
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
  }
};

export default api;
