import { axiosClient } from './axiosClient';
import { LoginCredentials, SignupCredentials, User } from '../types';

export const authService = {
  async login(credentials: LoginCredentials) {
    // Try JSON-based login first (simpler for CORS)
    try {
      const response = await axiosClient.post('/auth/login-json', {
        email: credentials.username, // username is actually email
        password: credentials.password
      });
      return response.data;
    } catch (error) {
      // Fallback to form-data login
      console.log('JSON login failed, trying form-data login');
      const formData = new FormData();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);

      const response = await axiosClient.post('/auth/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    }
  },

  async signup(credentials: SignupCredentials) {
    const response = await axiosClient.post('/auth/register', credentials);
    return response.data;
  },

  async getMe(): Promise<User> {
    const response = await axiosClient.get('/auth/me');
    return response.data;
  },
};