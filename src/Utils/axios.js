import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',

  withCredentials: true,
  timeout: 40000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403) {
      localStorage.removeItem("user");
    }

    return Promise.reject(error);
  }
);


export default api;