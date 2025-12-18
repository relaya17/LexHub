export type LetterCategory = 'general' | 'work' | 'housing' | 'debts';

export type LetterFieldKey =
  | 'senderName'
  | 'recipientName'
  | 'issueDescription'
  | 'eventDate'
  | 'requestedAction';

export type LetterField =
  | { key: 'senderName'; label: 'שם השולחת'; required: true }
  | { key: 'recipientName'; label: 'שם הנמען'; required: true }
  | { key: 'issueDescription'; label: 'תיאור הבעיה'; required: true }
  | { key: 'eventDate'; label: 'תאריך האירוע'; required: false }
  | { key: 'requestedAction'; label: 'מה נדרש מהנמען'; required: true };

export interface LetterTemplate {
  id: 'pre-legal-notice';
  title: 'מכתב התראה לפני נקיטת הליכים';
  category: LetterCategory;
  requiresLawyerReview: boolean;
  fields: LetterField[];
  body: string;
  disclaimer: string;
}

export type LetterFieldValues = Partial<Record<LetterFieldKey, string>>;


