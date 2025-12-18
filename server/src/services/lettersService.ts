import { v4 as uuidv4 } from 'uuid';
import type {
  LetterDraft,
  LetterForm,
  LetterType,
  HandlerType,
} from '@lexhub/api-client/types';

const lettersDB: LetterDraft[] = [];

export const createLetterService = async (
  type: LetterType,
  form: LetterForm,
  handler: HandlerType,
): Promise<LetterDraft> => {
  const now: string = new Date().toISOString();

  const newLetter: LetterDraft = {
    id: uuidv4(),
    type,
    form,
    handler,
    status: 'draft',
    createdAt: now,
    updatedAt: now,
  };

  lettersDB.push(newLetter);

  return newLetter;
};

export const getLetterService = async (id: string): Promise<LetterDraft> => {
  const letter = lettersDB.find((entry) => entry.id === id);

  if (!letter) {
    throw new Error('Letter not found');
  }

  return letter;
};


