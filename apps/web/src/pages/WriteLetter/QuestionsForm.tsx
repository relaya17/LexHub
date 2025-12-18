import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Button, Form, Card } from 'react-bootstrap';

interface LetterFormState {
  fullName: string;
  subject: string;
  details: string;
}

const createInitialFormState = (): LetterFormState => ({
  fullName: '',
  subject: '',
  details: '',
});

const QuestionsForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const type: string | null = params.get('type');

  const [form, setForm] = useState<LetterFormState>(createInitialFormState);

  const handleChange = (field: keyof LetterFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    navigate('/write-letter/draft-preview', { state: { type, form } });
  };

  return (
    <Container className="mt-4" dir="rtl">
      <Card className="mx-auto" style={{ maxWidth: '640px' }}>
        <Card.Body>
          <Card.Title className="mb-3 text-end">
            פרטי המכתב {type !== null ? `(${type})` : ''}
          </Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label className="d-block text-end">שם מלא</Form.Label>
              <Form.Control
                type="text"
                dir="rtl"
                value={form.fullName}
                onChange={(event) => handleChange('fullName', event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="subject">
              <Form.Label className="d-block text-end">נושא המכתב</Form.Label>
              <Form.Control
                type="text"
                dir="rtl"
                value={form.subject}
                onChange={(event) => handleChange('subject', event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="details">
              <Form.Label className="d-block text-end">תוכן או פרטים נוספים</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                dir="rtl"
                value={form.details}
                onChange={(event) => handleChange('details', event.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="primary" onClick={handleNext}>
                המשך
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export type { LetterFormState };
export default QuestionsForm;


