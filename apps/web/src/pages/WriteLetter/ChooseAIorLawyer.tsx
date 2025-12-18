import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import type { Location } from 'react-router-dom';
import type { DraftLocationState } from './DraftPreview';

type Choice = 'ai' | 'lawyer';

type ChoiceLocation = Location & { state: DraftLocationState | null };

const ChooseAIorLawyer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation() as ChoiceLocation;
  const baseState = location.state;

  const [choice, setChoice] = useState<Choice | null>(null);

  if (baseState === null) {
    return <Navigate to="/write-letter" replace />;
  }

  const handleNext = () => {
    if (choice !== null) {
      navigate('/write-letter/confirmation', {
        state: { ...baseState, choice },
      });
    }
  };

  return (
    <Container className="mt-4" dir="rtl">
      <Card className="mx-auto" style={{ maxWidth: '640px' }}>
        <Card.Body>
          <Card.Title className="mb-3 text-end">בחרי מי יטפל במכתב</Card.Title>
          <Row className="mb-3">
            <Col xs={12} className="mb-2">
              <Card
                className={
                  choice === 'ai'
                    ? 'border-primary bg-light cursor-pointer'
                    : 'cursor-pointer'
                }
                onClick={() => setChoice('ai')}
              >
                <Card.Body className="text-end">
                  <Card.Title>AI</Card.Title>
                  <Card.Text>
                    מכתב מוכן מיידית, מחיר נמוך, מתאים למצבים פשוטים יחסית.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12}>
              <Card
                className={
                  choice === 'lawyer'
                    ? 'border-primary bg-light cursor-pointer'
                    : 'cursor-pointer'
                }
                onClick={() => setChoice('lawyer')}
              >
                <Card.Body className="text-end">
                  <Card.Title>עורך דין</Card.Title>
                  <Card.Text>
                    בדיקה אנושית, עריכה מקצועית ותיעוד מלא – מומלץ במקרים מורכבים.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={choice === null}
            >
              המשך
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export type { Choice };
export default ChooseAIorLawyer;


