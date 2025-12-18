import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Container, Button, Card } from 'react-bootstrap';
import type { Location } from 'react-router-dom';
import type { LetterFormState } from './QuestionsForm';

interface DraftLocationState {
  type: string | null;
  form: LetterFormState;
}

type DraftLocation = Location & { state: DraftLocationState | null };

const DraftPreview: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation() as DraftLocation;
  const state = location.state;

  if (state === null) {
    return <Navigate to="/write-letter" replace />;
  }

  const { type, form } = state;

  const handleNext = () => {
    navigate('/write-letter/choose-ai-lawyer', { state });
  };

  return (
    <Container className="mt-4" dir="rtl">
      <Card className="mx-auto" style={{ maxWidth: '640px' }}>
        <Card.Body>
          <Card.Title className="mb-3 text-end">טיוטת המכתב</Card.Title>
          <Card.Text as="div">
            <p className="text-end">
              <strong>סוג מכתב:</strong> {type ?? 'לא נבחר'}
            </p>
            <p className="text-end">
              <strong>שם:</strong> {form.fullName}
            </p>
            <p className="text-end">
              <strong>נושא:</strong> {form.subject}
            </p>
            <p className="text-end">
              <strong>פרטים נוספים:</strong>
            </p>
            <p className="text-end border rounded p-3 bg-light" style={{ whiteSpace: 'pre-wrap' }}>
              {form.details}
            </p>
          </Card.Text>
          <div className="d-flex justify-content-end">
            <Button variant="primary" onClick={handleNext}>
              בחרי AI או עו״ד
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export type { DraftLocationState };
export default DraftPreview;


