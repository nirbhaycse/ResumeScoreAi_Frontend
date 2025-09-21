import axios from "axios";

// Get the current domain and construct the backend URL
const currentDomain = window.location.hostname.includes('replit.dev') 
  ? window.location.hostname 
  : 'localhost';

const backendPort = process.env.NODE_ENV === 'development' ? '3001' : '3001';
const backendURL = window.location.hostname.includes('replit.dev')
  ? `https://${currentDomain.replace('-00-', '-01-')}` // Backend typically runs on port 3001, frontend on 5000
  : `http://localhost:${backendPort}`;

const instance = axios.create({
    baseURL: backendURL + "/api",
    withCredentials: true
})

export default instance;