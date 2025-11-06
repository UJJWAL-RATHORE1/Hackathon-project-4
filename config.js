// API configuration
// In development, uses Vite proxy (/api -> http://localhost:3001)
// In production, uses VITE_API_URL environment variable
export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const API_ENDPOINTS = {
  health: `${API_BASE_URL}/api/health`,
  analyze: `${API_BASE_URL}/api/analyze`,
  chat: `${API_BASE_URL}/api/chat`,
};

