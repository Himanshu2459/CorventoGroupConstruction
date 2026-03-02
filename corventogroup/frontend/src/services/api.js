import axios from 'axios';

/**
 * BASE URL LOGIC
 * ----------------
 * 1. Local dev  → uses CRA proxy (/api)
 * 2. Production → uses REACT_APP_API_URL
 *
 * Local:
 *   package.json → "proxy": "http://localhost:5000"
 *   API calls → /api/...
 *
 * Production (AWS):
 *   REACT_APP_API_URL=https://your-backend-domain/api
 */

const API_URL =
  process.env.REACT_APP_API_URL || '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

/**
 * REQUEST INTERCEPTOR
 * -------------------
 * Attach JWT token if available
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * RESPONSE INTERCEPTOR
 * --------------------
 * Centralized error handling
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: log error globally
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

/* =========================
   PROJECTS API
   ========================= */
export const projectsAPI = {
  getAll: (params) => api.get('/projects', { params }),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`)
};

/* =========================
   SERVICES API
   ========================= */
export const servicesAPI = {
  getAll: () => api.get('/services'),
  getById: (id) => api.get(`/services/${id}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`)
};

/* =========================
   CONTACT / REGISTER API
   ========================= */
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: (params) => api.get('/contact', { params }),
  update: (id, data) => api.put(`/contact/${id}`, data)
};

/* =========================
   TESTIMONIALS API
   ========================= */
export const testimonialsAPI = {
  getAll: () => api.get('/testimonials'),
  getAllAdmin: () => api.get('/testimonials/all'),
  create: (data) => api.post('/testimonials', data),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`)
};

/* =========================
   AUTH API
   ========================= */
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/me')
};

export default api;
