import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';

axios.defaults.withCredentials = true;

const API_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL
  : '/api';

console.log('API_URL:', API_URL);


export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,

  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/signup`,
        credentials
      );
      set({
        user: response.data.user,
        isSigningUp: false,
      });
      toast.success('Account created successfully!');
      console.log('Response headers:', response.headers);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Sign up failed');
      set({ isSigningUp: false, user: null });
    }
  },
  login: async (credentials) => {
    console.log('Login function called');
    console.log('API_URL:', API_URL);

    set({ isLoggingIn: true });
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/login`,
        credentials
      );

      set({
        user: response.data.user,
        isLoggingIn: false,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      set({ isLoggingIn: false, user: null });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });

    try {
      await axios.post(`${API_URL}/api/v1/auth/logout`);
      set({ user: null, isLoggingOut: false });
      toast.success('Logged out successfully');
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  },

  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get(`${API_URL}/api/v1/auth/authCheck`);
      set({
        user: response.data.user,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({
        isCheckingAuth: false,
        user: null,
      });
      // toast.error(error.response.data.message || 'An error occurred');
    }
  },
}));
