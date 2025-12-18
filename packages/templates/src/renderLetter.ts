import type {
  LetterTemplate,
  LetterField,
  LetterFieldValues,
} from '@lexhub/types';

export function renderLetter(
  template: LetterTemplate,
  values: LetterFieldValues,
): string {
  let output: string = template.body;

  // Handle conditional blocks: {{#if field}}...{{/if}}
  template.fields.forEach((field: LetterField) => {
    const key = field.key;
    const value: string | undefined = values[key];

    const ifPattern = new RegExp(
      `{{#if\\s+${key}}}([\\s\\S]*?){{\\/if}}`,
      'g',
    );

    if (value !== undefined && value.trim().length > 0) {
      output = output.replace(ifPattern, (_match: string, inner: string) => inner);
    } else {
      output = output.replace(ifPattern, '');
    }
  });

  // Replace simple variables: {{fieldName}}
  template.fields.forEach((field: LetterField) => {
    const key = field.key;
    const value: string = values[key] ?? '';
    const varPattern = new RegExp(`{{${key}}}`, 'g');
    output = output.replace(varPattern, value);
  });

  return output.trim();
}


