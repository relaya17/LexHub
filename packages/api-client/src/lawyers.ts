import type { ApiResponse, Lawyer } from './types';
import { getLawyers as getLawyersRaw } from './api';

const BASE_URL = '/api';

export const getAllLawyers = (): Promise<ApiResponse<Lawyer[]>> =>
  getLawyersRaw();

export const searchLawyers = (params: {
  q?: string;
  region?: string;
  specialization?: string;
  minRating?: number;
}): Promise<ApiResponse<Lawyer[]>> => {
  const query = new URLSearchParams();
  if (params.q) query.set('q', params.q);
  if (params.region) query.set('region', params.region);
  if (params.specialization) query.set('specialization', params.specialization);
  if (params.minRating !== undefined)
    query.set('minRating', String(params.minRating));

  const url = `/lawyers/search?${query.toString()}`;
  return fetch(`${BASE_URL}${url}`).then(
    (res) => res.json() as Promise<ApiResponse<Lawyer[]>>,
  );
};

export const getLawyers = async (): Promise<Lawyer[]> => {
  const response = await getLawyersRaw();
  if (!response.success || !response.data) {
    throw new Error(response.error ?? 'Failed to load lawyers');
  }
  return response.data;
};

export const getLawyer = async (id: string): Promise<Lawyer> => {
  const res = await fetch(`${BASE_URL}/lawyers/${id}`);
  const json = (await res.json()) as ApiResponse<Lawyer>;
  if (!json.success || !json.data) {
    throw new Error(json.error ?? 'Failed to load lawyer profile');
  }
  return json.data;
};

export const swipeLawyer = async (
  lawyerId: string,
  liked: boolean,
): Promise<void> => {
  await fetch(`${BASE_URL}/lawyers/${lawyerId}/swipe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ liked }),
  });
};

export const favoriteLawyer = async (lawyerId: string): Promise<void> => {
  await fetch(`${BASE_URL}/lawyers/${lawyerId}/favorite`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
};

export const sendMessageToLawyer = async (
  lawyerId: string,
  message: string,
): Promise<void> => {
  await fetch(`${BASE_URL}/lawyers/${lawyerId}/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
};


