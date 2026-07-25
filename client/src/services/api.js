import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const getFaculty = () => api.get('/faculty');
export const getNews = () => api.get('/news');
export const getActivities = () => api.get('/activities');
export const getPlacements = () => api.get('/placements');
export const getLabs = () => api.get('/labs');
export const getSettings = () => api.get('/settings');
export const getAchievements = () => api.get('/achievements');
export const getLinks = () => api.get('/links');
export const getFacultyAchievements = () => api.get('/faculty-achievements');

export const getImageUrl = (url) => {
  if (!url) return 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }
  const defaultBase = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
    ? window.location.origin
    : 'http://localhost:5000';
  const backendUrl = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '')
    : defaultBase;
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `${backendUrl}${cleanPath}`;
};

export default api;
