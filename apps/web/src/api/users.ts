import type { User } from '../types/User';
import { http } from './http';

export const usersApi = {
  async getUsers(): Promise<User[]> {
    const response = await http.get<User[]>('/users');
    return response.data;
  },
};


