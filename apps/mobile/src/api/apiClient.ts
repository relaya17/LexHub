import type { User } from '../types/User';
import type { Letter } from '../types/Letter';
import type { Contract } from '../types/Contract';

// Expo: configure via EXPO_PUBLIC_API_URL (e.g. "https://lexhub-server.onrender.com/api")
// Local dev default:
const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:6025/api';

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

async function postJson<TBody, TResponse>(path: string, body: TBody): Promise<TResponse> {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as TResponse;
}

export const apiClient = {
  getUsers(): Promise<User[]> {
    return getJson<User[]>('/users');
  },

  getLetters(): Promise<Letter[]> {
    return getJson<Letter[]>('/letters');
  },

  createLetter(letter: Letter): Promise<Letter> {
    return postJson<Letter, Letter>('/letters', letter);
  },

  getContracts(): Promise<Contract[]> {
    return getJson<Contract[]>('/contracts');
  },

  createContract(contract: Contract): Promise<Contract> {
    return postJson<Contract, Contract>('/contracts', contract);
  },
};


