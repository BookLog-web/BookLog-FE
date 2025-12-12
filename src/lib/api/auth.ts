import { apiClient } from '../api-client';

export interface User {
  id: string;
  email: string;
  nickname: string | null;
  avatar: string | null;
  provider: string;
  createdAt: string;
}

export const authApi = {
  /**
   * Get current authenticated user
   */
  getCurrentUser: () => apiClient.get<User>('/auth/me'),

  /**
   * Logout user (clear local storage)
   */
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('accessToken');
  },

  /**
   * Get stored access token
   */
  getAccessToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
  },
};
