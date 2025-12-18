import type { UserRole } from '../types';
import { http } from './http';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const authApi = {
  async register(payload: RegisterPayload): Promise<{ user: AuthUser }> {
    const response = await http.post<{ success: boolean; data: { user: AuthUser } }>(
      '/auth/register',
      payload,
    );
    if (!response.data.success || !response.data.data) {
      throw new Error('Registration failed');
    }
    return response.data.data;
  },

  async login(payload: LoginPayload): Promise<{ user: AuthUser }> {
    const response = await http.post<{ success: boolean; data: { user: AuthUser } }>(
      '/auth/login',
      payload,
    );
    if (!response.data.success || !response.data.data) {
      throw new Error('Login failed');
    }
    return response.data.data;
  },

  async me(): Promise<{ user: AuthUser }> {
    const response = await http.get<{ success: boolean; data: { user: AuthUser } }>('/auth/me');
    if (!response.data.success || !response.data.data?.user) {
      throw new Error('Not authenticated');
    }
    return response.data.data;
  },

  async logout(): Promise<void> {
    await http.post('/auth/logout');
  },
};


