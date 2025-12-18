export type UserRole = 'client' | 'lawyer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePicture?: string;
  documents?: string[];
}

export interface Lawyer {
  id: string;
  name: string;
  email: string;
  specialization: string[];
  region: string;
  pricePerHour?: number;
  pricePerLetter?: number;
  rating?: number;
  bio?: string;
  publications?: { title: string; url?: string }[];
}

export type LetterType =
  | 'Work'
  | 'Debt'
  | 'Housing'
  | 'Family'
  | 'Consumer'
  | 'General';

export type LetterStatus = 'Draft' | 'Sent' | 'Approved';

export interface Letter {
  id: string;
  title: string;
  type: LetterType;
  content: string;
  clientId: string;
  lawyerId?: string;
  status: LetterStatus;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export interface Contract {
  id: string;
  clientId: string;
  lawyerId?: string;
  title?: string;
  content: string;
  analysis?: string; // AI analysis
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

