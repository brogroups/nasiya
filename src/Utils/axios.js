import axios from 'axios';

const api = axios.create({
 baseURL: 'https://your-api-url.com', // o'zgartiring kerakli API manziliga
 timeout: 10000,
 headers: {
  'Content-Type': 'application/json',
 },
});

// Interceptor for request
api.interceptors.request.use(
 (config) => {
  // Add any custom logic before sending the request
  // For example, you can add authentication tokens here
  return config;
 },
 (error) => {
  // Handle request error
  return Promise.reject(error);
 }
); 

export default api;