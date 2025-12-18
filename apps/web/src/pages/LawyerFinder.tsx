import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Badge, Spinner, Form, Row, Col } from 'react-bootstrap';
import { getAllLawyers, searchLawyers } from '@lexhub/api-client/lawyers';
import type { LawyerProfile, ApiResponse } from '@lexhub/api-client/types';

const LawyerFinder: React.FC = () => {
  const [lawyers, setLawyers] = useState<LawyerProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<{
    q: string;
    region: string;
    specialization: string;
    minRating: string;
  }>({
    q: '',
    region: '',
    specialization: '',
    minRating: '',
  });

  const loadLawyers = async () => {
    setLoading(true);
    try {
      let response: ApiResponse<LawyerProfile[]>;
      if (
        filters.q ||
        filters.region ||
        filters.specialization ||
        filters.minRating
      ) {
        response = await searchLawyers({
          q: filters.q || undefined,
          region: filters.region || undefined,
          specialization: filters.specialization || undefined,
          minRating: filters.minRating
            ? Number(filters.minRating)
            : undefined,
        });
      } else {
        response = await getAllLawyers();
      }

      if (response.success && response.data) {
        setLawyers(response.data);
        setCurrentIndex(0);
      } else {
        // eslint-disable-next-line no-alert
        alert(response.error ?? 'טעינת עורכי הדין נכשלה');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      // eslint-disable-next-line no-alert
      alert('אירעה שגיאה בעת טעינת עורכי הדין');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadLawyers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApplyFilters = () => {
    void loadLawyers();
  };

  const handleSkip = () => {
    setCurrentIndex((prev) =>
      lawyers.length === 0 ? 0 : (prev + 1) % lawyers.length,
    );
  };

  const handleContact = () => {
    const current = lawyers[currentIndex];
    if (!current) return;
    // TODO: לפתוח צ׳אט / בקשת יצירת קשר
    // eslint-disable-next-line no-alert
    alert(`נשלחה בקשת יצירת קשר אל ${current.name}`);
  };

  const currentLawyer = lawyers[currentIndex];

  return (
    <Container className="mt-5" dir="rtl">
      <h2 className="mb-4 text-center">חיפוש עו״ד (בסגנון Tinder)</h2>

      <Card className="mb-4 p-3">
        <Form>
          <Row className="g-2">
            <Col md={3}>
              <Form.Label className="d-block text-end">חיפוש חופשי</Form.Label>
              <Form.Control
                type="text"
                value={filters.q}
                onChange={(e) => handleFilterChange('q', e.target.value)}
                placeholder="שם, תחום, מילת מפתח..."
              />
            </Col>
            <Col md={3}>
              <Form.Label className="d-block text-end">אזור</Form.Label>
              <Form.Control
                type="text"
                value={filters.region}
                onChange={(e) => handleFilterChange('region', e.target.value)}
                placeholder="תל אביב, חיפה..."
              />
            </Col>
            <Col md={3}>
              <Form.Label className="d-block text-end">תחום התמחות</Form.Label>
              <Form.Control
                type="text"
                value={filters.specialization}
                onChange={(e) =>
                  handleFilterChange('specialization', e.target.value)
                }
                placeholder="דיני עבודה, משפחה..."
              />
            </Col>
            <Col md={3}>
              <Form.Label className="d-block text-end">דירוג מינימלי</Form.Label>
              <Form.Control
                type="number"
                min={0}
                max={5}
                step={0.5}
                value={filters.minRating}
                onChange={(e) => handleFilterChange('minRating', e.target.value)}
              />
            </Col>
          </Row>
          <div className="text-end mt-3">
            <Button variant="primary" onClick={handleApplyFilters} disabled={loading}>
              {loading ? <Spinner size="sm" /> : 'החל סינון'}
            </Button>
          </div>
        </Form>
      </Card>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      )}

      {!loading && currentLawyer && (
        <Card className="mx-auto" style={{ maxWidth: '480px' }}>
          <Card.Body className="text-end">
            <Card.Title>{currentLawyer.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {currentLawyer.region}
            </Card.Subtitle>
            <div className="mb-2">
              {currentLawyer.specialization.map((spec) => (
                <Badge key={spec} bg="secondary" className="ms-1">
                  {spec}
                </Badge>
              ))}
            </div>
            {currentLawyer.pricePerLetter && (
              <p className="mb-1">
                <strong>מחיר למכתב:</strong> {currentLawyer.pricePerLetter} ₪
              </p>
            )}
            {currentLawyer.rating && (
              <p className="mb-1">
                <strong>דירוג:</strong> {currentLawyer.rating.toFixed(1)} / 5
              </p>
            )}
          </Card.Body>
          <Card.Footer>
            <div className="d-flex justify-content-between">
              <Button variant="outline-secondary" onClick={handleSkip}>
                דלג
              </Button>
              <Button variant="success" onClick={handleContact}>
                צור קשר
              </Button>
            </div>
          </Card.Footer>
        </Card>
      )}

      {!loading && !currentLawyer && (
        <p className="text-center text-muted mt-4">
          לא נמצאו עורכי דין מתאימים. נסי לעדכן את הסינון.
        </p>
      )}
    </Container>
  );
};

export default LawyerFinder;


