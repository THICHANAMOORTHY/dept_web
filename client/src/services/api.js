import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Depending on server port
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getFaculty = () => api.get('/faculty');
export const getNews = () => api.get('/news');
export const getPlacements = () => api.get('/placements');

export default api;
