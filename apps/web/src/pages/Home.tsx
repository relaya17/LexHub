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
import type { Lawyer, ApiResponse } from '@lexhub/api-client/types';
import { getLawyers } from '@lexhub/api-client/api';
import MarketingSection from '../components/MarketingSection';

const Home: React.FC = () => {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLawyers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response: ApiResponse<Lawyer[]> = await getLawyers();
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
    <main role="main" className="page-background lexhub-home">
      {/* סקשן שיווקי */}
      <MarketingSection />

      <Container fluid="lg" className="mt-4 mt-md-5 px-3 px-md-4" dir="rtl">

        <section className="my-4 my-md-5" aria-labelledby="recommended-lawyers-heading">
          <h2
            id="recommended-lawyers-heading"
            className="mb-3 mb-md-4 text-center h2-md lexhub-home__sectionTitle"
          >
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
            <Row className="g-3 g-md-4" role="list">
              {lawyers.map((lawyer) => (
                <Col key={lawyer.id} xs={12} sm={6} md={4} role="listitem">
                  <Card className="h-100 lexhub-home__lawyerCard">
                    <Card.Body>
                      <Card.Title as="h3" className="lexhub-home__lawyerName">
                        {lawyer.name}
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {lawyer.location?.city ?? ''}
                      </Card.Subtitle>
                      <Card.Text>
                        {lawyer.specialties.join(' • ')}
                        <>
                          <br />
                          טווח מחיר: ₪{lawyer.priceRange.min} - ₪{lawyer.priceRange.max}
                        </>
                        <>
                          <br />
                          <span aria-label={`דירוג ${lawyer.rating.toFixed(1)} מתוך 5`}>
                            דירוג: {lawyer.rating.toFixed(1)} / 5
                          </span>
                        </>
                      </Card.Text>
                      <Button
                        variant="primary"
                        href="/lawyers"
                        aria-label={`צפי בפרופיל המלא של ${lawyer.name}`}
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

