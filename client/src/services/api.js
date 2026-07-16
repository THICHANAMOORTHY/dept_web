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
export const getPlacements = () => api.get('/placements');

export default api;
