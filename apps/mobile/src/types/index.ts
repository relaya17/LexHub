export type { User, Letter, Contract, LetterType } from '@lexhub/types/domain';

export interface LetterData {
  id?: string;
  type: import('@lexhub/types/domain').LetterType;
  subject: string;
  content: string;
  clientName: string;
  clientEmail: string;
  lawyerId?: string;
}

export interface ContractCheckData {
  id?: string;
  fileName: string;
  fileUri: string;
  summary?: string;
  clientName: string;
  clientEmail: string;
}


