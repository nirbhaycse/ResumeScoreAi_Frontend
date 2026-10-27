import axios from "axios";

const hostname = window.location.hostname;
const replitBackend =
  hostname.includes("replit.dev")
    ? `https://${hostname.replace("-00-", "-01-")}`
    : "http://localhost:3001";

// Set VITE_API_BASE_URL in your environment to override the default backend host.
// Provide only the origin, e.g. https://api.example.com (the /api suffix is added below).
const backendURL = (import.meta.env.VITE_API_BASE_URL || replitBackend).replace(/\/$/, "");

const instance = axios.create({
  baseURL: `${backendURL}/api`,
  withCredentials: true,
});

export default instance;
