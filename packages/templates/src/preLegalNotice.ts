import type {
  LetterTemplate,
  LetterField,
} from '@lexhub/types';

export const PRE_LEGAL_NOTICE_TEMPLATE: LetterTemplate = {
  id: 'pre-legal-notice',
  title: 'מכתב התראה לפני נקיטת הליכים',
  category: 'general',
  requiresLawyerReview: true,
  fields: [
    { key: 'senderName', label: 'שם השולחת', required: true },
    { key: 'recipientName', label: 'שם הנמען', required: true },
    { key: 'issueDescription', label: 'תיאור הבעיה', required: true },
    { key: 'eventDate', label: 'תאריך האירוע', required: false },
    { key: 'requestedAction', label: 'מה נדרש מהנמען', required: true },
  ] satisfies LetterField[],
  disclaimer:
    'מכתב זה הינו נוסח כללי ואינו מהווה ייעוץ משפטי. מומלץ לאשר את המכתב מול עורך דין מוסמך.',
  body: `לכבוד
{{recipientName}}

הנדון: מכתב התראה לפני נקיטת הליכים משפטיים

אני הח"מ, {{senderName}}, פונה אליך בזאת בנוגע לעניין הבא:

{{issueDescription}}

{{#if eventDate}}
האירוע התרחש בתאריך {{eventDate}}.
{{/if}}

למרות פניות קודמות, העניין לא הוסדר עד למועד כתיבת מכתב זה.

לאור האמור, הנך נדרש/ת לפעול כדלקמן:
{{requestedAction}}

ככל שהנושא לא יוסדר בתוך זמן סביר, אשקול נקיטת צעדים נוספים העומדים לרשותי על פי דין, לרבות פנייה לערכאות משפטיות – מבלי צורך במתן התראה נוספת.

מכתב זה נשלח מבלי לגרוע מכל זכות או סעד העומדים לרשותי.

בברכה,

{{senderName}}`,
};


