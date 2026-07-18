import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Depending on server port
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

export const getImageUrl = (url) => {
  if (!url) return 'https://via.placeholder.com/400';
  if (url.startsWith('http') || url.startsWith('data:')) return url;
  return `http://localhost:5000${url.startsWith('/') ? '' : '/'}${url}`;
};

export default api;
