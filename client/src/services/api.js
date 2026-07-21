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

export const getImageUrl = (url) => {
  if (!url) return 'https://via.placeholder.com/400';
  if (url.startsWith('http') || url.startsWith('data:')) return url;
  const backendUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';
  return `${backendUrl}${url.startsWith('/') ? '' : '/'}${url}`;
};

export default api;
