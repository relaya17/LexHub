export type LetterType = 'work' | 'debt' | 'family' | 'general';

export interface LetterForm {
  fullName: string;
  subject: string;
  details: string;
}

export type HandlerType = 'ai' | 'lawyer';

export type LetterStatus = 'draft' | 'sent' | 'completed';

export interface LetterDraft {
  id: string;
  type: LetterType;
  form: LetterForm;
  handler: HandlerType;
  createdAt: string;
  updatedAt: string;
  status: LetterStatus;
}

export interface LawyerProfile {
  id: string;
  name: string;
  specialization: string[];
  region: string;
  pricePerLetter?: number;
  rating?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ContractCheckResult {
  summary: string;
  issues: string[];
}

export interface Lawyer {
  id: string;
  name: string;
  avatarUrl: string;
  specialties: string[];
  priceRange: { min: number; max: number };
  location: { lat: number; lng: number; city: string };
  rating: number;
  bio?: string;
  publications?: { title: string; url?: string }[];
}


