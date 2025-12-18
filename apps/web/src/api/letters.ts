import axios from 'axios';
import type { Letter } from '../types/Letter';

const API_URL = 'http://localhost:4000/api';

export const lettersApi = {
  async getLetters(): Promise<Letter[]> {
    const response = await axios.get<Letter[]>(`${API_URL}/letters`);
    return response.data;
  },

  async createLetter(letter: Letter): Promise<Letter> {
    const response = await axios.post<Letter>(`${API_URL}/letters`, letter);
    return response.data;
  },
};


