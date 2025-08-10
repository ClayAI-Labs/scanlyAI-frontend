import { axiosClient } from './axiosClient';
import { LoginCredentials, SignupCredentials, User } from '../types';

export const authService = {
  async login(credentials: LoginCredentials) {
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    const response = await axiosClient.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
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