import type { MatchingFilters } from '@lexhub/types';
import type { Lawyer } from './types';

const BASE_URL = 'http://localhost:4000/api';

export async function fetchMatchingLawyers(
  filters: MatchingFilters,
): Promise<Lawyer[]> {
  const query = new URLSearchParams();

  if (filters.specialties && filters.specialties.length > 0) {
    query.append('specialties', filters.specialties.join(','));
  }
  if (filters.maxDistanceKm !== undefined) {
    query.append('maxDistanceKm', filters.maxDistanceKm.toString());
  }
  if (filters.maxPrice !== undefined) {
    query.append('maxPrice', filters.maxPrice.toString());
  }
  if (filters.availableNow) {
    query.append('availableNow', 'true');
  }

  const url = `${BASE_URL}/lawyers?${query.toString()}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch lawyers');
  }

  return (await res.json()) as Lawyer[];
}


