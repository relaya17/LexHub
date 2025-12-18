import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

export interface LetterTypeSelectorProps {
  selectedType: string;
  onSelect: (type: string) => void;
}

const LETTER_TYPES: string[] = ['דיור', 'חובות', 'עבודה', 'משפחה', 'צרכנות', 'כללי'];

const LetterTypeSelector: React.FC<LetterTypeSelectorProps> = ({
  selectedType,
  onSelect,
}) => {
  return (
    <div className="mb-4 text-end">
      <h4 className="mb-3 text-center">בחרי סוג מכתב:</h4>
      <ButtonGroup>
        {LETTER_TYPES.map((type) => (
          <Button
            key={type}
            variant={selectedType === type ? 'primary' : 'outline-primary'}
            onClick={() => onSelect(type)}
          >
            {type}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default LetterTypeSelector;


