import React from 'react';
import { Container, Card } from 'react-bootstrap';

const HowItWorks: React.FC = () => {
  return (
    <main className="page-background">
      <Container className="my-5" dir="rtl">
        <Card className="mx-auto" style={{ maxWidth: 820 }}>
          <Card.Body>
            <h1 className="h3 text-center mb-3">איך זה עובד</h1>
            <ol className="mb-0">
              <li className="mb-2">בוחרים שירות: מציאת עו״ד / כתיבת מכתב / בדיקת חוזה.</li>
              <li className="mb-2">ממלאים פרטים בצורה מהירה ונגישה.</li>
              <li className="mb-2">מקבלים התאמות או תוצאה – ושומרים הכל באזור האישי.</li>
            </ol>
          </Card.Body>
        </Card>
      </Container>
    </main>
  );
};

export default HowItWorks;


