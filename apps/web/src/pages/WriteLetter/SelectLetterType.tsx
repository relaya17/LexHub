import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Card } from 'react-bootstrap';

interface LetterTypeOption {
  id: string;
  name: string;
}

const letterTypes: LetterTypeOption[] = [
  { id: 'work', name: 'מכתב עבודה' },
  { id: 'debt', name: 'מכתב חובות' },
  { id: 'family', name: 'מכתב משפחה' },
  { id: 'general', name: 'מכתב כללי' },
];

const SelectLetterType: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (selected !== null) {
      navigate(`/write-letter/questions?type=${selected}`);
    }
  };

  return (
    <Container className="mt-4" dir="rtl">
      <Card className="mx-auto" style={{ maxWidth: '540px' }}>
        <Card.Body>
          <Card.Title className="mb-3 text-end">בחרי סוג מכתב</Card.Title>
          <div className="d-grid gap-2 mb-3">
            {letterTypes.map((lt) => (
              <Button
                key={lt.id}
                variant={selected === lt.id ? 'primary' : 'outline-secondary'}
                onClick={() => setSelected(lt.id)}
                className="text-end"
              >
                {lt.name}
              </Button>
            ))}
          </div>
          <div className="d-flex justify-content-end">
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={selected === null}
            >
              המשך
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SelectLetterType;


