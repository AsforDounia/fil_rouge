import axios from 'axios';
import { toast } from 'react-toastify'; // Assure-toi que tu utilises toast quelque part

const BASE_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const getToken = () => localStorage.getItem('token');

const handleRequest = (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const handleRequestError = (error) => Promise.reject(error);

const handleResponse = (response) => response;

const handleResponseError = (error) => {
  const status = error.response?.status;

  if (status === 401) {
    const errorMessage = error.response.data?.message || 'Unauthorized access';
    toast?.error?.(errorMessage);
    localStorage.removeItem('token');
    window.location.href = '/login';
  } else if (error.response) {
    const message = error.response.data?.message || 'Unknown error occurred';
    toast?.error?.(message);
  } else if (error.request) {
    toast?.error?.('Network error. Please try again.');
  } else {
    toast?.error?.('An unexpected error occurred.');
  }

  return Promise.reject(error);
};

const createApi = (baseURL) => {
  const instance = axios.create({
    baseURL,
    headers: BASE_HEADERS,
    withCredentials: true,
  });

  instance.interceptors.request.use(handleRequest, handleRequestError);
  instance.interceptors.response.use(handleResponse, handleResponseError);

  return instance;
};

// API 
const api = createApi('http://127.0.0.1:8000/api');

export { api};
export default api;
