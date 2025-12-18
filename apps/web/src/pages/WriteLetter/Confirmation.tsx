import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import type { Location } from 'react-router-dom';
import type { DraftLocationState } from './DraftPreview';
import type { Choice } from './ChooseAIorLawyer';

interface ConfirmationLocationState extends DraftLocationState {
  choice: Choice;
}

type ConfirmationLocation = Location & { state: ConfirmationLocationState | null };

const Confirmation: React.FC = () => {
  const location = useLocation() as ConfirmationLocation;
  const state = location.state;

  if (state === null) {
    return <Navigate to="/write-letter" replace />;
  }

  const { type, form, choice } = state;

  return (
    <Container className="mt-4" dir="rtl">
      <Card className="mx-auto text-center" style={{ maxWidth: '640px' }}>
        <Card.Body>
          <Card.Title className="mb-3">המכתב נשלח בהצלחה!</Card.Title>
          <Card.Text as="div">
            <p>סוג מכתב: {type ?? 'לא נבחר'}</p>
            <p>מי יטפל במכתב: {choice === 'ai' ? 'AI' : 'עורך דין'}</p>
            <p>שם: {form.fullName}</p>
            <p>נושא: {form.subject}</p>
            <p>פרטים נוספים:</p>
            <p className="border rounded p-3 bg-light" style={{ whiteSpace: 'pre-wrap' }}>
              {form.details}
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Confirmation;


