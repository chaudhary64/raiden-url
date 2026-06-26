import axios from "axios";
import { store } from "../store/store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  // Read directly from the Redux store — hooks cannot be used outside React components so use cant use the custome hook useAuthToken inside it
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
