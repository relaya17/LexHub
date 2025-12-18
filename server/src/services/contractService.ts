import type { ContractDocument } from '../models/Contract';
import type { ContractCheckResult } from '@lexhub/api-client/types';
import { ContractModel } from '../models/Contract';

export const analyzeContract = async (
  text: string,
): Promise<ContractCheckResult> => {
  // TODO: להחליף בחיבור אמיתי למנוע AI (OpenAI / שירות אחר)
  if (text.trim().length === 0) {
    return {
      summary: 'לא התקבל טקסט חוזה לניתוח.',
      issues: ['חסר טקסט חוזה לבדיקה.'],
    };
  }

  const summary = `סיכום חוזה (דוגמה): קיים חוזה באורך ${text.length} תווים. מומלץ לשים לב במיוחד לסעיפים המתייחסים לאחריות, ביטול והתחייבויות כספיות.`;

  const issues: string[] = [];
  if (!/ביטול|סיום/.test(text)) {
    issues.push('לא נמצא סעיף מפורש לגבי סיום או ביטול החוזה.');
  }
  if (!/אחריות/.test(text)) {
    issues.push('ייתכן שאין התייחסות מספקת לאחריות הצדדים.');
  }
  if (!/שיפוי/.test(text)) {
    issues.push('לא מופיע סעיף שיפוי – שקלי האם נדרש סעיף כזה לנסיבות המקרה.');
  }

  if (issues.length === 0) {
    issues.push(
      'לא זוהו בעיות בולטות בנוסח החוזה. עם זאת, מומלץ לקבל ייעוץ משפטי פרטני.',
    );
  }

  return { summary, issues };
};

export const saveContractAnalysis = async (
  text: string,
  clientId: string,
  analysis: string,
): Promise<ContractDocument> => {
  const contract = await ContractModel.create({
    fileUrl: 'inline-text', // בעתיד: קישור לקובץ ב-S3 / storage
    clientId,
    report: analysis,
  });

  return contract;
};


