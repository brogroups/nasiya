import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nasiya.safonon.uz',
  timeout: 40000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)



export default api;