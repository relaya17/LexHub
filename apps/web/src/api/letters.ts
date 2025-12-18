import type { Letter } from '../types/Letter';
import { http } from './http';

export const lettersApi = {
  async getLetters(): Promise<Letter[]> {
    const response = await http.get<Letter[]>('/letters');
    return response.data;
  },

  async createLetter(letter: Letter): Promise<Letter> {
    const response = await http.post<Letter>('/letters', letter);
    return response.data;
  },
};


