import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Spinner,
  Alert,
} from 'react-bootstrap';
import type { LawyerProfile, ApiResponse } from '@lexhub/api-client/types';
import { getLawyers } from '@lexhub/api-client/api';
import MarketingSection from '../components/MarketingSection';

const Home: React.FC = () => {
  const [lawyers, setLawyers] = useState<LawyerProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLawyers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response: ApiResponse<LawyerProfile[]> = await getLawyers();
        if (response.success && response.data) {
          setLawyers(response.data.slice(0, 3));
        } else {
          setError(response.error ?? 'טעינת עורכי הדין נכשלה');
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    void loadLawyers();
  }, []);

  return (
    <main role="main" className="page-background">
      {/* סקשן שיווקי */}
      <MarketingSection />

      <Container className="mt-3 mt-md-5 px-3 px-md-4" dir="rtl">

        <section className="my-4 my-md-5" aria-labelledby="recommended-lawyers-heading">
          <h2 id="recommended-lawyers-heading" className="mb-3 mb-md-4 text-center h3 h2-md">
            עורכי דין מומלצים
          </h2>
          {loading && (
            <div className="text-center my-4" role="status" aria-live="polite">
              <Spinner animation="border" aria-label="טוען עורכי דין" />
              <span className="sr-only">טוען עורכי דין מומלצים...</span>
            </div>
          )}
          {error && !loading && (
            <Alert variant="warning" className="text-start" role="alert">
              <Alert.Heading>שגיאה בטעינת עורכי דין</Alert.Heading>
              {error}
            </Alert>
          )}
          {!loading && !error && lawyers.length === 0 && (
            <p className="text-muted text-start" role="status">
              עדיין לא נוספו עורכי דין. חזורי מאוחר יותר או חפשי ידנית במסך &quot;מצא עורך דין&quot;.
            </p>
          )}
          {!loading && lawyers.length > 0 && (
            <Row className="g-3" role="list">
              {lawyers.map((lawyer) => (
                <Col key={lawyer.id} xs={12} sm={6} md={4} role="listitem">
                  <Card className="h-100 text-start">
                    <Card.Body>
                      <Card.Title as="h3">{lawyer.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {lawyer.region}
                      </Card.Subtitle>
                      <Card.Text>
                        {lawyer.specialization.join(' • ')}
                        {lawyer.pricePerLetter && (
                          <>
                            <br />
                            מחיר למכתב: {lawyer.pricePerLetter} ₪
                          </>
                        )}
                        {lawyer.rating && (
                          <>
                            <br />
                            <span aria-label={`דירוג ${lawyer.rating.toFixed(1)} מתוך 5`}>
                              דירוג: {lawyer.rating.toFixed(1)} / 5
                            </span>
                          </>
                        )}
                      </Card.Text>
                      <Button
                        variant="primary"
                        href="/lawyers"
                        aria-label={`צפי בפרופיל המלא של ${lawyer.name} מ-${lawyer.region}`}
                      >
                        צפי בפרופיל
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </section>
      </Container>
    </main>
  );
};

export default Home;

