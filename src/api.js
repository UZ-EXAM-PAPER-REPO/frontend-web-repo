import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,  // we'll use this env variable
});

export default API;
