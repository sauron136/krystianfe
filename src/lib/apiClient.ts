import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token if needed (optional)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Return response data directly
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('[API Error]', error);
    return Promise.reject(error);
  }
);

export default apiClient;
