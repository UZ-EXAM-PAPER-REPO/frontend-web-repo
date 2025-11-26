import axios from 'axios';

// Vite exposes env variables through import.meta.env. Use VITE_ prefix for custom variables.
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
});

export default API;
