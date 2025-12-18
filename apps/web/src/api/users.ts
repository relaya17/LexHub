import axios from 'axios';
import type { User } from '../types/User';

const API_URL = 'http://localhost:4000/api';

export const usersApi = {
  async getUsers(): Promise<User[]> {
    const response = await axios.get<User[]>(`${API_URL}/users`);
    return response.data;
  },
};


