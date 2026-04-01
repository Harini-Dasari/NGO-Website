import axios from 'axios'

// Central Axios instance so Phase 2 can call the backend with one import.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const adminRequestConfig = () => ({
  headers: {
    'x-admin-token': import.meta.env.VITE_ADMIN_TOKEN || '',
  },
})

export default api
